import 'module-alias/register'
import 'source-map-support/register'

import env from '@/helpers/env'
import runApp from '@/helpers/runApp'
import runMongo from '@/helpers/runMongo'

void (async () => {
  if (env.MONGO) {
    console.log('Starting mongo...')
    await runMongo(env.MONGO)
  }
  console.log('Starting app...')
  await runApp()
  console.log('Launch sequence completed 🚀')
})()
