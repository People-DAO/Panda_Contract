// 合约
import { ethers, providers } from 'ethers'
import CErc20Delegator from '../../contracts/CToken/CErc20Delegator.sol/CErc20Delegator.json'

//合约地址
const cErc20DelegatorAddress = '0x70A71b86594EabB041c92f6D983c23c77848c868'

const owner = '0xCEeA8dd946476B6e042612a103BE70f93a2e08Ca'

// 此账户借的钱(不计算当前利率累积)
// functionborrowBalanceStored(addressaccount) publicviewoverridereturns (uint)
export async function borrowBalanceStored() {
  if (typeof window.ethereum !== 'undefined') {
    //链接metamask钱包
    window.ethereum.request({ method: 'eth_requestAccounts' })
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const account = accounts[0]
    console.log('主账户： ', account)

    const provider = new ethers.providers.Web3Provider(window.ethereum)

    const contract = new ethers.Contract(cErc20DelegatorAddress, CErc20Delegator.abi, provider)

    await contract.borrowBalanceStored(account).then(
      function (balance) {
        // 单位转换 wei -> ether
        const cash = ethers.utils.formatEther(balance, { commify: true })
        console.log('此账户借的钱(不计算当前利率累积): ', cash)
      },
      function (error) {
        //
      }
    )
  }
}

// 底层资产=>CToken 兑换率(计算利率累积)
// functionexchangeRateCurrent() publicoverridenonReentrantreturns (uint)
export async function exchangeRateCurrent() {
  if (typeof window.ethereum !== 'undefined') {
    //链接metamask钱包
    window.ethereum.request({ method: 'eth_requestAccounts' })
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const account = accounts[0]
    console.log('主账户： ', account)

    const provider = new ethers.providers.Web3Provider(window.ethereum)

    const signer = provider.getSigner()
    const contract = new ethers.Contract(cErc20DelegatorAddress, CErc20Delegator.abi, signer)
    await contract.exchangeRateCurrent().then(
      function (rate) {
        // 单位转换 wei -> ether
        const _rate = ethers.utils.formatEther(rate, { commify: true })
        console.log('底层资产=>CToken 兑换率(计算利率累积): ', _rate)
      },
      function (error) {
        console.log('获取底层资产=>CToken 兑换率(计算利率累积)失败: ', error)
      }
    )
  }
}
// 底层资产=>CToken 兑换率(不计算利率累积)
// function exchangeRateStored() public view override returns (uint)
export async function exchangeRateStored() {
  if (typeof window.ethereum !== 'undefined') {
    //链接metamask钱包
    window.ethereum.request({ method: 'eth_requestAccounts' })
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const account = accounts[0]
    console.log('主账户： ', account)

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(cErc20DelegatorAddress, CErc20Delegator.abi, provider)
    await contract.exchangeRateStored().then(
      function (rate) {
        // 单位转换 wei -> ether
        const _rate = ethers.utils.formatEther(rate, { commify: true })
        console.log('底层资产=>CToken 兑换率(不计算利率累积): ', _rate)
      },
      function (error) {
        console.log('获取底层资产=>CToken 兑换率(不计算利率累积)失败: ', error)
      }
    )
  }
}

// 存款
// @mintAmount: 存款数量
// @return: 错误标识
// function mint(uint mintAmount) external virtual returns (uint);
export async function mint(mintAmount) {
  if (typeof window.ethereum !== 'undefined') {
    //链接metamask钱包
    window.ethereum.request({ method: 'eth_requestAccounts' })
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const account = accounts[0]
    console.log('主账户： ', account)

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(cErc20DelegatorAddress, CErc20Delegator.abi, signer)
    await contract.mint(mintAmount).then(
      function (flag) {
        console.log('存款完成: ', flag)
      },
      function (error) {
        console.log('存款失败: ', error)
      }
    )
  }
}
