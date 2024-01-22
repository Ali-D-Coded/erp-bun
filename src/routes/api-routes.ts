import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { usersApi } from "./users";


const api = new Hono()


api.use(
  '/auth/*',
	(c, next) => {
	console.log("jfdsfdsbh");
	
    const jwtMiddleware = jwt({
      secret: 'it-is-very-secret',
    })
	return jwtMiddleware(c, () => {
		console.log("das", );
		return next()
		
	})
  }
)


api.route("/users", usersApi)


export default api