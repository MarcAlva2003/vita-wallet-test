import { useEffect, useState } from 'react'

import { getPrices } from '@/services/prices.service'
import { useQuery } from '@tanstack/react-query'
import { useUserToken } from './useUserToken.hook'

export const usePrices = () => {
  const [, setStatusCode] = useState<number>(0)
  const [exchangeRate, setExchangeRate] = useState<number>()

  const [prices, setPrices] = useState<{ [key: string]: { [key: string]: number } }>()
  const [availableExchangeBal, setAvailableExchangeBal] = useState<string[]>([])
  const { getAccessToken, getUserId, getClient, getExpiry, logout } = useUserToken()
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['getPrices'],
    queryFn: () =>
      getPrices({
        accessToken: getAccessToken() as string,
        uid: getUserId() as string,
        client: getClient() as string,
        expiry: getExpiry() as string
      }),
    retry: false,
    refetchInterval: 60 * 1000 //1 MIN
  })

  useEffect(() => {
    setStatusCode(data?.statusCode as number)
    if (data?.statusCode === 401) {
      logout()
    } else {
      if (data?.data.prices) {
        const prices = data?.data.prices
        setPrices(prices)
        setAvailableExchangeBal(Object.keys(prices).map((item: string) => item))
      }
    }
  }, [data, isFetching, isLoading])

  const getFromPrice = (fromBal: string, toBal: string, toAmount: number): number => {
    if (prices) {
      const price: number = prices[toBal as string][fromBal as string]
      return price * toAmount
    }
    return 0
  }

  const getToPrice = (fromBal: string, toBal: string, fromAmount: number) => {
    if (prices) {
      const price: number = prices[toBal as string][fromBal as string]
      setExchangeRate(price)
      return (fromAmount * 1) / price
    }
    return 0
  }

  return {
    pricesLoading: isLoading,
    prices: data,
    getFromPrice,
    getToPrice,
    availableExchangeBal,
    isFetching,
    exchangeRate
  }
}
