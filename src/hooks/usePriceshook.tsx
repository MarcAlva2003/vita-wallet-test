import { useEffect, useState } from 'react'

import { getPrices } from '@/services/prices.service'
import { useQuery } from '@tanstack/react-query'
import { useSessionExpired } from '@/context/session-expired.context'
import { useUserToken } from './useUserToken.hook'

export const usePrices = () => {
  const [, setStatusCode] = useState<number>(0)
  const [exchangeRate, setExchangeRate] = useState<number>()
  const [prices, setPrices] = useState<{ [key: string]: { [key: string]: number } } | undefined>(undefined)
  const [availableExchangeBal, setAvailableExchangeBal] = useState<string[]>([])
  const { getAccessToken, getUserId, getClient, getExpiry } = useUserToken()
  const { onSessionExpired } = useSessionExpired()
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

  const getFromPrice = (fromBal: string, toBal: string, toAmount: number): number => {
    if (prices && fromBal.length && toBal.length) {
      const price: number = prices[toBal as string][fromBal as string]
      return price * toAmount
    }
    return 0
  }

  const getToPrice = (fromBal: string, toBal: string, fromAmount: number) => {
    if (prices && fromBal.length && toBal.length) {
      const price: number = prices[toBal as string][fromBal as string]
      setExchangeRate(price)
      return (fromAmount * 1) / price
    }
    return 0
  }

  const getBtcMinSend = (toBal: string): number => {
    if (prices) {
      return prices[toBal as string].btc_min_total_send_external as number
    }
    return 0
  }

  useEffect(() => {
    setStatusCode(data?.statusCode as number)
    if (data?.statusCode === 401) {
      onSessionExpired()
    } else {
      if (data?.data.prices) {
        const prices = data?.data.prices
        setPrices(prices)
        setAvailableExchangeBal(Object.keys(prices).map((item: string) => item))
      }
    }
  }, [data, isFetching, isLoading, onSessionExpired])

  return {
    pricesLoading: isLoading,
    prices: data,
    getFromPrice,
    getToPrice,
    availableExchangeBal,
    isFetching,
    exchangeRate,
    getBtcMinSend
  }
}
