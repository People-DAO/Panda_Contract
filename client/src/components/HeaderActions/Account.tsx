import * as React from 'react'
import { Button, Space, Typography } from 'antd'
import { useAccount } from 'wagmi'

export const Account = () => {
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  })

  if (!accountData) return <div>No account connected</div>

  return (
    <Space direction="vertical" style={{ marginRight: '1rem' }}>
      <div>
        <Button onClick={() => disconnect()}>Disconnect from {accountData?.connector?.name}</Button>
      </div>

      <Typography style={{ color: 'white' }}>
        {accountData?.ens?.name ?? accountData?.address}
        {accountData?.ens ? ` (${accountData?.address})` : null}
      </Typography>

      {accountData?.ens?.avatar && <img src={accountData.ens.avatar} style={{ height: 40, width: 40 }} />}
    </Space>
  )
}
