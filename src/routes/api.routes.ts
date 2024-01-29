import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { usersApi } from "./users/users.routes";
import { JwtHandler } from "../utils/jwt";
import auth from "./auth/auth.routes";
import permissionsRoute from "./permissions/permissions.routes";
import { db } from "../database/db";
import departmentsApi from "./departments/departments.routes";
import { employeeApi } from "./employees/employees.routes";
import purchaseRoute from "./purchase/purchase.routes";
import productsRoute from "./products/products.routes";


const api = new Hono()


// api.use(
//   '/*',
// 	(c, next) => {
// 	const secret = process.env.JWT_SECRET || "fdgfdgdfgfdgdfgfdgdgd"
//     const jwtMiddleware = jwt({
//       secret: secret,
// 	})
// 		const path = c.req.path.split("/")
// 		console.log("a", path.includes("seeder"));
// 		if (path.includes("login") || path.includes("seeder") ) {
// 			return next()
// 		}
// 		return jwtMiddleware(c, () => {
// 		return next()	
// 	})
//   }
// )

api.get("/data", async (c) => {
	// const admin = await db.query.users.
	return c.json({
		msg: "Hello user you are authenticared"
	})
})





api.route("/users", usersApi)
api.route("/auth", auth)
api.route("/permissions", permissionsRoute)
api.route("/departments", departmentsApi)
api.route("/employees", employeeApi)
api.route("/purchase", purchaseRoute)
api.route("/products", productsRoute)


export default api