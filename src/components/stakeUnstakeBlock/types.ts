import { Contract } from 'web3-eth-contract'
import BigNumber from "bignumber.js"

export class StakeUnstakeProps {
	title: string
	pid: number
	targetContract: Contract
	balance: BigNumber
	allowance?: BigNumber
	isUnstake?: boolean
	disabled?: boolean
}