import { Dispatch, SetStateAction } from 'react'

export interface IUserBalance {
  [currency: string]: number
}

export interface IUserData {
  uid: string
  balances: IUserBalance
  firstName: string
  lastName: string
}

export interface IUserDataContext {
  data: IUserData
  setUid: Dispatch<SetStateAction<string>>
  setBalances: Dispatch<SetStateAction<IUserBalance>>
  setFirstName: Dispatch<SetStateAction<string>>
  setLastName: Dispatch<SetStateAction<string>>
  setUserData: (data: IUserData) => void
}