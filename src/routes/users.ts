import { Hono } from "hono";
import { db } from "../database/db";
import { NewUser, users } from "../database/schema/users/users";



export const usersApi = new Hono()

usersApi.get("/", async (c) => {
	const users = await db.query.users.findMany({
		with: {
			
		}
	})
	return c.json({
		users
	})
})

const insertUser = async (user: NewUser) => {
  return db.insert(users).values(user);
}

usersApi.get("/create", async (c) => {
	const newUser: NewUser = {
		fullName: "ali",
		email: "aliallu3xa@gmail.com",
		password: "jesegfke",
		phone: "45544165454",
		role: "ADMIN",
		userName:"ali"
	}
	await insertUser(newUser)
	return c.json({
		users: newUser
	})
})