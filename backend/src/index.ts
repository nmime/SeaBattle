import config from "@typings/config"

import { connect } from "mongoose"

import { Server } from "@colyseus/core"
import { uWebSocketsTransport } from "@colyseus/uwebsockets-transport"
import { RedisDriver } from "colyseus"
import { RedisPresence } from "@colyseus/redis-presence"

import { MyRoom } from "@typings/room"
import { getUserInfo } from "@actions/getUserInfo"

const transport = new uWebSocketsTransport({
  idleTimeout: 60,
  sendPingsAutomatically: true
})

transport.app.get("/userinfo/:id", getUserInfo)

const gameServer = new Server({
  driver: new RedisDriver({
    host: config.REDIS_HOST,
    password: config.REDIS_PASS,
    port: config.REDIS_PORT
  }),
  presence: new RedisPresence({
    host: config.REDIS_HOST,
    password: config.REDIS_PASS,
    port: config.REDIS_PORT
  }),
  transport: transport
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
gameServer.define("game", MyRoom)

process.on("unhandledRejection", (e) =>
  console.error("unhandledRejection...", e)
)

gameServer
  .listen(config.PORT)
  .then(() =>
    console.log(`BACKEND successful started, listening on ${config.PORT}`)
  )
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })

connect(config.MONGO_URI)
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.error(err))
