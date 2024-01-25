import { Hono } from "hono";
import { db } from "../../database/db";
import { NewUser, employees, permissions, userPermissions, users } from "../../database/schema/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { CreateUser } from "./dto/user.dto";





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

usersApi.post("/create", zValidator("json", CreateUser), async (c) => {
	
	const paredBody = await CreateUser.parseAsync(c.req.json())
	console.log({ paredBody });
	
	const inserted = await insertUser(paredBody)

	await db.insert(userPermissions).values({ permissionId: paredBody.permissionId, userId: inserted[0].insertId })
	
	await db.insert(employees).values({departmentId: paredBody.departmentId, jobTitle: paredBody.jobTitle})
	return c.json({
		users: paredBody
	})

})