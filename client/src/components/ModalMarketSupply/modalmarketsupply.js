import { Button } from 'antd'
import React, { useState } from 'react'
import './index.css'

function ModalMarketSupply() {
  return (
    <div className="mmscontent">
      <div className="mms_line_title">
        <div>NEAR</div>
        <div>
          <div>300</div>
          <div>$4500</div>
        </div>
        <div>Max</div>
      </div>
      <div className="mms_line">
        <div>User Deposit Limit</div>
        <div>100000 NEAR</div>
      </div>
      <div className="mms_line">
        <div>Reserve Deposit Limit</div>
        <div>2000000 NEAR</div>
      </div>
      <div className="mms_line">
        <div>Borrow Limit</div>
        <div>$3600</div>
      </div>
      <div className="mms_line">
        <div>Utilization</div>
        <div>53.39%</div>
      </div>
      <div className="mms_line">
        <div>Supply APY</div>
        <div>1%</div>
      </div>
      <div className="mms_line">
        <div>LQDF Rewards</div>
        <div>0.5%</div>
      </div>
      <div className="mms_line">
        <div>Net APY</div>
        <div>1.5%</div>
      </div>
      <div className="mms_line_btn">
        <div>
          <Button type="primary">Supply</Button>
        </div>
      </div>
      <div className="mms_line">
        <div>Wallet Balance</div>
        <div>100 NEAR</div>
      </div>
      <div className="mms_line">
        <div>Supplied</div>
        <div>10 NEAR</div>
      </div>
    </div>
  )
}

export default ModalMarketSupply
