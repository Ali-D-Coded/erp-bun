import { Hono } from "hono";
import { db } from "../../database/db";
import { NewUser, employees, permissions, userPermissions, users } from "../../database/schema/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import {  UpdateUserDto, CreateUserDto } from "./dto/user.dto";





export const usersApi = new Hono()

usersApi.get("/", async (c) => {
	const users = await db.query.users.findMany({
		with: {
			userPermissions: {
				with: {
					  permission: true
				  }
			  }
			},
				})
	
	return c.json({
		users,
	})
})

const insertUser = async (user: NewUser) => {
  return db.insert(users).values(user);
}

usersApi.post("/create", zValidator("json", CreateUserDto), async (c) => {
	
	const paredBody = await CreateUserDto.parseAsync(c.req.json())
	console.log({ paredBody });
	const hash = await Bun.password.hash(paredBody.password)
	
	const inserted = await insertUser({...paredBody, password: hash})

	if (paredBody.permissionId) {
		await db.insert(userPermissions).values({ permissionId: paredBody.permissionId, userId: inserted[0].insertId })
	}
	
	await db.insert(employees).values({departmentId: paredBody.departmentId, jobTitle: paredBody.jobTitle})
	return c.json({
		users: paredBody
	})

})

usersApi.patch("/update/:id", zValidator("json", UpdateUserDto), async (c) => {
	try {		
		const {id} = c.req.param()
		const {password,...paredBody } = await UpdateUserDto.parseAsync(c.req.json())
		console.log({ paredBody });
		
		await db.update(users).set({
			email: paredBody.email,
			fullName: paredBody.fullName,
			phone: paredBody.phone,
			role: paredBody.role,
			userName: paredBody.userName
		}).where(eq(users.id, +id))
		
		return c.json(paredBody)
	} catch (error:any) {
		return c.newResponse(error.message, 400)
	}
	
})


usersApi.delete("/delete/:id", async (c) => {
	try {
		const {id} = c.req.param()
		const user = await db.delete(users).where(eq(users.id, +id))
		console.log(user[0]);
		
		return c.json({
			msg: "deleted successfully"
		})
	} catch (error:any) {
		return c.newResponse(error.message, 400)
	}
})