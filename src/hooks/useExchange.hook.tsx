import { Dispatch, SetStateAction, useEffect, useMemo } from 'react'

import { IButtonDropOption } from '@/components/UI/select/button-drop.component'
import { useBalFormat } from './useBalFormat.hook'
import { usePrices } from './usePriceshook'
import { useUserDataContext } from '@/context/user-data.context'

interface IUseExchange {
  fromAmount: number
  toAmount: number
  toBal: string
  fromBal: string
  setFromBal: Dispatch<SetStateAction<string>>
  setFromAmount: Dispatch<SetStateAction<number>>
  setToAmount: Dispatch<SetStateAction<number>>
  setToBal: Dispatch<SetStateAction<string>>
}

type IInputError = {
  error: boolean
  message?: string
}

export const useExchange = (props: IUseExchange) => {
  const { fromAmount, fromBal, setFromAmount, setFromBal, setToAmount, setToBal, toBal } = props
  const { getFromPrice, getToPrice, availableExchangeBal, isFetching, exchangeRate } = usePrices()
  const { getCurrencyIcon } = useBalFormat()
  const { data } = useUserDataContext()

  const balOptions: IButtonDropOption[] = useMemo(() => {
    return Object.keys(data.balances).map((item: string) => {
      return {
        value: item,
        label: getCurrencyIcon(item)
      }
    })
  }, [data.balances, availableExchangeBal])

  const availableToBalOptions: IButtonDropOption[] = useMemo(() => {
    return availableExchangeBal.map((item: string) => {
      return {
        value: item,
        label: getCurrencyIcon(item)
      }
    })
  }, [availableExchangeBal])

  const balanceCurrent: { label: string; amount: number } = useMemo(() => {
    return {
      label: fromBal,
      amount: data.balances[fromBal as string]
    }
  }, [fromBal, data.balances])

  const inputFromErrors: IInputError = useMemo(() => {
    return fromAmount > balanceCurrent.amount
      ? {
          error: true,
          message: 'No tienes suficientes fondos'
        }
      : typeof fromAmount !== 'number' || isNaN(fromAmount)
      ? {
          error: true,
          message: 'Ingrese un número con formato válido'
        }
      : fromAmount < 0
      ? {
          error: true,
          message: 'No puede ingresar un número menor a 0'
        }
      : {
          error: false
        }
  }, [fromAmount])

  const onPriceFromChange = (newVal: string) => {
    const newFromValue = newVal.length > 0 ? parseFloat(newVal) : 0
    setFromAmount(newFromValue)
    setToAmount(getToPrice(fromBal, toBal, newFromValue))
  }
  const onPriceToChange = (newVal: string) => {
    const newToValue = parseFloat(newVal)
    setToAmount(newToValue)
    setFromAmount(getFromPrice(fromBal, toBal, newToValue))
  }

  const onFromBalChange = (newBal: string) => {
    setFromBal(newBal)
    onPriceFromChange('0')
    if (newBal === toBal) {
      setToBal(availableExchangeBal.filter((item) => item !== newBal)[0])
    }
  }
  const onToBalChange = (newBal: string) => {
    setToBal(newBal)
    if (newBal === fromBal) {
      onPriceFromChange('0')
      setFromBal(balOptions.filter((item) => item.value !== newBal)[0].value)
    } else {
      setToAmount(getToPrice(fromBal, newBal, fromAmount))
    }
  }

  const updatePrices = () => {
    setToAmount(getToPrice(fromBal, toBal, fromAmount))
  }

  useEffect(() => {
    if (!toBal.length && !fromBal.length && availableExchangeBal.length > 0) {
      setFromBal(availableExchangeBal[0])
      setToBal(availableExchangeBal[1])
    }
  }, [availableExchangeBal])

  useEffect(() => {
    if (!isFetching) {
      updatePrices()
    }
  }, [isFetching])

  return {
    balOptions,
    availableToBalOptions,
    balanceCurrent,
    inputFromErrors,
    onPriceFromChange,
    onPriceToChange,
    onFromBalChange,
    onToBalChange,
    isFetching,
    exchangeRate
  }
}
