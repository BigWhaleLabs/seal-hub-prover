import * as snarkjs from 'snarkjs'
import { ProofInput } from '@/models/ProofInput'
import { cwd } from 'process'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import ProofResult from '@/models/ProofResult'
import generateProof from '@/helpers/generateProof'

const vKey = JSON.parse(
  readFileSync(
    resolve(cwd(), 'zk/ECDSAChecker_verification_key.json')
  ).toString()
)

export default async function ({
  jobId,
  input,
}: {
  input: ProofInput
  jobId?: string
}): Promise<ProofResult> {
  const { proof, publicSignals } = await generateProof(input)
  console.log('Verifying proof...')
  const res = await snarkjs.groth16.verify(vKey, publicSignals, proof)
  if (!res) throw new Error('Proof verification failed')

  console.log(`Proof verified for job ${jobId}`)
  return { proof, publicSignals }
}
