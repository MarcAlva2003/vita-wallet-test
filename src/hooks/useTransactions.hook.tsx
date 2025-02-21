import { useEffect, useState } from 'react'

import { ITransaction } from '@/interfaces/transactions.interfaces'
import { getTransactions } from '@/services/transactions.service'
import { useQuery } from '@tanstack/react-query'
import { useSessionExpired } from '@/context/session-expired.context'
import { useUserToken } from './useUserToken.hook'

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([])
  const [statusCode, setStatusCode] = useState<number>(0)
  const { onSessionExpired } = useSessionExpired()
  const { getAccessToken, getUserId, getClient, getExpiry } = useUserToken()
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['getTransactions'],
    queryFn: () =>
      getTransactions({
        accessToken: getAccessToken() as string,
        uid: getUserId() as string,
        client: getClient() as string,
        expiry: getExpiry() as string
      }),
    retry: false,
    enabled: statusCode !== 200 && !!getAccessToken()
  })

  useEffect(() => {
    setStatusCode(data?.statusCode as number)
    if (data?.statusCode === 401) {
      console.log('HERE 4');   
      onSessionExpired()
    } else {
      if (data?.data.data) {
        const transactions: ITransaction[] = data?.data.data
        setTransactions(transactions)
      }
    }
  }, [data, isFetching, isLoading, onSessionExpired])

  return {
    transactions,
    isLoading
  }
}
