import { Hono } from "hono";
import prisma from "../../database/prisma";

const stocksRoute = new Hono()

stocksRoute.get("/all", async (c) => {
	try {
		// const stocks = await db.select({
		// 	id: productStocks.id,
		// 	quantityInStock: productStocks.quantityInStock,
		// 	purchaseItem: purchaseItems,
		// 	productsVariant: productsVariant
		// }).from(productStocks)
		// 	.leftJoin(productsVariant, eq(productStocks.productVariantId, productsVariant.id))
		// 	.leftJoin(purchaseItems, eq(productStocks.purchaseItemId, purchaseItems.id))

		const stks = await prisma.productStocks.findMany({
			include: {
				product: true,
				purchaseItem: true
			}
		})

		return c.json(stks)
	} catch (error) {
		return c.newResponse(error, 400)
	}
})


export default stocksRoute