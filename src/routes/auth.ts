import { Hono } from "hono";
import { db } from "../database/db";

import { eq, getTableColumns } from "drizzle-orm";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { JwtHandler } from "../utils/jwt";
import { User, permissions, userPermissions, users } from "../database/schema/schema";




const auth = new Hono()

type AdminAuthDto = {
	email: string,
	password: string
}

const schema = z.object({
  email: z.string(),
  password: z.string(),
})



auth.post("admin/seeder", async (c) => {
	try {
		const hash = await Bun.password.hash("12356")
		const user = await db.insert(users).values({
			userName:"admin",
			email: "admin@gmail.com",
			fullName: "admin",
			phone: "896578465",
			role: "ADMIN",
			password: hash,
		})
		const perm = await db.query.permissions.findFirst({
			where: eq(permissions.type,"ADMIN")
		})

		await db.insert(userPermissions).values([
			{
				userId: user[0].insertId,
				permissionId: perm?.id || 1
			}
		])

		return c.json({
			msg: "admin created",
			
		})
	} catch (error:any) {
		return c.newResponse(error,400)
	}


})

auth.post("local/login", zValidator("json", schema), async (c) => {
	const jwtHandler = new JwtHandler()
	try {
		const data   = await c.req.json()
		// const { password, ...nonPwCols } = getTableColumns(users);
		const userData = await db.select().from(users).where(eq(users.email, data.email))
		const user : User | any = userData[0]
		if (!user) {
			 throw new Error("Incorrect username or passowrd")
		}
		
		const passmatched = await Bun.password.verify(data.password, user.password)

		console.log({passmatched,});
		
		if (!passmatched) {
			throw new Error("Incorrect username or passowrd")
		}

		const token = jwtHandler.generateToken({id: user.id, userName: user.userName, email: user.email, role: user.role})
		const {password, ...rest} = user
		return c.json({user:rest, token})
	} catch (error: any) {
		return c.newResponse(error,400)
	}
})





export default auth