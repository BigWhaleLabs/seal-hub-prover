import * as JSONbig from 'json-bigint'
import * as request from 'supertest'
import * as shutdown from 'http-graceful-shutdown'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { Mongoose } from 'mongoose'
import { Server } from 'http'
import { Wallet } from 'ethers'
import generateInput from '@/__tests__/helpers/generateProof'
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

  it('should return valid job', async () => {
    const message = 'Signature for SealHub'
    const wallet = Wallet.createRandom()
    const signature = await wallet.signMessage(message)
    const input = await generateInput(signature, message)
    const data = {} as {
      TPreComputes: string
      U: string
      s: string
    }
    Object.entries(input).forEach(([key, value]) => {
      data[key as keyof typeof data] = JSONbig.stringify(value)
    })
    await request(server)
      .post('/prove')
      .attach('U', Buffer.from(data.U))
      .attach('TPreComputes', Buffer.from(data.TPreComputes))
      .attach('s', Buffer.from(data.s))
      .expect(200)
  })
})
