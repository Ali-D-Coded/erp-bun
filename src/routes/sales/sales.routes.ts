import { zValidator } from "@hono/zod-validator";
import { eq, sql } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../../database/db";
import { NewSalesProduct, productStocks, purchaseItems, sales, salesCommission, salesProducts } from "../../database/schema/schema";
import { calculateDisc } from "../../utils/fun";
import { CreateSalesDto } from "./dto/sales.dto";

const salesRoutes = new Hono()

salesRoutes.post("/create", zValidator("json",CreateSalesDto),async (c) => {
	try {
		const dto = await CreateSalesDto.parseAsync(c.req.json())

		const productsData = await Promise.all(dto.products.map(async (item) => {
			const prod = await db.select({
			id: productStocks.id,
			quantityInStock:productStocks.quantityInStock,
				purchaseItem:purchaseItems,
			
			}).from(productStocks).leftJoin(purchaseItems, eq(productStocks.productVariantId, purchaseItems.productVariantId)).where(eq(productStocks.productVariantId, +item.productVariantId)) 

			if (prod.length < 1) {
				throw new Error("No products")
			}

			console.log({prod});
			

			const productAmount = prod?.[0]?.purchaseItem?.maximumRetailPrice ?? 0;
			const productCommissionPercent = prod?.[0]?.purchaseItem?.commissionPercentage ?? 0;
			const flatAmt = item.discountFlat ? item.discountFlat : 0
			const percentAmt = item.discountPercentage ? item.discountPercentage : 0
			
			const discountAmount = item.discountFlat ? flatAmt : await calculateDisc(percentAmt,productAmount)
			const productCommission = await calculateDisc(+productCommissionPercent, productAmount) 
			
			return {
				productAmount,
				productCommission,
				discountAmount,
				productVariantId: item.productVariantId,
				quantity: item.quantity,
			}
		})) 




		const {totalAmount, totalDiscountAmount,totalProductCommission} = productsData.reduce((acc, item) => {
			acc.totalAmount += +item.productAmount 
			acc.totalDiscountAmount += item.discountAmount ? item.discountAmount : 0 
			acc.totalProductCommission += item.productCommission ? item.productCommission : 0 
			return acc
		}, {
			totalAmount:0,
			totalDiscountAmount: 0,
			totalProductCommission:0
		})

		const additionalDiscountedAmount = dto.additionalDiscountFlat ? +dto.additionalDiscountFlat : dto.additionalDiscountPercent ? await calculateDisc(+dto.additionalDiscountPercent, totalAmount) : 0

		const grandTotal = totalAmount - (totalDiscountAmount + additionalDiscountedAmount)

		console.log({productsData,totalAmount, totalDiscountAmount,  additionalDiscountedAmount,totalProductCommission, grandTotal});
		

		
		await db.transaction(async (tx) => {
			const saleRes = await tx.insert(sales).values({
				date: new Date(dto.date),
				accountantId: dto.accountantId,
				salesmanId: dto.salesmanId,
				customerId: dto.customerId,
				totalAmount: totalAmount.toFixed(2),
				additionalDisocunt: additionalDiscountedAmount.toFixed(2),
				totalDiscountAmount: totalDiscountAmount.toFixed(2),
				grandTotal: grandTotal.toFixed(2)
			})

			const salesProductsData : NewSalesProduct[] = productsData.map(it => {
				return {
					saleId: saleRes[0].insertId,
					discountAmount: it.discountAmount.toFixed(2),
					productVariantId: it.productVariantId,
					quantity:it.quantity
				}
			})
			await tx.insert(salesProducts).values(salesProductsData)

			for (const prod of productsData) {
				await tx.update(productStocks).set({
					quantityInStock: sql`${productStocks.quantityInStock} - ${prod.quantity}`
				}).where(eq(productStocks.productVariantId, prod.productVariantId));
			}

			//add the commission to salesman
			await tx.insert(salesCommission).values({
				salesmanId: dto.salesmanId,
				saleId: saleRes[0].insertId,
				saleDate: new Date(dto.date),
				commissionEarned: totalProductCommission.toFixed(2),
				notes:"sales commission"
			})
			
		})
		return c.json("sales added")
		
	} catch (error) {
		return c.newResponse(error,400)
	}
})

salesRoutes.get("/all", async(c) => {
	try {
		const salesRes = await db.query.sales.findMany({
			with: {
				salesProducts: true,
				customer: true
				
			}
		})
		return c.json(salesRes)
	} catch (error) {
		return c.newResponse(error,400)
	}
})

export default salesRoutes