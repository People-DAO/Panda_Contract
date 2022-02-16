import { Button, Input, Modal } from 'antd'
import React, { useState } from 'react'
import './index.css'

function One(props) {
  const [visible, setVisible] = useState(false)
  function showModalC() {
    //setVisible(true);
    console.log('showone')
    props.SetShowModalC()
  }

  function showModalP() {
    props.SetShowModalP()
  }

  function handleCancel() {
    setVisible(false)
  }
  return (
    <div className="acontent">
      <div>
        <div className="content">
          <div className="cbox">
            <div className="cbox1">
              <div>Cycle</div>
              <div>Current:152</div>
              <div>Next:0D 0H 59M</div>
            </div>
          </div>
          <div className="cbox">
            <div className="cbox1">
              <div>Total</div>
              <div>TVL</div>
              <div>$ 233M</div>
            </div>
          </div>
          <div className="cbox">
            <div className="cbox1">
              <div>Asset</div>
              <div>TVL</div>
              <div>$ 233M</div>
            </div>
          </div>
          <div className="cbox">
            <div className="cbox1">
              <div>USL</div>
              <div>TVL</div>
              <div>$ 233M</div>
            </div>
          </div>
          <div className="cbox">
            <div className="cbox1">
              <div>LQDF Locked</div>
              <div>TVL</div>
              <div>$ 233M</div>
            </div>
            <div className="cbox2">
              <Button type="primary" onClick={showModalC}>
                Lock
              </Button>
            </div>
          </div>
          <div className="cbox">
            <div className="cbox1">
              <div>LQDF LP</div>
              <div>TVL</div>
              <div>$ 233M</div>
            </div>
            <div className="cbox2">
              <Button type="primary">Stake</Button>
            </div>
          </div>
        </div>
        <div className="m_title">
          <div className="m_title_header">Markets</div>
          <div className="m_title_box">
            <div className="m_box">Protocol</div>
            <div className="m_box">Pair Asset</div>
            <div className="m_box">APR</div>
            <div className="m_box">TVL</div>
            <div className="m_box">My Liquidity</div>
            <div className="m_box">Vote</div>
          </div>
        </div>
        <div className="b_content">
          <div className="b_content_box">
            <div className="b_box_1">Trisolaris</div>
            <div className="b_box_2">
              <div className="b_box_2line">
                <div className="b_box_2line_c">USDT</div>
                <div className="b_box_2line_c">20%</div>
                <div className="b_box_2line_c">45,000</div>
                <div className="b_box_2line_c">
                  <div>1,000</div>
                  <div style={{ margin: '10px' }}>
                    <Button type="primary" onClick={showModalP}>
                      Deposit
                    </Button>
                  </div>
                </div>
              </div>
              <div className="b_box_line"></div>
              <div className="b_box_2line">
                <div className="b_box_2line_c">USDT</div>
                <div className="b_box_2line_c">20%</div>
                <div className="b_box_2line_c">45,000</div>
                <div className="b_box_2line_c">
                  <div>1,000</div>
                  <div style={{ margin: '10px' }}>
                    <Button type="primary" onClick={showModalP}>
                      Deposit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="b_box_3">
              <div className="b_box_3line" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                Current Votes:3000
              </div>
              <div className="b_box_3line">
                <Input.Group compact>
                  <Input style={{ width: '100px' }} defaultValue="" />
                  <Button type="primary">Max</Button>
                </Input.Group>
              </div>
              <div className="b_box_3line">
                <Button type="primary">Vote</Button>
              </div>
            </div>
          </div>
          <div className="b_content_box">
            <div className="b_box_1">Wanna Swap</div>
            <div className="b_box_2">
              <div className="b_box_2line">
                <div className="b_box_2line_c">USDT</div>
                <div className="b_box_2line_c">20%</div>
                <div className="b_box_2line_c">45,000</div>
                <div className="b_box_2line_c">
                  <div>1,000</div>
                  <div style={{ margin: '10px' }}>
                    <Button type="primary" onClick={showModalP}>
                      Deposit
                    </Button>
                  </div>
                </div>
              </div>
              <div className="b_box_line"></div>
              <div className="b_box_2line">
                <div className="b_box_2line_c">USDT</div>
                <div className="b_box_2line_c">20%</div>
                <div className="b_box_2line_c">45,000</div>
                <div className="b_box_2line_c">
                  <div>1,000</div>
                  <div style={{ margin: '10px' }}>
                    <Button type="primary" onClick={showModalP}>
                      Deposit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="b_box_3">
              <div className="b_box_3line" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                Current Votes:3000
              </div>
              <div className="b_box_3line">
                <Input.Group compact>
                  <Input style={{ width: '100px' }} defaultValue="" />
                  <Button type="primary">Max</Button>
                </Input.Group>
              </div>
              <div className="b_box_3line">
                <Button type="primary">Vote</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer">
          <div className="footer_g">
            <div className="footer_c">LQDF Locked: 1000</div>
            <div className="footer_c">Available Votes: 300</div>
            <div className="footer_c">Voted: 100</div>
            <div className="footer_c">
              <Button type="primary">Submit Vote</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default One
