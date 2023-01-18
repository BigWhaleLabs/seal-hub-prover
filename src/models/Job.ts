import {
  Severity,
  getModelForClass,
  modelOptions,
  prop,
} from '@typegoose/typegoose'
import JobStatus from '@/models/JobStatus'
import ProofInput from '@/models/ProofInput'
import ProofResult from '@/models/ProofResult'

@modelOptions({
  schemaOptions: { timestamps: true, expireAfterSeconds: 24 * 60 * 60 * 1000 },
})
export class Job {
  @prop({
    required: true,
    index: true,
    enum: JobStatus,
    default: JobStatus.scheduled,
  })
  status!: JobStatus
  @prop({ _id: false, allowMixed: Severity.ALLOW })
  input?: ProofInput
  @prop({ allowMixed: Severity.ALLOW })
  ecdsaResult?: ProofResult
  @prop({ allowMixed: Severity.ALLOW })
  uPrecomputesResult?: ProofResult

  // Mongo fields
  createdAt!: Date
}

export const JobModel = getModelForClass(Job)
