import React, { useState } from 'react'

// 合约
import { ethers, providers } from 'ethers'
import Greeter from '../../contracts/Greeter.sol/Greeter.json'
import { Button, Input } from 'antd'

import './index.css'

//合约地址
const greeterAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

function Chaingreeting() {
  const [greeting, setGreetingValue] = useState()

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  }

  async function fetchGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
      try {
        const data = await contract.greet()
        console.log('data: ', data)
      } catch (err) {
        console.log('Error: ', err)
      }
    }
  }

  async function setGreeting() {
    if (!greeting) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(greeting)
      await transaction.wait()
      fetchGreeting()
    }
  }

  return (
    <div className="chain_greeter">
      <header className="greeter_header">
        <Button onClick={fetchGreeting}>Fetch Greeting</Button>
        <Button onClick={setGreeting}>Set Greeting</Button>
        <Input onChange={(e) => setGreetingValue(e.target.value)} placeholder="Set greeting" />
      </header>
    </div>
  )
}

export default Chaingreeting
