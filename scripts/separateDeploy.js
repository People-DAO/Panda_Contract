const {ethers} = require("hardhat");
const {BigNumber} = require("ethers");

async function deployCompound() {
    // 账号
    const [sender,] = await ethers.getSigners();
    // 部署底层资产
    const TT1 = await deployContract("TestERC20Asset", ["TT1", "T1"]);
    // 部署timelock
    const timelockFactory = await ethers.getContractFactory("Timelock");
    const timelockInstance = await timelockFactory.deploy(sender.address, BigNumber.from("1"));

    // comp
    const comp = await deployContract("Comp", [sender.address])
    // oracle
    const priceOracle = await deployContract("SimplePriceOracle", []);


    const facotr = BigNumber.from(1).mul(10).pow(18).div(100)
    const interstModel = await deployContract("JumpRateModelV2", [
        ((BigNumber.from(5)).mul(facotr)),//baseRatePerYear
        (BigNumber.from(12).mul(facotr)),//multiplierPerYear
        (BigNumber.from(24).mul(facotr)),//jumpMultiplierPerYear
        (BigNumber.from(80).mul(facotr)),//kink_
        timelockInstance.address // owner
    ])


    const unitrollerProxy = await deployContract("Unitroller", []);
    const comptrollerImpl = await deployContract("Comptroller", []);
    // console.log("comptrollerImpl: ", comptrollerImpl.address);
    await unitrollerProxy._setPendingImplementation(comptrollerImpl.address);
    await comptrollerImpl._become(unitrollerProxy.address);

    const unitrollerProxyToImplFa = await ethers.getContractFactory("Comptroller");
    const unitrollerProxyToImpl = unitrollerProxyToImplFa.attach(unitrollerProxy.address);

    // 初始化comptroller参数
    await unitrollerProxyToImpl._setPriceOracle(priceOracle.address);
    // maximum fraction of origin loan that can be liquidated
    await unitrollerProxyToImpl._setCloseFactor(BigNumber.from(50).mul(facotr));

    // 50%
    // collateral received as a multiplier of amount liquidator paid
    await unitrollerProxyToImpl._setLiquidationIncentive(BigNumber.from(108).mul(facotr));
    // 108%

    const cTT1Delegate = await deployContract("CErc20Delegate", []);
    // const data = hexValue(0);
    const data = "0x00";

    const factor26 = BigNumber.from(10).pow(16);

    const cTT1 = await deployContract("CErc20Delegator",
        [
            TT1.address,
            unitrollerProxy.address,
            interstModel.address,
            BigNumber.from(2).mul(factor26),
            "Compound TT1", // name
            "cTT1", // symbol
            8, // decimals
            sender.address,
            cTT1Delegate.address,
            data
        ]
    );
    await cTT1._setReserveFactor(BigNumber.from(25).mul(facotr));
    // 25% interest charged for reserve


    // set price of TT1
    await priceOracle.setUnderlyingPrice(cTT1.address, BigNumber.from(1).mul(facotr).mul(100));
    // set markets supported by comptroller
    await unitrollerProxyToImpl._supportMarket(cTT1.address);
    // multiplier of collateral for borrowing cap
    await unitrollerProxyToImpl._setCollateralFactor(
        cTT1.address,
        BigNumber.from(60).mul(facotr)
    );
    // valid collateral rate is 60%

    const ct = [cTT1.address]
    const mbc = [0]

    const bs = [BigNumber.from(67).mul(facotr).div(10)]


    const ss = [BigNumber.from(67).mul(facotr).div(10)]

    await unitrollerProxyToImpl._setMarketBorrowCaps(ct, mbc);

    await unitrollerProxyToImpl._setCompSpeeds(
        ct,
        bs, // supplySpeed: Comp per block
        ss // borrowSpeed: Comp per block
    );


    // const
    console.log("TT1 address:", TT1.address);
    console.log("Comp address:", comp.address);
    console.log("CErc20Delegator address:", cTT1.address)
    console.log("Unitroller address:", unitrollerProxy.address)
    console.log("priceOracle address:", priceOracle.address)
    console.log("interst model address:", interstModel.address)
    console.log("deployed compound", ans)
}


async function deployContract(name, args) {
    const factory = await ethers.getContractFactory(name);
    return await factory.deploy(...args)
}

deployCompound()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

