const { ethers } = require("hardhat");

async function main() {
    const tt1Factory = await ethers.getContractFactory("TestERC20Asset");
    const tt1Instance = await tt1Factory.deploy("TT1","T1");
    console.log("TestERC20Asset address:", await tt1Instance.address);
    const factory = await ethers.getContractFactory("Setup");
    const instance = await factory.deploy(tt1Instance.address);
    console.log("setup address:", await instance.address);
    console.log("Comp address:", await instance.comp());
    console.log("CErc20Delegator address:", await instance.cTT1())
    console.log("Unitroller address:", await instance.unitrollerProxy())
    console.log("priceOracle address:", await instance.priceOracle())
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });