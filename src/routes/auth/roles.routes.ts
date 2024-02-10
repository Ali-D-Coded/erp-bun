import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { CreateRoleDto, UpdateRoleDto } from "./dto/role.dto"
import { db } from "../../database/db"
import { roles } from "../../database/schema/schema"
import { eq, ne } from "drizzle-orm"

const roleRoutes = new Hono()

roleRoutes.post("/create",zValidator("json", CreateRoleDto), async (c) => {
	try {
		const body = await CreateRoleDto.parseAsync(c.req.json())
		await db.insert(roles).values(body)
		return c.json("role created")
	} catch (error:any) {
		return c.newResponse(error, 400)
	}
})

roleRoutes.get("/all", async (c) => {
	try {
		const rolesRes = await db.query.roles.findMany({
		where:ne(roles.roleName, 'ADMIN')
		});
		return c.json(rolesRes)
	} catch (error:any) {
		return c.newResponse(error, 400)
	}
})

roleRoutes.patch("/update/:id",zValidator("json", UpdateRoleDto), async (c) => {
	try {
		const { id } = c.req.param()
		const body = await UpdateRoleDto.parseAsync(c.req.json())

		await db.update(roles).set(body).where(eq(roles.id, +id))
		return c.json(`role updated`)
	} catch (error:any) {
		return c.newResponse(error, 400)
	}
})

roleRoutes.delete("/delete/:id", async (c) => {
	try {
		const { id } = c.req.param()
		await db.delete(roles).where(eq(roles.id,+id))
		return c.json(`role deleted`)
	} catch (error:any) {
		return c.newResponse(error, 400)
	}
})


export default roleRoutes
