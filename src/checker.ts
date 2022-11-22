import 'module-alias/register'
import 'source-map-support/register'

import cleanJobs from '@/helpers/cleanJobs'
import runMongo from '@/helpers/runMongo'
import startJobChecker from '@/helpers/startJobChecker'

void (async () => {
  console.log('Starting mongo...')
  await runMongo()
  console.log('Cleaning jobs...')
  await cleanJobs()
  console.log('Start checking jobs...')
  startJobChecker()
  console.log('Launch sequence completed 🚀')
})()
