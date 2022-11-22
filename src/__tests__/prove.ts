import * as request from 'supertest'
import * as shutdown from 'http-graceful-shutdown'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { Mongoose } from 'mongoose'
import { Server } from 'http'
import { Wallet } from 'ethers'
import runApp from '@/helpers/runApp'
import runMongo from '@/helpers/runMongo'

jest.setTimeout(60000 * 10)

describe('Prove endpoint', () => {
  let server: Server
  let mongoServer: MongoMemoryServer
  let mongoose: Mongoose

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    mongoose = await runMongo(await mongoServer.getUri())
    server = await runApp()
  })

  beforeEach(async () => {
    await mongoose.connection.db.dropDatabase()
  })

  afterAll(async () => {
    await shutdown(server)
    await mongoServer.stop()
    return new Promise<void>((resolve, reject) => {
      server.close((err) => {
        err ? reject(err) : resolve()
      })
    })
  })

  it('should return valid proof for / request', async () => {
    const message = 'Signature for SealHub'
    const wallet = Wallet.createRandom()
    const signature = await wallet.signMessage(message)
    await request(server)
      .post('/')
      .send({ signature: signature, message })
      .expect(200)
  })
})
