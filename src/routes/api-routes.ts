import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { usersApi } from "./users";
import { JwtHandler } from "../utils/jwt";
import auth from "./auth";


const api = new Hono()


api.use(
  '/*',
	(c, next) => {
	const secret = process.env.JWT_SECRET || "fdgfdgdfgfdgdfgfdgdgd"
    const jwtMiddleware = jwt({
      secret: secret,
	})
		const path = c.req.path.split("/")
		console.log("a", path.includes("seeder"));
		if (path.includes("login") || path.includes("seeder") ) {
			return next()
		}
		return jwtMiddleware(c, () => {
		return next()	
	})
  }
)

api.get("/data", async (c) => {
	return c.json({
		msg: "Hello user you are authenticared"
	})
})





api.route("/users", usersApi)
api.route("/auth", auth)


export default api