import React from 'react'
import { Button, Input } from 'antd'
import './index.css'

function ModalWithdraw() {
  return (
    <>
      <div className="l_line">
        <div>Votes:</div>
        <div>200</div>
      </div>
      <div className="l_line">
        <div>LQDF Locked:</div>
        <div>4000</div>
      </div>
      <div className="l_line">
        <div>LQDF Unlocked:</div>
        <div>2000</div>
      </div>
      <div className="l_line">
        <div>
          <span>LQDF</span>
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
        <div>1000($1398.00)</div>
      </div>
      <div className="l_line">
        <div>Unlock LQDF do not have the voting power</div>
      </div>
      <div className="l_line_footer">
        <Button type="primary">Withdraw</Button>
      </div>
    </>
  )
}

export default ModalWithdraw
