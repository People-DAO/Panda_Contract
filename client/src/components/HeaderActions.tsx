import React from 'react'
import { useAccount } from 'wagmi'

import { Account } from './HeaderActions/Account'
import { Connect } from './HeaderActions/Connect'

export const HeaderActions = () => {
	const [{ data: accountData }] = useAccount()

	if (accountData?.address)
		return (
			<>
				<Account />
				{/* <NetworkSwitcher /> */}
			</>
		)

	return <Connect />
}
