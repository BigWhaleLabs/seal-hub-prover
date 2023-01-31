import * as snarkjs from 'snarkjs'
import ProofInput from '@/models/ProofInput'
import ProofResult from '@/models/ProofResult'

export default async function (input: ProofInput) {
  const base = process.cwd()

  const ecdsaResult: ProofResult = await snarkjs.groth16.fullProve(
    {
      U: input.U,
      s: input.s,
      scalarForT: input.scalarForT,
      TPrecomputes: input.TPrecomputes,
      T: input.T,
    },
    `${base}/zk/ECDSAChecker.wasm`,
    `${base}/zk/ECDSAChecker_final.zkey`
  )
  const uPrecomputesResult: ProofResult = await snarkjs.groth16.fullProve(
    {
      U: input.U,
      rInv: input.rInv,
    },
    `${base}/zk/UPrecomputesChecker.wasm`,
    `${base}/zk/UPrecomputesChecker_final.zkey`
  )
  return {
    ecdsaResult,
    uPrecomputesResult,
  }
}
