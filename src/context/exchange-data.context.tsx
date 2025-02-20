import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react'

interface IExchangeDataContext {
  fromAmount: number
  toAmount: number
  toBal: string
  fromBal: string
  setFromBal: Dispatch<SetStateAction<string>>
  setFromAmount: Dispatch<SetStateAction<number>>
  setToAmount: Dispatch<SetStateAction<number>>
  setToBal: Dispatch<SetStateAction<string>>
}

const ExchangeDataContext = createContext<IExchangeDataContext>({
  fromAmount: 0,
  toAmount: 0,
  toBal: '',
  fromBal: '',
  setFromBal: () => {},
  setFromAmount: () => {},
  setToAmount: () => {},
  setToBal: () => {}
})

export const ExchangeDataContextProvider = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  const [fromBal, setFromBal] = useState<string>('')
  const [fromAmount, setFromAmount] = useState<number>(0)
  const [toAmount, setToAmount] = useState<number>(0)
  const [toBal, setToBal] = useState<string>('')

  return (
    <ExchangeDataContext.Provider
      value={{
        fromAmount,
        toAmount,
        toBal,
        fromBal,
        setFromBal,
        setFromAmount,
        setToAmount,
        setToBal
      }}
    >
      {children}
    </ExchangeDataContext.Provider>
  )
}

export const useExchangeData = () => useContext(ExchangeDataContext)
