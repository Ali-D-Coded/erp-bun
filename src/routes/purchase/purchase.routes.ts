import { Hono } from "hono";
import { db } from "../../database/db";
import { zValidator } from "@hono/zod-validator";
import { CreatePurchaseDto } from "./dto/purchase.dto";
import { generateRandomNumber } from "../../utils/fun";
import { productStocks, purchase,purchaseItems, units } from "../../database/schema/schema";
import { eq, sql } from "drizzle-orm";


const purchaseRoute = new Hono()

purchaseRoute.get("/all", async (c) => {
	try {
		const purchaseList = await db.query.purchase.findMany({
			with: {
				purchaseItems: true,
				vendor: true
			}
		})
		return c.json(purchaseList)

	} catch (error:any) {
		return c.newResponse(error, 400)
	}
})

purchaseRoute.post("/create",zValidator("json",CreatePurchaseDto) ,async (c) => {
	try {
		const dto = await CreatePurchaseDto.parseAsync(c.req.json())
		
		const purchaseBillNo = generateRandomNumber(10000000,99999999).toString()
		const totalAmount = dto.purchaseItems.reduce((acc, it) => {
			return acc + +it.purchasePrice
		},0).toFixed(2)
		const batchnumber = generateRandomNumber(100000,999999).toString()

		await db.transaction(async (tx) => {
			const purchaseRes = await tx.insert(purchase).values({
				vendorId: dto.vendorId,
				purchaseBillNo: purchaseBillNo,
				date: new Date(dto.date),
				totalAmount: totalAmount
			})

		const purchaseItemsDto = dto.purchaseItems.map(pur => {
			return {
				...pur,
				purchaseId: purchaseRes[0].insertId,
				batchNumber: batchnumber,
			}
		})
		
			await tx.insert(purchaseItems).values(purchaseItemsDto)
			
			// const stocks = dto.purchaseItems.map(pur => {
			// 	const unitRes = await tx.select({
			// 		tot: sql<number>`${+units.value * pur.quantity}`
			// 	}).from(units).limit(1)
			// 	// const qtt = unitRes.tot
			// 	return {
			// 		productsVariantId: pur.productVariantId,
			// 		quantityInStock: 
			// 	}
			// })
			// await tx.insert(productStocks).values()

			


			



			// await db.insert(productStocks).values({
			// 	productVariantId: 
			// })



		})
		return c.json({body: {dto,totalAmount,purchaseBillNo,batchnumber }})
	} catch (error:any) {
		return c.newResponse(error, 400)
	}
})

export default purchaseRoute










