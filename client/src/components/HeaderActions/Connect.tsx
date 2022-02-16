import { Button, Image, Space } from 'antd'
import * as React from 'react'
import { useConnect } from 'wagmi'

import Icon from '@ant-design/icons'

import Avatar from '../../assets/avatar.png'
import Wallet from '../../assets/wallet.png'

export const Connect = () => {
  const [
    {
      data: { connector, connectors },
      error,
      loading,
    },
    connect,
  ] = useConnect()

  return (
    <Space>
      <Image className="avatar" preview={false} src={Avatar} width={30} height={30}></Image>

      {connectors.map((x) => (
        <Button
          disabled={!x.ready}
          key={x.name}
          onClick={() => connect(x)}
          icon={
            <Icon
              component={(props: any) => (
                <Image {...props} preview={false} src={Wallet} width={30} height={30} />
              )}
            />
          }
        >
          {x.name}
          {!x.ready && ' (unsupported)'}
          {loading && x.name === connector?.name && '…'}
        </Button>
      ))}
      <div>{error && (error?.message ?? 'Failed to connect')}</div>
    </Space>
  )
}
