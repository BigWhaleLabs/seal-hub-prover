import { Body, Controller, Ctx, Get, Params, Post } from 'amala'
import { Context } from 'koa'
import { JobModel } from '@/models/Job'
import { notFound } from '@hapi/boom'
import JobStatus from '@/models/JobStatus'
import ProofInput from '@/models/ProofInput'
import ProofStatusParams from '@/validators/ProofStatusParams'

@Controller('/prove')
export default class ProveController {
  @Post('/')
  async prove(@Body({ required: true }) input: ProofInput) {
    const job = await JobModel.create({ input })
    return {
      id: job.id,
      position: await JobModel.countDocuments({
        status: JobStatus.scheduled,
        createdAt: { $lt: job.createdAt },
      }),
    }
  }

  @Get('/:id')
  async status(@Ctx() ctx: Context, @Params() { id }: ProofStatusParams) {
    const job = await JobModel.findById(id)
    if (!job) {
      return ctx.throw(notFound())
    }
    return {
      status: job.status,
      position:
        job.status === JobStatus.scheduled
          ? await JobModel.countDocuments({
              status: JobStatus.scheduled,
              createdAt: { $lt: job.createdAt },
            })
          : undefined,
      ecdsaResult: job.ecdsaResult,
      uPrecomputesResult: job.uPrecomputesResult,
    }
  }
}
