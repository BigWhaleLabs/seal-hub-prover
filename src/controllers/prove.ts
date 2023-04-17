import { Body, Controller, Ctx, Get, Params, Post } from 'amala'
import { Context } from 'koa'
import { JobModel } from '@/models/Job'
import { notFound } from '@hapi/boom'
import { parse } from 'json-bigint'
import JobStatus from '@/models/JobStatus'
import JsonProofInput from '@/validators/JsonProofInput'
import ProofStatusParams from '@/validators/ProofStatusParams'

@Controller('/prove')
export default class ProveController {
  @Post('/')
  async prove(@Body({ required: true }) input: JsonProofInput) {
    const job = await JobModel.create({
      input: Object.entries(input).reduce(
        (result, [key, value]) => ({ ...result, [key]: parse(value) }),
        {}
      ),
    })
    return {
      id: job.id,
      position: await JobModel.countDocuments({
        createdAt: { $lt: job.createdAt },
        status: JobStatus.scheduled,
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
      ecdsaResult: job.ecdsaResult,
      position:
        job.status === JobStatus.scheduled
          ? await JobModel.countDocuments({
              createdAt: { $lt: job.createdAt },
              status: JobStatus.scheduled,
            })
          : undefined,
      status: job.status,
      uPrecomputesResult: job.uPrecomputesResult,
    }
  }
}
