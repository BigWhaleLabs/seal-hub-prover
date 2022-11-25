import * as BN from 'bn.js'

const REGISTERS = 4n

function addHexPrefix(str: string) {
  return `0x${str}`
}

export default function (value?: BN | string) {
  const registers = [] as bigint[]

  if (!value) {
    return [0n, 0n, 0n, 0n]
  }
  const hex = value.toString('hex').padStart(64, '0')
  for (let k = 0; k < REGISTERS; k++) {
    // 64bit = 16 chars in hex
    const val = hex.slice(k * 16, (k + 1) * 16)

    registers.unshift(BigInt(addHexPrefix(val)))
  }

  return registers.map((el) => el.toString())
}
