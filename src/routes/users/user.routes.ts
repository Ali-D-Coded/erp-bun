import { Hono } from "hono"
import { JwtHandler } from "../../utils/jwt"
import prisma from "../../database/prisma"

const userRoutes = new Hono()



userRoutes.get("/me", async (c) => {
	try {
		const jwtHandler = new JwtHandler()
		const reqtoken = c.req.header().authorization.replace("Bearer ", "").trim()
		const verified = await jwtHandler.verifyToken(reqtoken)
		// console.log({ verified });
		// console.log(new Date() > new Date(verified.exp * 1000));

		console.log(reqtoken);
		const role = await prisma.roles.findUnique({
			where: {
				id: verified.role
			},
			include: {
				privileges: true
			}
		})

		let user: any;

		if (role?.roleName === "ADMIN") {
			user = await prisma.admins.findUnique({
				where: {
					email: verified.email
				},
				include: {
					Roles: {
						include: {
							privileges: true
						}
					}
				}
			})
		} else {
			user = await prisma.employees.findUnique({
				where: {
					email: verified.email
				},
				include: {
					Roles: {
						include: {
							privileges: true
						}
					}
				}
			})
		}

		return c.json(user)


	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})



export default userRoutes