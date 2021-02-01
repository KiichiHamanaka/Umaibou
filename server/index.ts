import path from "path"
import helmet from "fastify-helmet"
import cors from "fastify-cors"
import fastifyStatic from "fastify-static"
import fastifyJwt from "fastify-jwt"
import socketioServer from "fastify-socket.io"
import { JWT_SECRET, SERVER_PORT, BASE_PATH } from "./service/envValues"
import server from "./$server"

const fastify = require("fastify")({
  logger: {
    level: "info"
  }
})

fastify.register(helmet)
fastify.register(cors)
fastify.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
  prefix: BASE_PATH
})
fastify.register(fastifyJwt, { secret: JWT_SECRET })
fastify.register(socketioServer)

fastify.get("/", async (req: any, res: any) => {
  fastify.io.emit("hello")
})

fastify.ready((err: any) => {
  if (err) {
    throw err
  }
  fastify.io.on("connect", (socket: any) =>
    console.info("Socket connected!", socket.id)
  )
})

server(fastify, { basePath: BASE_PATH })
fastify.listen(SERVER_PORT)
