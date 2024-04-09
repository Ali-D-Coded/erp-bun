import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import prisma from "../../database/prisma";
import { calculateDisc } from "../../utils/fun";
import { CreateSalesDto } from "./dto/sales.dto";

const salesRoutes = new Hono()

salesRoutes.post("/create", zValidator("json", CreateSalesDto), async (c) => {
	try {
		const dto = await CreateSalesDto.parseAsync(c.req.json())

		const productsData = await Promise.all(dto.products.map(async (item) => {
			// const prod = await db.select({
			// 	id: productStocks.id,
			// 	quantityInStock: productStocks.quantityInStock,
			// 	purchaseItem: purchaseItems,

			// }).from(productStocks).leftJoin(purchaseItems, eq(productStocks.productVariantId, purchaseItems.productVariantId)).where(eq(productStocks.productVariantId, +item.productVariantId))

			const prod1 = await prisma.productStocks.findUniqueOrThrow({
				where: {
					id: +item.stockId
				},
				include: {
					// productVariant: true,
					purchaseItem: true
				}
			})

			// if (prod.length < 1) {
			// 	throw new Error("No products")
			// }

			console.log({ prod1 });


			const productAmount = prod1.purchaseItem?.maximumRetailPrice ?? 0;
			const productCommissionPercent = prod1.purchaseItem?.commissionPercentage ?? 0;
			const flatAmt = item.discountFlat ? item.discountFlat : 0
			const percentAmt = item.discountPercentage ? item.discountPercentage : 0

			const discountAmount = item.discountFlat ? flatAmt : await calculateDisc(percentAmt, productAmount)
			const productCommission = await calculateDisc(+productCommissionPercent, productAmount)

			return {
				stockId: +item.stockId,
				productAmount,
				productCommission,
				discountAmount,
				productId: prod1.productId,
				productCode: prod1.productCode,
				quantity: item.quantity,
			}
		}))


		const { totalAmount, totalDiscountAmount, totalProductCommission } = productsData.reduce((acc, item) => {
			acc.totalAmount += +item.productAmount
			acc.totalDiscountAmount += item.discountAmount ? item.discountAmount : 0
			acc.totalProductCommission += item.productCommission ? item.productCommission : 0
			return acc
		}, {
			totalAmount: 0,
			totalDiscountAmount: 0,
			totalProductCommission: 0
		})

		const additionalDiscountedAmount = dto.additionalDiscountFlat ? +dto.additionalDiscountFlat : dto.additionalDiscountPercent ? await calculateDisc(+dto.additionalDiscountPercent, totalAmount) : 0

		const grandTotal = totalAmount - (totalDiscountAmount + additionalDiscountedAmount)

		console.log({ productsData, totalAmount, totalDiscountAmount, additionalDiscountedAmount, totalProductCommission, grandTotal });




		await prisma.$transaction(async (tx) => {
			const salesRes = await tx.sales.create({
				data: {
					date: new Date(dto.date),
					accountantId: dto.accountantId,
					salesManId: dto.salesmanId,
					customersId: dto.customerId,
					totalAmount: totalAmount.toFixed(2),
					additionalDisocunt: additionalDiscountedAmount.toFixed(2),
					totalDiscountAmount: totalDiscountAmount.toFixed(2),
					grandTotal: grandTotal.toFixed(2)
				}
			})
			const salesProductsData = productsData.map(it => {
				return {
					salesId: salesRes.id,
					discountAmount: it.discountAmount.toFixed(2),
					productId: it.productId,
					productCode: it.productCode,
					quantity: it.quantity
				}
			})

			await tx.salesProducts.createMany({
				data: salesProductsData
			})


			for (const prod of productsData) {
				await tx.productStocks.update({
					where: {
						id: +prod.stockId
					},
					data: {
						quantityInStock: {
							decrement: prod.quantity
						}
					}
				})
			}
			await tx.salesCommission.create({
				data: {
					salesmanId: dto.salesmanId,
					saleId: salesRes.id,
					saleDate: new Date(dto.date),
					commissionEarned: totalProductCommission.toFixed(2),
					notes: "Sales Commission"
				}
			})
		})
		return c.json("sales added")

	} catch (error) {
		return c.newResponse(error, 400)
	}
})

salesRoutes.get("/all", async (c) => {
	try {
		const salesRes = await prisma.sales.findMany({
			include: {
				salesProducts: true,
				customer: true,
				salesman: true,
				accountant: true
			}
		})
		return c.json(salesRes)
	} catch (error) {
		return c.newResponse(error, 400)
	}
})

export default salesRoutes