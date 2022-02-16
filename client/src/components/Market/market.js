import React, { useState } from 'react'
import './index.css'

function Market(props) {
  function ShowMarketModal() {
    console.log('show market')
    props.ShowModalMarket()
  }
  return (
    <div className="acontent">
      <div>
        <div className="mbodycontent">
          <div className="bodycon_line">
            <div className="bc_box">Asset</div>
            <div className="bc_box">Total Supply</div>
            <div className="bc_box">Supply APY</div>
            <div className="bc_box">Total Borrow</div>
            <div className="bc_box">Borrow APY</div>
            <div className="bc_box">My Supply</div>
            <div className="bc_box">My Borrow</div>
          </div>
          <div className="bodycon_line" onClick={ShowMarketModal}>
            <div className="bc_box">NEAR</div>
            <div className="bc_box">
              <div>10000</div>
              <div>$ 1.5M</div>
            </div>
            <div className="bc_box">
              <div>1%</div>
            </div>
            <div className="bc_box">
              <div>50000</div>
              <div>$ 750000</div>
            </div>
            <div className="bc_box">
              <div>3%</div>
            </div>
            <div className="bc_box">
              <div>300</div>
              <div>$ 4500</div>
            </div>
            <div className="bc_box">
              <div>0</div>
              <div>$ 0</div>
            </div>
          </div>
          <div className="bodycon_line" onClick={ShowMarketModal}>
            <div className="bc_box">BTC</div>
            <div className="bc_box">
              <div>100</div>
              <div>$ 4M</div>
            </div>
            <div className="bc_box">
              <div>1%</div>
            </div>
            <div className="bc_box">
              <div>50</div>
              <div>$ 2M</div>
            </div>
            <div className="bc_box">
              <div>0.5%</div>
            </div>
            <div className="bc_box">
              <div>0</div>
              <div>$ 0</div>
            </div>
            <div className="bc_box">
              <div>0</div>
              <div>$ 0</div>
            </div>
          </div>
          <div className="bodycon_line" onClick={ShowMarketModal}>
            <div className="bc_box">ETH</div>
            <div className="bc_box">
              <div>2000</div>
              <div>$ 8M</div>
            </div>
            <div className="bc_box">
              <div>1%</div>
            </div>
            <div className="bc_box">
              <div>1000</div>
              <div>$ 4M</div>
            </div>
            <div className="bc_box">
              <div>3%</div>
            </div>
            <div className="bc_box">
              <div>0</div>
              <div>$ 0</div>
            </div>
            <div className="bc_box">
              <div>0</div>
              <div>$ 0</div>
            </div>
          </div>
          <div className="bodycon_line" onClick={ShowMarketModal}>
            <div className="bc_box">USDT</div>
            <div className="bc_box">
              <div>1000000</div>
              <div>$ 1M</div>
            </div>
            <div className="bc_box">
              <div>1%</div>
            </div>
            <div className="bc_box">
              <div>500000</div>
              <div>$ 500K</div>
            </div>
            <div className="bc_box">
              <div>3%</div>
            </div>
            <div className="bc_box">
              <div>500</div>
              <div>$ 500</div>
            </div>
            <div className="bc_box">
              <div>0</div>
              <div>$ 0</div>
            </div>
          </div>
          <div className="bodycon_line" onClick={ShowMarketModal}>
            <div className="bc_box">UST</div>
            <div className="bc_box">
              <div>4000000</div>
              <div>$ 4M</div>
            </div>
            <div className="bc_box">
              <div>1%</div>
            </div>
            <div className="bc_box">
              <div>3000000</div>
              <div>$ 3M</div>
            </div>
            <div className="bc_box">
              <div>3%</div>
            </div>
            <div className="bc_box">
              <div>0</div>
              <div>$ 0</div>
            </div>
            <div className="bc_box">
              <div>500</div>
              <div>$ 500</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Market
