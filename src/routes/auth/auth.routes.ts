import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

import prisma from "../../database/prisma";
import { JwtHandler } from "../../utils/jwt";
import { RefreshDto } from "./dto/auth.dto";




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
	} catch (error: any) {
		return c.newResponse(error, 400)
	}


})

authRoute.post("local/admin/login", async (c) => {
	const jwtHandler = new JwtHandler()
	try {
		const data = await c.req.json()
		console.log({ data });


		const admin = await prisma.admins.findUniqueOrThrow({
			where: {
				email: data.email
			}
		})


		const passmatched = await Bun.password.verify(data.password, admin.password)



		if (!passmatched) {
			throw new Error("Incorrect username or passowrd")
		}

		const token = jwtHandler.generateToken({ id: admin.id, userName: admin.userName, email: admin.email, role: admin.rolesId })
		await prisma.admins.update({
			where: {
				id: admin.id
			},
			data: {
				refreshToken: token.refresh
			}
		})
		const { password, ...rest } = admin
		return c.json({ user: rest, token })
	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})


authRoute.post("refresh", zValidator("json", RefreshDto), async (c) => {
	try {
		const dto = await RefreshDto.parseAsync(await c.req.json())



		let user;
		let token;
		const jwtHandler = new JwtHandler()

		const reqtoken = c.req.header().authorization.replace("Bearer ", "").trim()
		const verified = await jwtHandler.verifyToken(reqtoken)
		// console.log({ verified });
		// console.log(new Date() > new Date(verified.exp * 1000));

		console.log(reqtoken);
		const role: any = await prisma.roles.findUnique({
			where: {
				id: verified.role
			},
			include: {
				privileges: true
			}
		})

		if (role?.roleName === "ADMIN") {
			user = await prisma.admins.findUniqueOrThrow({
				where: {
					refreshToken: dto.refresh
				}
			})
			token = jwtHandler.generateToken({ id: user.id, userName: user.userName, email: user.email, role: user.rolesId })

			await prisma.admins.update({
				where: {
					id: user.id
				},
				data: {
					refreshToken: token.refresh
				}
			})
		} else if (["SALESMAN", "ACCOUNTANT"].includes(role?.roleName)) {

			user = await prisma.employees.findUniqueOrThrow({
				where: {
					refreshToken: dto.refresh
				}
			})
			await prisma.employees.update({
				where: {
					id: user.id
				},
				data: {
					refreshToken: token.refresh
				}
			})

		} else {
			throw new Error("Invalid User Type")
		}




		return c.json(token)

	} catch (error) {
		return c.newResponse(error, 400)

	}
})

authRoute.post("local/employee/login", async (c) => {

	const jwtHandler = new JwtHandler()
	try {
		const data = await c.req.json()
		console.log({ data });


		const employee = await prisma.employees.findUniqueOrThrow({
			where: {
				email: data.email
			}
		})


		const passmatched = await Bun.password.verify(data.password, employee.password)



		if (!passmatched) {
			throw new Error("Incorrect username or passowrd")
		}

		const token = jwtHandler.generateToken({ id: employee.id, userName: employee.userName, email: employee.email, role: employee.rolesId })

		await prisma.employees.update({
			where: {
				id: employee.id
			},
			data: {
				refreshToken: token.refresh
			}
		})

		const { password, ...rest } = employee
		return c.json({ user: rest, token })
	} catch (error: any) {
		return c.newResponse(error, 400)
	}

})








export default authRoute