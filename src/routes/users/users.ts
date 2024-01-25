import { Hono } from "hono";
import { db } from "../../database/db";
import { NewUser, permissions, userPermissions, users } from "../../database/schema/schema";
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






usersApi.post("/create",zValidator("json", CreateUser), async (c) => {

	const newUser: NewUser = {
		fullName: "ali",
		email: "aliallu3xa@gmail.com",
		password: "jesegfke",
		phone: "45544165454",
		role: "ADMIN",
		userName: "ali"
		
	}
	const inserted = await insertUser(newUser)
	const perm = await db.query.permissions.findFirst({
		where: eq(permissions.type, "ADMIN")
	})
	await db.insert(userPermissions).values({permissionId: perm?.id || 1,userId: inserted[0].insertId})
	return c.json({
		users: newUser
	})
})