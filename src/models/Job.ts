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
  schemaOptions: { expireAfterSeconds: 24 * 60 * 60 * 1000, timestamps: true },
})
export class Job {
  @prop({
    default: JobStatus.scheduled,
    enum: JobStatus,
    index: true,
    required: true,
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
