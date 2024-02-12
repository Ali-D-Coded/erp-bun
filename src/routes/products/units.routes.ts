import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { CreateUnitsDto } from "./dto/units.dto";
import { db } from "../../database/db";
import { units } from "../../database/schema/schema";
import { eq } from "drizzle-orm";

 const unitsRoutes = new Hono()
unitsRoutes.post("/create",zValidator("json",CreateUnitsDto), async (c) => {
	try {
		const data = await CreateUnitsDto.parseAsync(c.req.json())
		await db.insert(units).values(data)
		return c.json(data)
	} catch (error:any) {
		return c.newResponse(error,400)
	}
})

unitsRoutes.get("/all",async (c) => {
	try {
		const unitsdata = await db.query.units.findMany()
		return c.json(unitsdata)
	} catch (error:any) {
		return c.newResponse(error,400)
		
	}
})

unitsRoutes.patch("/update/:id",async (c) => {
	try {
		const { id } = c.req.param()
		const data = await c.req.json()
		 await db.update(units).set({...data,updatedAt: new Date()}).where(eq(units.id, +id))
		return c.json(data)
	} catch (error:any) {
		return c.newResponse(error,400)
		
	}
})

unitsRoutes.delete("/delete/:id", async (c) => {
	try {
		const {id} = c.req.param()
		 await db.delete(units).where(eq(units.id, +id))
		return c.json("deleted")
	} catch (error:any) {
		return c.newResponse(error,400)
		
	}
})

export default unitsRoutes
