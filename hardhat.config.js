/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('dotenv').config()

require("@nomiclabs/hardhat-waffle");

module.exports = {
    solidity: {
        version: "0.8.0",
        settings: {
            optimizer: {
                enabled: true,
                runs: 1000,
            },
        },
    },
    networks: {
        rinkeby: {
            url: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
            accounts: ["24bbb8a437040fbd722b7af977086aa876d0ae3c082cf765883586f6883115c2"]
        },
        aurora_test: {
            url: "https://testnet.aurora.dev/",
            chainId: 1313161555,
            accounts: ["24bbb8a437040fbd722b7af977086aa876d0ae3c082cf765883586f6883115c2"],
        },
        aurora:{
            url: "https://mainnet.aurora.dev",
            chainId: 1313161554,
            accounts: ["24bbb8a437040fbd722b7af977086aa876d0ae3c082cf765883586f6883115c2"],
        },
        heco_testnet: {
            url: "https://http-testnet.hecochain.com/",
            accounts: ["24bbb8a437040fbd722b7af977086aa876d0ae3c082cf765883586f6883115c2"],
            chainId: 256,
        },
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts"
    },
    mocha: {
        timeout: 20000  // 运行单元测试的最大等待时间
    }
};
