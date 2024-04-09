import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { poweredBy } from 'hono/powered-by'
import api from './routes/api.routes'
import { cors } from 'hono/cors'
import { mainSeeder } from './database/prisma/seed'
import dbroute from './routes/db.routes'
import { serveStatic } from 'hono/bun'
import { jwt } from 'hono/jwt'
import authRoute from './routes/auth/auth.routes'



const app = new Hono()
app.use('/api/*', cors({
  origin: ['http://localhost:3000', 'https://example.org'],
}))
app.use("*", logger())
app.use('*', poweredBy())

const secret = process.env.JWT_SECRET || "thisissosecret"

app.use(
  '/api/*',
  jwt({
    secret: secret,
  })
)

app.use('/uploads/*', serveStatic({ root: './' }))


// Add X-Response-Time header
app.use('*', async (c, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  c.header('X-Response-Time', `${ms}ms`)
})

// Custom Not Found Message
app.notFound((c) => {
  return c.text('404 Not Found', 404)
})


app.route("/database", dbroute)

app.route("/api", api)

//auth route
app.route("/auth", authRoute)

app.get("/test", (c) => {
  return c.json({
    message: "HEllo Testing"
  })
})

// app.get("/seed", async (c) => {
//   await mainSeeder()
//   return c.json({
//     message: "Seeding complete"
//   })
// })


export default {
  port: process.env.PORT,
  fetch: app.fetch
}
