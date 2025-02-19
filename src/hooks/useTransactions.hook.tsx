import { useEffect, useState } from 'react'

import { ITransaction } from '@/interfaces/transactions.interfaces'
import { getTransactions } from '@/services/transactions.service'
import { usePrices } from './usePriceshook'
import { useQuery } from '@tanstack/react-query'
import { useUserToken } from './useUserToken.hook'

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([])
  const [statusCode, setStatusCode] = useState<number>(0)
  const { getAccessToken, getUserId, getClient, getExpiry, logout } = useUserToken()
  const {
    data,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['getTransactions'],
    queryFn: () =>
      getTransactions({
        accessToken: getAccessToken() as string,
        uid: getUserId() as string,
        client: getClient() as string,
        expiry: getExpiry() as string
      }),
    retry: false,
    enabled: statusCode !== 200
  })

  useEffect(() => {
    setStatusCode(data?.statusCode as number)
    if (data?.statusCode === 401) {
      logout()
    } else {
      if (data?.data.data) {
        const transactions: ITransaction[] = data?.data.data
        setTransactions(transactions)
      }
    }
  }, [data, isFetching, isLoading])

  return {
    transactions
  }
}
