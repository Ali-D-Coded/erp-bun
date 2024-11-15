import { Hono } from "hono";

import departmentsApi from "./departments/departments.routes";
import employeeRoutes from "./employees/employees.routes";

import roleRoutes from "./auth/roles.routes";
import fsRoutes from "./media/filesystem.routes";
import mediaRoute from "./media/media.routes";
import brandRoutes from "./products/brands.routes";
import categoryRoute from "./products/categories.routes";
import productsRoute from "./products/products.routes";
import rakRoutes from "./products/raks.routes";
import stocksRoute from "./products/stocks.routes";
import subCategoryRoute from "./products/subCategories.routes";
import unitsRoutes from "./products/units.routes";
import VAroutes from "./products/variant-attributes.routes";
import purchaseRoute from "./purchase/purchase.routes";
import salesRoutes from "./sales/sales.routes";
import customerRoutes from "./users/customer.routes";
import vendorRoutes from "./vendors/vendor.routes";
import userRoutes from "./users/user.routes";


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


// api.route("/auth", authRoute)
api.route("/roles", roleRoutes)
api.route("/customer", customerRoutes)
api.route("/vendors", vendorRoutes)
// api.route("/permissions", permissionsRoute)
api.route("/departments", departmentsApi)
api.route("/employees", employeeRoutes)
api.route("/purchase", purchaseRoute)
api.route("/sales", salesRoutes)
api.route("/products", productsRoute)
api.route("/units", unitsRoutes)
api.route("/category", categoryRoute)
api.route("/sub-category", subCategoryRoute)
api.route("/stocks", stocksRoute)
api.route("/brands", brandRoutes)
api.route("/raks", rakRoutes)
api.route("/variant-attributes", VAroutes)
api.route("/media", mediaRoute)
api.route("/fs", fsRoutes)
api.route("/user", userRoutes)





export default api