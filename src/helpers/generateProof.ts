import * as snarkjs from 'snarkjs'
import { ProofInput } from '@/models/ProofInput'
import ProofResult from '@/models/ProofResult'

export default function (input: ProofInput): Promise<ProofResult> {
  return snarkjs.groth16.fullProve(
    input,
    './zk/ECDSAChecker.wasm',
    './zk/ECDSAChecker_final.zkey'
  )
}
