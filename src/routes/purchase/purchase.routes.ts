import { Hono } from "hono";
import { db } from "../../database/db";
import { zValidator } from "@hono/zod-validator";
import { CreatePurchaseDto } from "./dto/purchase.dto";


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
		const body = await CreatePurchaseDto.parseAsync(c.req.json())

		

		return c.json({body})
	} catch (error:any) {
		return c.newResponse(error, 400)
	}
})

export default purchaseRoute










