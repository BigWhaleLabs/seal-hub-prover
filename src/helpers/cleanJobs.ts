import { JobModel } from '@/models/Job'
import JobStatus from '@/models/JobStatus'

export default async function () {
  const jobs = await JobModel.find({
    status: { $in: [JobStatus.scheduled, JobStatus.running] },
  })
  console.log(`Found ${jobs.length} jobs, cancelling them...`)
  for (const job of jobs) {
    await job.updateOne({
      $unset: { input: true },
      status: JobStatus.cancelled,
    })
  }
  console.log('Cancled all jobs')
}
