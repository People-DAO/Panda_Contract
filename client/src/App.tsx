import React, { Component } from 'react'
import './App.css'

import OnePage from './components/One/one'
import TwoPage from './components/Two/two'

import ModalLock from './components/ModalLock/modallock'
import ModalWithdraw from './components/ModalWithdraw/modalwithdraw'

import ModalPDeposit from './components/ModalPDeposit/modalpdeposit'
import ModalPWithdraw from './components/ModalPWithdraw/modalpwithdraw'

import ModalMarketSupply from './components/ModalMarketSupply/modalmarketsupply'
import ModalMarketBorrow from './components/ModalMarketBorrow/modalmarketborrow'
import ModalMarketWithdraw from './components/ModalMarketWithdraw/modalmarketwithdraw'
import ModalMarketRepay from './components/ModalMarketRepay/modalmarketrepay'

import Logo from './assets/Logo.png'

import { Modal, Tabs, Image } from 'antd'

//CToken合约
import { borrowBalanceStored, exchangeRateCurrent, exchangeRateStored, mint } from './utils/CErc20Delegator/chain'
import { HeaderActions } from 'components/HeaderActions'

const { TabPane } = Tabs

class App extends Component {
  state = {
    loading: false,
    storageValue: 0,
    accounts: null,
    contract: null,
    showmodalc: false,
    showmodalp: false,
    showmodalmarket: false,
  }

  handleCancel = () => {
    this.setState({
      showmodalc: false,
    })
  }

  handleCancelP = () => {
    this.setState({
      showmodalp: false,
    })
  }

  handleCancelMarket = () => {
    this.setState({
      showmodalmarket: false,
    })
  }

  showModalC = () => {
    this.setState({
      showmodalc: true,
    })
    console.log(this.state.showmodalc)
  }

  showModalP = () => {
    this.setState({
      showmodalp: true,
    })
  }

  showModalMarket = () => {
    this.setState({
      showmodalmarket: true,
    })
  }

  connectWallet = async () => {
    // console.log("connect web3");
    // if (typeof window.ethereum !== 'undefined') {
    //   console.log('MetaMask is installed!');
    // }else{
    //   window.alert('Please install MetaMask first.');
    //   return;
    // }

    // //链接metamask钱包
    // window.ethereum.request({ method: 'eth_requestAccounts' });
    // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    // const account = accounts[0];
    // console.log(account);

    // -------------------------测试CToken接口------------------------
    // -------------------------测试CToken接口------------------------
    await borrowBalanceStored() // OK
    // await exchangeRateCurrent();// fail
    // await exchangeRateStored();// OK
    // await mint(0);// fail
    this.setState({ loading: true }) //到这里metamask就连接上了，状态为true
  }

  OperationsSlot = {
    left: <Image preview={false} className="lc" src={Logo} />,
    right: (
      <HeaderActions />
    ),
  }

  render() {
    return (
      <div>
        <div className="App">
          <Tabs className="tabs" defaultActiveKey="1" tabBarExtraContent={this.OperationsSlot}>
            <TabPane className="tabs_c" tab="流动性" key="1">
              <OnePage SetShowModalC={this.showModalC} SetShowModalP={this.showModalP} />
            </TabPane>
            <TabPane className="tabs_c" tab="借贷+稳定币" key="2">
              <TwoPage SetShowModalMarket={this.showModalMarket} />
            </TabPane>
          </Tabs>
        </div>

        {/* Lock Modal */}
        <Modal
          className="modal_c"
          visible={this.state.showmodalc}
          title="Lock And Vote"
          onCancel={this.handleCancel}
          footer={[]}
        >
          <div>
            <Tabs className="modalctabnav" defaultActiveKey="1" centered>
              <TabPane tab="LOCK" key="1">
                <ModalLock />
              </TabPane>
              <TabPane tab="WITHDRAW" key="2">
                <ModalWithdraw />
              </TabPane>
            </Tabs>
          </div>
        </Modal>

        {/* Provide Modal */}
        <Modal
          className="modal_p"
          visible={this.state.showmodalp}
          title="Provide Liquidity"
          onCancel={this.handleCancelP}
          footer={[]}
        >
          <div>
            <Tabs className="modalptabnav" defaultActiveKey="1" centered>
              <TabPane tab="DEPOSIT" key="1">
                <ModalPDeposit />
              </TabPane>
              <TabPane tab="WITHDRAW" key="2">
                <ModalPWithdraw />
              </TabPane>
            </Tabs>
          </div>
        </Modal>

        {/* Lock Modal Market*/}
        <Modal
          className="modal_market"
          visible={this.state.showmodalmarket}
          title=""
          onCancel={this.handleCancelMarket}
          footer={[]}
        >
          <div>
            <Tabs className="modalmarkettabnav" defaultActiveKey="1" centered>
              <TabPane tab="SUPPLY" key="1">
                <ModalMarketSupply />
              </TabPane>
              <TabPane tab="BORROW" key="2">
                <ModalMarketBorrow />
              </TabPane>
              <TabPane tab="WITHDRAW" key="3">
                <ModalMarketWithdraw />
              </TabPane>
              <TabPane tab="REPAY" key="4">
                <ModalMarketRepay />
              </TabPane>
            </Tabs>
          </div>
        </Modal>
      </div>
    )
  }
}

export default App
