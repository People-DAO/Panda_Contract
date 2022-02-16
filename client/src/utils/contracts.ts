import ethers from 'ethers'
import CErc20Delegator from '../contracts/CToken/CErc20Delegator.sol/CErc20Delegator.json'

const provider = new ethers.providers.Web3Provider((window as any).ethereum)

const cErc20DelegatorAddress = '0x70A71b86594EabB041c92f6D983c23c77848c868'
export const getCTokenContract = async (address: string) => {
	const signer = provider.getSigner(address)
	return new ethers.Contract(cErc20DelegatorAddress, CErc20Delegator.abi, signer)
}
