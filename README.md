# PandaDAO-VeToken
PandaDAO VeToken smart contracts

## Introduction
1. The sources of voting power for DAO governance include: token holders, veToken holders, work group, leader. Work group voting weight is 15%, leader is 5%, and the remaining 80% is allocated according to the number of token or veToken held.
2. For each lock-up period of one year, veToken:lock token = 1:1. In the first month of the lock-up period, user has claim permission and staking permission; after the first month, staking and claim permissions are disabled, and the snapshot would record user dividend weight which is used to settle the current year's dividend.
3. Multi-signer can decide whether to share out the dividend in advance or open the claim permission after dividend sharing.

**Roles:**
* Owner: accessible to gnosis safe contract who has admin role to activate or disable claiming or staking functions
* Staker: accessible to public who is able to stake Panda token for voting power as well as earn dividends from DAO
treasury.

**Main Operations:**
* Owner:
1. Turn on or off claiming function
2. Turn on or off staking function
* Staker:
1. Deposit Panda token for a certain address which could in turn get same amount of veToken only if staking is turned on
2. Withdraw Panda token for burning same amount of veToken only if claiming is turned on

## Development
### 1.Install hardhat
`npm install --save-dev hardhat`
### 2.Install hardhat-waffle and hardhat-ethers
`npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers`
### 3.Install dependency
```
npm install --save-dev ts-node typescript
npm install --save-dev chai @types/node @types/mocha @types/chai
npm install --save-dev mocha
npm install --save-dev dotenv
npm install --save-dev hardhat-preprocessor
npm install --save-dev hardhat-contract-sizer
npm install --save-dev hardhat-deploy
npm install --save-dev @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers
npm install --save-dev solidity-coverage
npm install --save-dev @tenderly/hardhat-tenderly
npm install --save-dev @uniswap/v2-core
npm install --save-dev @uniswap/v2-periphery
npm install --save-dev @openzeppelin/contracts
```
### 4.Compile
`npx hardhat compile`
### 5.Deploy
`npx hardhat deploy`
### 6.Test
`npx hardhat test`

## License
[MIT](LICENSE.txt)