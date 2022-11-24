import BigIntOrString from 'models/BigIntOrString'

export default interface ProofInput {
  TPreComputes: BigIntOrString[][][][]
  U: BigIntOrString[][]
  s: BigIntOrString[][]
}
