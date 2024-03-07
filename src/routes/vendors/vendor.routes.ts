import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import prisma from "../../database/prisma";
import { CreateVendorDto } from "./vendor.dto";

const vendorRoutes = new Hono()

vendorRoutes.get("/all", async (c) => {
	try {
		const vendorData = await prisma.vendors.findMany()
		return c.json(vendorData)
	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})

vendorRoutes.post("/create", zValidator("json", CreateVendorDto), async (c) => {
	try {
		const data = await CreateVendorDto.parseAsync(c.req.json())
		console.log({ data });
		// await db.insert(vendors).values(data)
		await prisma.vendors.create({
			data
		})
		return c.json("Vendor Created")
	} catch (error: any) {
		return c.newResponse(error, 400)

	}
})

vendorRoutes.patch("/update/:id", async (c) => {
	try {
		const { id } = c.req.param()
		const data = await c.req.json()
		console.log({ data });
		// await db.update(vendors).set(data).where(eq(vendors.id, +id))
		await prisma.vendors.update({
			where: {
				id: +id
			},
			data
		})
		return c.json("vendor upadated")
	} catch (error: any) {
		return c.newResponse(error, 400)

	}
})

vendorRoutes.delete("/delete/:id", async (c) => {
	try {
		const { id } = c.req.param()
		// await db.delete(vendors).where(eq(vendors.id, +id))
		await prisma.vendors.softDelete(+id)
		return c.json("vendor deleted")
	} catch (error: any) {
		return c.newResponse(error, 400)

	}
})



export default vendorRoutes