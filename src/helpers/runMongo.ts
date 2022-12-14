import * as mongoose from 'mongoose'
import env from '@/helpers/env'

export default function (mongoUrl = env.MONGO) {
  return mongoose.connect(mongoUrl)
}
