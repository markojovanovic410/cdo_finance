import BigNumber from "bignumber.js"
import { Contract } from 'web3-eth-contract'

export class PopupProps {

	action: string

	pool: string

	imgSrc: string

	tokenRatio: BigNumber

	balance: BigNumber

	tokenContract: Contract

	flexTokenContract: Contract

	onClose: () => void

}
