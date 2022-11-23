import { DocumentType } from '@typegoose/typegoose'
import { Job, JobModel } from '@/models/Job'

import JobStatus from '@/models/JobStatus'
import generateAndVerifyProof from '@/helpers/generateAndVerifyProof'

export default function () {
  setInterval(checkAndRunJobs, 5 * 1000)
}

async function checkAndRunJobs() {
  console.log('Checking for jobs...')
  // Check if there is a running job
  const runningJob = await JobModel.findOne({
    status: JobStatus.running,
  })
  if (runningJob) {
    console.log(`Found running job ${runningJob.id}`)
    return
  }
  // Check if there is a scheduled job
  const scheduledJob = await JobModel.findOne(
    {
      status: JobStatus.scheduled,
    },
    {},
    { sort: { createdAt: 1 } }
  )
  if (!scheduledJob) {
    console.log('No scheduled jobs found')
    return
  }
  // Run scheduled job
  try {
    await scheduledJob.updateOne({
      status: JobStatus.running,
    })
    const { proof, publicSignals } = await runJob(scheduledJob)
    await scheduledJob.updateOne({
      status: JobStatus.completed,
      result: {
        proof,
        publicSignals,
      },
      $unset: { input: true },
    })
  } catch (error) {
    console.log('Error running job:', error)
    await scheduledJob.updateOne({
      status: JobStatus.failed,
    })
  } finally {
    // Erase job input
    await scheduledJob.updateOne({
      $unset: { input: true },
    })
  }
}

function runJob({ id, input }: DocumentType<Job>) {
  console.log(`Running job ${id}...`)
  console.log('Generating witness and creating proof...')
  if (!input) throw new Error('Job input is missing')

  return generateAndVerifyProof({ jobId: id, input })
}
