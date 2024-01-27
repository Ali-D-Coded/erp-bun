import { Hono } from "hono";
import { db } from "../../database/db";

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

purchaseRoute.post("/create", async (c) => {
	try {
		
	} catch (error:any) {
		return c.newResponse(error, 400)
	}
})