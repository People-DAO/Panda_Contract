import React from 'react'
import { Button, Input } from 'antd'
import './index.css'

function ModalPDeposit() {
  return (
    <>
      <div className="l_line">
        <div>USDT Deposited:</div>
        <div>2000</div>
      </div>
      <div className="l_line">
        <div>
          <span>USDT</span>
        </div>
        <div>
          <Input.Group compact className="l_line_box">
            <Input style={{ width: 'auto' }} defaultValue="0.0" />
            <Button type="primary">Max</Button>
          </Input.Group>
        </div>
      </div>
      <div className="l_line">
        <div>Balance:</div>
        <div>2000($1998.00)</div>
      </div>
      <div className="l_line">
        <div>Withdrawals from LiquidiFi are subjected to a cooldown</div>
      </div>
      <div className="l_line">
        <div>Requested withdrawals become available when the next Cycle begins(within 24h)</div>
      </div>
      <div className="l_line_footer">
        <Button type="primary">Deposit</Button>
      </div>
    </>
  )
}

export default ModalPDeposit
