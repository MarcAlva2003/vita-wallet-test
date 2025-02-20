import { BitcoinIcon, ChileIcon, DollarIcon, TetherIcon, USAIcon, UsdcIcon } from '@/assets/icons/ui'

import { IBalCurrency } from '@/interfaces/balance.interfaces'
import React from 'react'

export const useBalFormat = () => {
  const balanceCurrencies: IBalCurrency[] = [
    {
      icon: <USAIcon />,
      label: 'Dolar Estadounidence',
      key: 'usd'
    },
    {
      icon: <UsdcIcon />,
      label: 'USDC',
      key: 'usdc'
    },
    {
      icon: <TetherIcon />,
      label: 'Tether',
      key: 'usdt'
    },
    {
      icon: <ChileIcon />,
      label: 'Peso CHileno',
      key: 'clp'
    },
    {
      icon: <BitcoinIcon />,
      label: 'Bitcoin',
      key: 'btc'
    }
  ]

  const defaultCurrencySymbols: IBalCurrency = {
    icon: <DollarIcon />,
    label: '',
    key: 'default'
  }

  const getCurrencyIcon = (key: string): React.ReactNode => {
    const balData = balanceCurrencies.filter((item: IBalCurrency) => item.key === key)[0]
    return balData?.icon ?? defaultCurrencySymbols.icon
  }
  const getCurrencyLabel = (key: string): React.ReactNode => {
    const balData = balanceCurrencies.filter((item: IBalCurrency) => item.key === key)[0]
    return balData?.label ?? key.toUpperCase()
  }

  return {
    getCurrencyIcon,
    getCurrencyLabel
  }
}
