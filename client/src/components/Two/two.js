import { Modal, Tabs, Image } from 'antd'

import React, { useState } from 'react'
import './index.css'

import MarketPage from '../Market/market'
import USLPage from '../USL/usl'

const { TabPane } = Tabs
function Two(props) {
  function showModalMarket() {
    //setVisible(true);
    console.log('showmarket')
    props.SetShowModalMarket()
  }

  return (
    <div className="acontent">
      <div>
        {/* start */}
        <div className="content">
          <div className="cbox">
            <div className="cbox1">
              <div>Total TVL</div>
              <div>$ 250M</div>
            </div>
          </div>
          <div className="cbox">
            <div className="cbox1">
              <div>Asset Supply</div>
              <div>$ 500M</div>
            </div>
          </div>
          <div className="cbox">
            <div className="cbox1">
              <div>Asset Borrow</div>
              <div>$ 200M</div>
            </div>
          </div>
          <div className="cbox">
            <div className="cbox1">
              <div>USL Collateral</div>
              <div>$ 80M</div>
            </div>
          </div>
          <div className="cbox">
            <div className="cbox1">
              <div>USL Borrow</div>
              <div>$ 50M</div>
            </div>
          </div>
        </div>
        {/* end */}

        {/* start 左右布局*/}
        <div className="bodycontent">
          <div className="bodycontentL">
            <div className="bodycontentL_line1">
              <div className="bodycontentL_line1_p">Account</div>
            </div>
            <div className="bodycontentL_line2">
              <div className="bodycontentL_line1_p">Net Value</div>
              <div className="bodycontentL_line1_p">$ 2500</div>
            </div>
            <div className="bodycontentL_line2">
              <div className="bodycontentL_line1_p">Net APY</div>
              <div className="bodycontentL_line1_p">5%</div>
            </div>
            <div className="bodycontentL_line2">
              <div className="bodycontentL_line1_p">Asset Supplied</div>
              <div className="bodycontentL_line1_p">$ 5000</div>
            </div>
            <div className="bodycontentL_line3">
              <div className="bodycontentL_line1_p">Asset Borrowed</div>
              <div className="bodycontentL_line1_p">$ 500</div>
              <div className="bodycontentL_line1_p">USL Borrowed</div>
              <div className="bodycontentL_line1_p">$ 2000</div>
              <div className="bodycontentL_line1_p">Borrow Limit: $3750</div>
              <div className="bodycontentL_line1_p">Liquidation Threshold: $4000</div>
            </div>
          </div>
          <div className="bodycontentR">
            <Tabs className="bc_tabs" defaultActiveKey="1">
              <TabPane className="tabs_c" tab="All Market" key="1">
                <MarketPage ShowModalMarket={showModalMarket} />
              </TabPane>
              <TabPane className="tabs_c" tab="USL" key="2">
                <USLPage />
              </TabPane>
            </Tabs>
          </div>
        </div>
        {/* end */}
      </div>
    </div>
  )
}

export default Two
