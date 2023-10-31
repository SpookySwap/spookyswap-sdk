import invariant from 'tiny-invariant'
import { ChainId } from '../constants'
import { validateAndParseAddress } from '../utils'
import { Currency } from './currency'

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class Token extends Currency {
  public readonly chainId: ChainId
  public readonly address: string

  public constructor(chainId: ChainId, address: string, decimals: number, symbol?: string, name?: string) {
    super(decimals, symbol, name)
    this.chainId = chainId
    this.address = validateAndParseAddress(address)
  }

  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */
  public equals(other: Token): boolean {
    // short circuit on reference equality
    if (this === other) {
      return true
    }
    return this.chainId === other.chainId && this.address === other.address
  }

  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  public sortsBefore(other: Token): boolean {
    invariant(this.chainId === other.chainId, 'CHAIN_IDS')
    invariant(this.address !== other.address, 'ADDRESSES')
    return this.address.toLowerCase() < other.address.toLowerCase()
  }
}

/**
 * Compares two currencies for equality
 */
export function currencyEquals(currencyA: Currency, currencyB: Currency): boolean {
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB)
  } else if (currencyA instanceof Token) {
    return false
  } else if (currencyB instanceof Token) {
    return false
  } else {
    return currencyA === currencyB
  }
}

//Ensures that newly added tokens have corresponding Wrapped Addresses
type TokenMap = { [exchange in ChainId]: Token };

export const WETH: TokenMap = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83',
    18,
    'WFTM',
    'Wrapped FTM'
  ),
  [ChainId.BITTORRENT_MAINNET]: new Token(
    ChainId.BITTORRENT_MAINNET,
    '0x23181f21dea5936e24163ffaba4ea3b316b57f3c',
    18,
    'WBTT',
    'Wrapped Bittorrent'
  ),
  [ChainId.EON_MAINNET]: new Token(
    ChainId.EON_MAINNET,
    '0xF5cB8652a84329A2016A386206761f455bCEDab6',
    18,
    'WZEN',
    'Wrapped ZEN'
  ),
  
  [ChainId.FTMTESTNET]: new Token(
    ChainId.FTMTESTNET,
    '0xf1277d1Ed8AD466beddF92ef448A132661956621',
    18,
    'WFTM',
    'Wrapped FTM'
  ),
  [ChainId.BSC]: new Token(
    ChainId.MAINNET,
    '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83',
    18,
    'WFTM',
    'Wrapped FTM'
  ),
  [ChainId.ETHMAINNET]: new Token(
    ChainId.MAINNET,
    '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83',
    18,
    'WFTM',
    'Wrapped FTM'
  )
}
