import { MongoMemoryServer } from 'mongodb-memory-server'
import { Mongoose } from 'mongoose'
import { Server } from 'http'
import runApp from '@/helpers/runApp'
import runMongo from '@/helpers/runMongo'

class Globals {
  server?: Server
  mongoServer?: MongoMemoryServer
  mongoose?: Mongoose

  async getNewGlobals() {
    this.mongoServer = await MongoMemoryServer.create()
    this.mongoose = await runMongo(await this?.mongoServer.getUri())
    this.server = await runApp()
  }
}

export default new Globals()
