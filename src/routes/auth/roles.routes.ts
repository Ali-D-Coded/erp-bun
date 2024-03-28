import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import prisma from "../../database/prisma"
import { CreatePrivilegeCode, CreateRoleDto, UpdateRoleDto } from "./dto/role.dto"

const roleRoutes = new Hono()



roleRoutes.post("/privileges-code/create", zValidator("json", CreatePrivilegeCode), async (c) => {
	try {
		const body = await CreatePrivilegeCode.parseAsync(c.req.json())

		await prisma.privilegeCode.create({
			data: body
		})
		return c.json("role created")
	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})

roleRoutes.get("privileges-code/all", async (c) => {
	try {
		const priv = await prisma.privilegeCode.findMany()
		return c.json(priv)
	} catch (error) {
		return c.newResponse(error, 400)
	}
})

roleRoutes.delete("privileges/delete/:id", async (c) => {
	try {
		const { id } = await c.req.param()
		await prisma.privileges.delete({ where: { id: +id } })
	} catch (error) {

	}
})



roleRoutes.post("/create", zValidator("json", CreateRoleDto), async (c) => {
	try {
		const body = await CreateRoleDto.parseAsync(c.req.json())

		await prisma.roles.create({
			data: body
		})
		return c.json("role created")
	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})


roleRoutes.get("/all", async (c) => {
	try {

		const rolesRes = await prisma.roles.findMany({
			where: {
				NOT: {
					roleName: "ADMIN"
				},
			},
			include: {
				privileges: true,
				_count: {
					select: {
						admins: true,
						employees: true
					}
				}
			},
			includeDeleted: true

		});
		return c.json(rolesRes)
	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})

roleRoutes.patch("/update/:id", zValidator("json", UpdateRoleDto), async (c) => {
	try {
		const { id } = c.req.param()
		const body = await UpdateRoleDto.parseAsync(c.req.json())

		await prisma.roles.update({
			where: {
				id: +id
			},
			data: body
		})
		return c.json(`role updated`)
	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})

roleRoutes.delete("/delete/:id", async (c) => {
	try {
		const { id } = c.req.param()
		const role = await prisma.roles.findUnique({
			where: {
				id: +id
			},
			include: {
				_count: {
					select: {
						admins: true,
						employees: true
					}
				}
			}
		})




		if (role?._count.admins > 0 || role?._count.employees > 0) {
			console.log("cant deletd");

			throw new Error("Cannot delete this role")

		}

		await prisma.roles.delete({
			where: {
				id: +id
			}
		})
		return c.json(`role deleted`)
	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})


export default roleRoutes
