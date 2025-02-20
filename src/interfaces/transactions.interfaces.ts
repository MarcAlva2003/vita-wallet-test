type ITransactionCategory = 'exchange' | 'transfer' | 'recharge'

export enum TransactionCategories {
  'exchange' = 'exchange',
  'transfer' = 'transfer',
  'recharge' = 'recharge'
}

export interface ITransactionRecipent {
  email: string
  first_name: string
  id: number
  last_name: string
}

export interface ITransaction {
  id: string
  attributes: {
    currency: string
    currency_iso_code: string
    recipient: ITransactionRecipent
    category: ITransactionCategory
    total: string
    sender_email: string
  }
}
