import { zValidator } from "@hono/zod-validator";
import { Prisma } from "@prisma/client";
import { Hono } from "hono";
import prisma from "../../database/prisma";
import { generateRandomNumber } from "../../utils/fun";
import { CreatePurchaseDto } from "./dto/purchase.dto";


const purchaseRoute = new Hono()

purchaseRoute.get("/all", async (c) => {
	try {
		const purchaseList = await prisma.purchase.findMany({
			include: {
				purchaseItems: {
					include: {
						ProductStocks: {
							include: {
								product: true
							}
						},

					}
				},
				Vendors: true
			}
		})
		return c.json(purchaseList)

	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})

purchaseRoute.post("/create", zValidator("json", CreatePurchaseDto), async (c) => {
	try {
		const dto = await CreatePurchaseDto.parseAsync(c.req.json())

		const totalAmount = dto.purchaseItems.reduce((acc, it) => {
			return acc + +it.purchasePrice
		}, 0).toFixed(2)
		const batchnumber = generateRandomNumber(100000, 999999).toString()

		let stocks = await Promise.all(dto.purchaseItems.map(async pur => {

			const unitRes: any = await prisma.$queryRaw`SELECT *, value * ${Prisma.sql`${pur.quantity}`} AS total FROM Units WHERE id = ${+pur.unitsId} LIMIT 1`;
			// const unitRes = await db.select({
			// 	tot: sql<number>`${units.value} * ${pur.quantity}`
			// }).from(units).where(eq(units.id, +pur.unitId))
			console.log({ unitRes: Number(unitRes[0].total) });

			if (unitRes.length < 1) {
				throw new Error("No units")
			}

			return {
				productId: pur.productId,
				quantityInStock: Number(unitRes[0].total),
				purchaseItemId: 0
			}
		}))



		await prisma.$transaction(async (tx) => {
			const purchaseRes = await tx.purchase.create({
				data: {
					vendorsId: dto.vendorId,
					purchaseBillNo: dto.purchaseBillNo,
					date: new Date(dto.date),
					totalAmount
				}
			})

			for (const item of dto.purchaseItems) {
				const { unitsId, ...restitems } = item
				const purchaseItemRes = await tx.purchaseItem.create({
					data: {
						...restitems,
						purchaseId: purchaseRes.id,
						batchNumber: batchnumber
					}
				})

				console.log({ purchaseItemRes: +purchaseItemRes.id });



				stocks = stocks.map(stock => stock.productId === item.productId ? {
					...stock,
					purchaseItemId: +purchaseItemRes.id
				} : stock)
			}

			console.log({ stocks });

			for (const stk of stocks) {
				await tx.productStocks.upsert({
					where: {
						productId: +stk.productId
					},
					create: stk,
					update: stk
				})
			}

		})


		return c.json("purchase added")
	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})

export default purchaseRoute










