import { Hono } from "hono";

const salesRoutes = new Hono()

salesRoutes.post("/create", async (c) => {
	try {
		
	} catch (error) {
		return c.newResponse(error,400)
	}
})

export default salesRoutes