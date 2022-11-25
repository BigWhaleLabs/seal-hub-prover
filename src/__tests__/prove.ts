import * as request from 'supertest'
import * as shutdown from 'http-graceful-shutdown'
import { Wallet } from 'ethers'
import {
  createMessage,
  generateSignatureInputs,
} from '@big-whale-labs/seal-hub-kit'
import { stringify } from 'json-bigint'
import globals from '@/__tests__/helpers/globals'

jest.setTimeout(60000 * 10)

describe('Prove endpoint', () => {
  beforeAll(async () => {
    await globals.getNewGlobals()
  })

  beforeEach(async () => {
    await globals?.mongoose?.connection.db.dropDatabase()
  })

  afterAll(async () => {
    await shutdown(globals.server)
    await globals.mongoServer?.stop()
    return new Promise<void>((resolve, reject) => {
      globals.server?.close((err) => {
        err ? reject(err) : resolve()
      })
    })
  })

  it('should return valid job', async () => {
    const wallet = Wallet.createRandom()
    const message = createMessage(wallet.address)
    const signature = await wallet.signMessage(message)
    const input = generateSignatureInputs(signature, message)
    const data = {} as {
      TPreComputes: string
      U: string
      s: string
    }
    Object.entries(input).forEach(([key, value]) => {
      data[key as keyof typeof data] = stringify(value)
    })
    await request(globals?.server)
      .post('/prove')
      .attach('U', Buffer.from(data.U))
      .attach('TPreComputes', Buffer.from(data.TPreComputes))
      .attach('s', Buffer.from(data.s))
      .expect(200)
  })
})
