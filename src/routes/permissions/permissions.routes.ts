import { Hono } from "hono";


const permissionsRoute = new Hono()

// const insertPermissions = async (permission: NewPermission[]) => {
// 	return db.insert(permissions).values(permission);
// }

// permissionsRoute.post("/create", async (c) => {
// 	try {
// 		const body = c.req.json()
// 		await insertPermissions(permissionsList)
// 		return c.json({
// 			msg: "permission created"
// 		})
// 	} catch (error: any) {
// 		return c.newResponse(error, 400)
// 	}
// })

// permissionsRoute.get("/all", async (c) => {
// 	try {
// 		const permissions = await db.query.permissions.findMany()
// 		return c.json(permissions)
// 	} catch (error: any) {
// 		return c.newResponse(error, 400)

// 	}
// })

// permissionsRoute.get("/:id?", async (c) => {
// 	const { id } = c.req.param()
// 	const { type } = c.req.query()
// 	try {
// 		let condition;
// 		if (id) {
// 			condition = eq(permissions.id, +id)
// 		}
// 		if (type) {
// 			//@ts-ignore
// 			condition = eq(permissions.type, type)

// 		}
// 		const perm = await db.query.permissions.findFirst({
// 			where: condition,

// 		})
// 		return c.json(perm)
// 	} catch (error: any) {
// 		return c.newResponse(error, 400)

// 	}
// })


export default permissionsRoute