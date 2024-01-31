import { Hono } from "hono";
import { db } from "../../database/db";
import { vendors } from "../../database/schema/schema";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { CreateVendorDto } from "./vendor.dto";

const vendorRoutes = new Hono()

vendorRoutes.get("/all", async (c) => {
	try {
		const vendorData = await db.query.vendors.findMany()
		return c.json(vendorData)
	} catch (error:any) {
		return c.newResponse(error,400)
	}
})

vendorRoutes.post("/create",zValidator("json", CreateVendorDto),async (c) => {
	try {
		const data = await CreateVendorDto.parseAsync(c.req.json())
		console.log({data});
		await db.insert(vendors).values(data)
		return c.json("Vendor Created")
	} catch (error:any) {
		return c.newResponse(error,400)
		
	}	
})

vendorRoutes.patch("/update/:id",async (c) => {
	try {
		const {id} = c.req.param()
		const data = await c.req.json()
		console.log({data});
		
		await db.update(vendors).set(data).where(eq(vendors.id, +id))
		return c.json("vendor upadated")
	} catch (error:any) {
		return c.newResponse(error,400)
		
	}	
})

vendorRoutes.delete("/delete/:id", async (c) => {
	try {
		const {id} = c.req.param()
		await db.delete(vendors).where(eq(vendors.id, +id))
		return c.json("vendor deleted")
	} catch (error:any) {
		return c.newResponse(error,400)
		
	}
})



export default vendorRoutes