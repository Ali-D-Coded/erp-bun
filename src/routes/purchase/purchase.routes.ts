import { Hono } from "hono";
import { db } from "../../database/db";
import { zValidator } from "@hono/zod-validator";
import { CreatePurchaseDto } from "./dto/purchase.dto";
import { generateRandomNumber } from "../../utils/fun";
import { NewProductStock, productStocks, purchase,purchaseItems, units } from "../../database/schema/schema";
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
		
		const totalAmount = dto.purchaseItems.reduce((acc, it) => {
			return acc + +it.purchasePrice
		},0).toFixed(2)
		const batchnumber = generateRandomNumber(100000, 999999).toString()
		
		let stocks = await Promise.all(dto.purchaseItems.map(async pur => {
				const unitRes = await db.select({
					tot: sql<number>`${units.value} * ${pur.quantity}`
				}).from(units).where(eq(units.id, +pur.unitId))
				console.log({ unitRes });
				return {
					productVariantId: pur.productVariantId,
					quantityInStock: unitRes[0].tot,
					purchaseItemId:0
				}
			}))
		
		
		
		await db.transaction(async (tx) => {
			//insert purchase data
			const purchaseRes = await tx.insert(purchase).values({
				vendorId: dto.vendorId,
				purchaseBillNo: dto.purchaseBillNo,
				date: new Date(dto.date),
				totalAmount: totalAmount
			})

			//inserting purchaseItems
			  for (const item of dto.purchaseItems) {
				// Insert each purchase item one by one to capture insertId
				const purchaseItemRes = await tx.insert(purchaseItems).values({
					...item,
					purchaseId: purchaseRes[0].insertId,
					batchNumber: batchnumber,
				});
				  console.log({purchaseItemRes});
				  

				// Add purchaseItem id to the stocks array based on productVariantId
				stocks = stocks.map(stock => stock.productVariantId === item.productVariantId ? {
				...stock,
				purchaseItemId: +purchaseItemRes[0].insertId // this presumes insertId can be obtained per insert
				} : stock);
			}
			
			
			//inserting productStocks
			// await tx.insert(productStocks).values(stocks).onDuplicateKeyUpdate({
			// 	set: {
			// 	quantityInStock: sql`${productStocks.quantityInStock} + VALUES(quantity_in_stock)`
			// }})

			
			
			await tx.insert(productStocks).values(stocks)

		})
		return c.json("purchase added")
	} catch (error:any) {
		return c.newResponse(error, 400)
	}
})

export default purchaseRoute










