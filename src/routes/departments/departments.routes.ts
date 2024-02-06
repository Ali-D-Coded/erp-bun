import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { CreateDepartment } from "./dto/departments.dto";
import { db } from "../../database/db";
import { departments } from "../../database/schema/schema";
import { eq, like } from "drizzle-orm";

const departmentsApi = new Hono()

departmentsApi.post("/create", zValidator("json", CreateDepartment),async (c) => {
	try {
		const parsedBody = await CreateDepartment.parseAsync(c.req.json()) 
		await db.insert(departments).values({ ...parsedBody })
		return c.json({
			msg:"deaprtment craeted"
		})
	} catch (error:any) {
		return c.newResponse(error, 400)
	}

})

departmentsApi.get("/all",async (c) => {
	try {
		const {dep} = c.req.query()
	const deps = await db.query.departments.findMany({
  		...(dep ? {
    	where: (departments, { like }) => like(departments.name, `%${dep}%`),
		} : {}),
		with: {
			employees:true
		}
		});
		return c.json(
			deps
		)
	} catch (error:any) {
		return c.newResponse(error, 400)
	}
	

})

departmentsApi.delete("/delete/:id",async (c) => {
	try {
		const {id} = await c.req.param()
		const deps = (await db.delete(departments).where(eq(departments.id, +id)))
		return c.json(
			deps
		)
	} catch (error:any) {
		return c.newResponse(error, 400)
	}
	

})

export default departmentsApi