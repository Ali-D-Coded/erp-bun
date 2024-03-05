import { Hono } from "hono";
import { db } from "../../database/db";

import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { JwtHandler } from "../../utils/jwt";
import { Admin, admins } from "../../database/schema/schema";
import prisma from "../../database/prisma";




const authRoute = new Hono()

type AdminAuthDto = {
	email: string,
	password: string
}

const schema = z.object({
  email: z.string(),
  password: z.string(),
})



authRoute.post("admin/seeder", async (c) => {
	try {
	// 	const hash = await Bun.password.hash("12356")
	//  await db.insert(admins).values({
	// 		email: "admin@gmail.com",
	// 		userName:"admin",
	// 		fullName: "admin",
	// 		phone: "896578465",
	// 		password: hash,
	// 		roleId:1
		// 	})
		
		await prisma.admins.seedSuperAdmin()

		return c.json({
			msg: "admin created",
			
		})
	} catch (error:any) {
		return c.newResponse(error,400)
	}


})

authRoute.post("local/admin/login", zValidator("json", schema), async (c) => {
	const jwtHandler = new JwtHandler()
	try {
		const data   = await schema.parseAsync(c.req.json())
		// const { password, ...nonPwCols } = getTableColumns(users);
		// const adminData = await db.select().from(admins).where(eq(admins.email, data.email))
		
		// const admin : Admin | any = adminData[0]
		// if (!admin) {
		// 	 throw new Error("Incorrect username or passowrd")
		// }
		const admin = await prisma.admins.findUniqueOrThrow({
			where: {
				email: data.email
			}
		})

		
		const passmatched = await Bun.password.verify(data.password, admin.password)

		
		
		if (!passmatched) {
			throw new Error("Incorrect username or passowrd")
		}

		const token = jwtHandler.generateToken({id: admin.id, userName: admin.userName, email: admin.email, role: admin.rolesId})
		const {password, ...rest} = admin
		return c.json({user:rest, token})
	} catch (error: any) {
		return c.newResponse(error,400)
	}
})





export default authRoute