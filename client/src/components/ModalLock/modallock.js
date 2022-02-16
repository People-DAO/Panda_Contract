import React from 'react'
import { Select, Button, Input } from 'antd'
import './index.css'

const { Option } = Select
const children = [<Option key={1}>{100}</Option>, <Option key={2}>{200}</Option>]
function ModalLock() {
  function handleChange(value) {
    console.log(`Selected: ${value}`)
  }

  return (
    <>
      <div className="l_line">
        <div>Votes:</div>
        <div>300</div>
      </div>
      <div className="l_line">
        <div>LQDF Locked:</div>
        <div>1000</div>
      </div>
      <div className="l_line">
        <div className="l_line_box">
          <Input.Group compact>
            <Input style={{ width: '100px' }} defaultValue="" />
            <Button type="primary">Max</Button>
          </Input.Group>
        </div>
        <div>
          <Select size="default" defaultValue="Select Lock Period" onChange={handleChange} style={{ width: 200 }}>
            {children}
          </Select>
        </div>
      </div>
      <div className="l_line">
        <div>
          <div>Balance:</div>
          <div>5000</div>
        </div>
        <div>
          <div>Unlock:</div>
          <div>2000</div>
        </div>
      </div>
      <div className="l_line">
        <div>veLQDF Voting Weights</div>
      </div>
      <div className="l_line">
        <div>Lock for 14 days:</div>
        <div>0.2</div>
      </div>
      <div className="l_line">
        <div>Lock for 28 days:</div>
        <div>0.45</div>
      </div>
      <div className="l_line">
        <div>Lock for 56 days:</div>
        <div>1.035</div>
      </div>
      <div className="l_line">
        <div>Lock for 112 days:</div>
        <div>2.485</div>
      </div>
      <div className="l_line">
        <div>Lock for 182 days:</div>
        <div>0.2</div>
      </div>
      <div className="l_line">
        <div>Lock for 365 days:</div>
        <div>0.2</div>
      </div>
      <div className="l_line_footer">
        <Button type="primary">Lock</Button>
      </div>
    </>
  )
}

export default ModalLock
