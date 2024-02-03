import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../../database/db";
import { employees, userPermissions, users, } from "../../database/schema/schema";
import { CreateEmployeeDto, UpdateEmployeeDto } from "./dto/employee.dto";





const employeeRoutes = new Hono()

employeeRoutes.post("/create", zValidator("json", CreateEmployeeDto),async (c) => {
	try {
		const paredBody = await CreateEmployeeDto.parseAsync(c.req.json())
	console.log({ paredBody });
	const hash = await Bun.password.hash(paredBody.password)
	
	const emply = await db.insert(employees).values({departmentId: paredBody.departmentId, jobTitle: paredBody.jobTitle})
	const inserted = await db.insert(users).values({...paredBody, password: hash, employeeId: emply[0].insertId})

	if (paredBody.permissionId) {
		await db.insert(userPermissions).values({ permissionId: paredBody.permissionId, userId: inserted[0].insertId })
	}
	
	return c.json({
		users: paredBody
	})
	} catch (error:any) {
		return c.newResponse(error, 400)
	}
})

employeeRoutes.get("/all", async (c) => {
	try {
		const employeesdata = await db.query.employees.findMany({
			with: {
				user: true, 
				department: true,
				attendances: true,
				leaves: true,
				payrolls: true
			},
			// where:ne(this.user.role,"ADMIN" )
		})
		return c.json(employeesdata)
	
	} catch (error:any) {
		return c.newResponse(error, 400)
		
	}
})

employeeRoutes.patch("/update/:id",zValidator("json", UpdateEmployeeDto), async (c) => {
	try {
		const { id } = c.req.param()
		
		const {password,...paredBody} = await UpdateEmployeeDto.parseAsync(c.req.json())
		console.log({ paredBody });
		let hash;
		if (password) {
			
			hash = await Bun.password.hash(password)
		}
	
		if (paredBody.jobTitle || paredBody.departmentId) {
			const empy = await db.update(employees).set({ jobTitle: paredBody.jobTitle , departmentId: paredBody.departmentId}).where(eq(employees.id, +id))
			
			console.log({empy});
		}
		
		if (paredBody.fullName || paredBody.email || paredBody.role || paredBody.phone || password) {
			
			const updated = await db.update(users).set({...paredBody, password: hash}).where(eq(users.employeeId,+id))
			if (paredBody.permissionId) {
				await db.update(userPermissions).set({ permissionId: paredBody.permissionId, userId: updated[0].insertId })
			}
			
		}

	return c.json({
		users: paredBody
	})
	} catch (error:any) {
		return c.newResponse(error, 400)
	}
})


export default employeeRoutes