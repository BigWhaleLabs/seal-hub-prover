import 'module-alias/register'
import 'source-map-support/register'

import runApp from '@/helpers/runApp'
import runMongo from '@/helpers/runMongo'

void (async () => {
  console.log('Starting mongo...')
  await runMongo()
  console.log('Starting app...')
  await runApp()
  console.log('Launch sequence completed 🚀')
})()
