import { Hono } from "hono";
import { db } from "../../database/db";
import { productStocks, productsVariant } from "../../database/schema/schema";
import { eq } from "drizzle-orm";

const stocksRoute = new Hono()

stocksRoute.get("/all", async (c) => {
	try {
		const stocks = await db.select({
			id: productStocks.id,
			quantityInStock:productStocks.quantityInStock,
			productsVariant: productsVariant
		}).from(productStocks).leftJoin(productsVariant, eq(productStocks.productVariantId, productsVariant.id))

		return c.json(stocks)
	} catch (error) {
		return c.newResponse(error,400)
	}
})


export default stocksRoute