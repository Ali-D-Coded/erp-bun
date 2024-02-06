import { Hono } from "hono";
import { jwt } from "hono/jwt";

import { JwtHandler } from "../utils/jwt";
import authRoute from "./auth/auth.routes";
import permissionsRoute from "./permissions/permissions.routes";
import { db } from "../database/db";
import departmentsApi from "./departments/departments.routes";
import employeeRoutes from "./employees/employees.routes";

import productsRoute from "./products/products.routes";
import unitsRoutes from "./products/units.routes";
import vendorRoutes from "./vendors/vendor.routes";
import categoryRoute from "./products/categories.routes";
import subCategoryRoute from "./products/subCategories.routes";
import stocksRoute from "./products/stocks.routes";
import salesRoutes from "./sales/sales.routes";
import purchaseRoute from "./purchase/purchase.routes";
import customerRoutes from "./users/customer.routes";


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


api.route("/customer", customerRoutes)
api.route("/vendors", vendorRoutes)
api.route("/auth", authRoute)
api.route("/permissions", permissionsRoute)
api.route("/departments", departmentsApi)
api.route("/employees", employeeRoutes)
api.route("/purchase", purchaseRoute)
api.route("/sales", salesRoutes)
api.route("/products", productsRoute)
api.route("/units", unitsRoutes)
api.route("/category", categoryRoute)
api.route("/sub-category", subCategoryRoute )
api.route("/stocks", stocksRoute )


export default api