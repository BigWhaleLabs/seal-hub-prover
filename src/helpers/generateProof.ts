import * as snarkjs from 'snarkjs'
import ProofInput from '@/models/ProofInput'
import ProofResult from '@/models/ProofResult'

export default async function (input: ProofInput) {
  const ecdsaResult: ProofResult = await snarkjs.groth16.fullProve(
    {
      U: input.U,
      s: input.s,
      scalarForT: input.scalarForT,
      TPrecomputes: input.TPrecomputes,
      T: input.T,
    },
    './zk/ECDSAChecker.wasm',
    './zk/ECDSAChecker_final.zkey'
  )
  const uPrecomputesResult: ProofResult = await snarkjs.groth16.fullProve(
    {
      U: input.U,
      scalarForU: input.scalarForU,
    },
    './zk/UPrecomputesChecker.wasm',
    './zk/UPrecomputesChecker_final.zkey'
  )
  return {
    ecdsaResult,
    uPrecomputesResult,
  }
}
