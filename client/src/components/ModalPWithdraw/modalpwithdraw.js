import React from 'react'
import { Button, Input } from 'antd'
import './index.css'

function ModalPWithdraw() {
  return (
    <>
      <div className="l_line">
        <div>USDT Deposited:</div>
        <div>4000</div>
      </div>
      <div className="l_line">
        <div>USDT Requested:</div>
        <div>2000</div>
      </div>
      <div className="l_line">
        <div>USDT Available:</div>
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
        <div>Requested withdrawals will become available after 1 cycle</div>
      </div>
      <div className="l_line_footer">
        <Button type="primary">Request</Button>
        <Button type="primary">Withdraw</Button>
      </div>
    </>
  )
}

export default ModalPWithdraw
