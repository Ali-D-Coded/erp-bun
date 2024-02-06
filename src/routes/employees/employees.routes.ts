import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../../database/db";
import { employees } from "../../database/schema/schema";
import { CreateEmployeeDto, UpdateEmployeeDto } from "./dto/employee.dto";





const employeeRoutes = new Hono()

employeeRoutes.post("/create", zValidator("json", CreateEmployeeDto),async (c) => {
	try {
		const paredBody = await CreateEmployeeDto.parseAsync(c.req.json())
	console.log({ paredBody });
 await Bun.password.hash(paredBody.password)
	
	 await db.insert(employees).values(paredBody)
	
	return c.json("created employee")
	} catch (error:any) {
		return c.newResponse(error, 400)
	}
})

employeeRoutes.get("/all", async (c) => {
	try {
		const employeesdata = await db.query.employees.findMany({
			with: {
				role: true,
				department: true,
				attendances: true,
				leaves: true,
				payrolls: true
			},
		
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
		
		if (paredBody.fullName || paredBody.email || paredBody.roleId || paredBody.phone || password) {
			
			 await db.update(employees).set({...paredBody, password: hash}).where(eq(employees,+id))
			
			
		}

	return c.json("employee updated")
	} catch (error:any) {
		return c.newResponse(error, 400)
	}
})


export default employeeRoutes