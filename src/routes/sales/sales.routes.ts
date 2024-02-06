import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../../database/db";
import { productStocks, purchaseItems } from "../../database/schema/schema";
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

			const productAmount = prod ? prod[0].purchaseItem?.maximumRetailPrice * item.quantity : 0
			const flatAmt = item.discountFlat ? item.discountFlat : 0
			const percentAmt = item.discountPercentage ? item.discountPercentage : 0
			
			const discountAmount = item.discountFlat ? flatAmt : await calculateDisc(percentAmt,productAmount)
			
			return {
			productAmount,
				discountAmount,
				productVariantId: item.productVariantId,
				quantity: item.quantity,
			}
		})) 


		const {totalAmount, totalDiscountAmount} = productsData.reduce((acc, item) => {
			acc.totalAmount += +item.productAmount 
			acc.totalDiscountAmount += item.discountAmount ? item.discountAmount : 0 
			return acc
		}, {
			totalAmount:0,
			totalDiscountAmount:0,
		})

		const additionalDiscountedAmount = dto.additionalDiscountFlat ? +dto.additionalDiscountFlat : dto.additionalDiscountPercent ? await calculateDisc(+dto.additionalDiscountPercent, totalAmount) : 0

		const grandTotal = totalAmount - (totalDiscountAmount + additionalDiscountedAmount)
		
		
		return c.json({productsData,totalAmount, totalDiscountAmount,  additionalDiscountedAmount, grandTotal})
	} catch (error) {
		return c.newResponse(error,400)
	}
})

export default salesRoutes