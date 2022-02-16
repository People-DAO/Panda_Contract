const { BigNumber } = require("ethers")
const { hexConcat } = require("ethers/lib/utils")

BASE_TEN = 10

function getBigNumber(amount, decimals = 18) {
    return BigNumber.from(amount).mul(BigNumber.from(BASE_TEN).pow(decimals))
  }

// 定义整数，再转化为字符串
let n = 100
console.log(String(n) === '100')

// 浮点数取整，再转化为字符串
n = 100 / 0.98
console.log(String(Math.floor(n)) === '102')

// BigNumber除以10**18后，做运算再转回BigNumber
console.log(String(getBigNumber(24)) === '24000000000000000000')
console.log(parseInt(getBigNumber(24)) === 24000000000000000000)
console.log(String(getBigNumber(24) / 13) === (getBigNumber(24) / 13).toString())
console.log(Math.floor(getBigNumber(24) / 23 * 13).toString(16))
console.log(BigNumber.from(Math.floor(getBigNumber(24) / 23 * 13)))
// console.log(String(BigNumber.from(24)))