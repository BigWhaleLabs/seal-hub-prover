import * as mongoose from 'mongoose'

export default function (mongoUrl: string) {
  return mongoose.connect(mongoUrl)
}
