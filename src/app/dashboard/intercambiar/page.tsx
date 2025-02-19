'use client'

import { ButtonDrop, IButtonDropOption } from '@/components/UI/select/button-drop.component'
import { useEffect, useMemo } from 'react'

import { APP_ROUTES } from '@/constants/app-routes.constant'
import Button from '@/components/UI/button/button.component'
import { DollarIcon } from '@/assets/icons/ui'
import Input from '@/components/UI/input/input.component'
import { useBalFormat } from '@/hooks/useBalFormat.hook'
import { useExchangeData } from '@/context/exchange-data.context'
import { usePrices } from '@/hooks/usePriceshook'
import { useRouter } from 'next/navigation'
import { useUserDataContext } from '@/context/user-data.context'

type IInputError = {
  error: boolean
  message?: string
}

export default function Intercambiar() {
  const router = useRouter()
  const { getCurrencyIcon } = useBalFormat()
  const { getFromPrice, getToPrice, availableExchangeBal } = usePrices()
  const { data } = useUserDataContext()
  const { fromAmount, fromBal, toAmount, toBal, setFromAmount, setFromBal, setToAmount, setToBal } = useExchangeData()

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
    onPriceFromChange('0')
    if (newBal === fromBal) {
      setFromBal(balOptions.filter((item) => item.value !== newBal)[0].value)
    }
  }

  const onSubmit = () => {
    router.push(APP_ROUTES.EXCHANGE_RESUME)
  }

  useEffect(() => {
    if (!toBal.length && !fromBal.length && availableExchangeBal.length > 0) {
      setFromBal(availableExchangeBal[0])
      setToBal(availableExchangeBal[1])
    }
  }, [availableExchangeBal])

  return (
    <div className="min-h-[calc(100vh_-_113px)] flex flex-col justify-between">
      <div>
        <header className="mb-10">
          <h2>¿Qué deseas intercambiar?</h2>
        </header>
        <div className="mb-12">
          <p className="text-blue-2 font-semibold">
            Saldo disponible:{' '}
            <button
              onClick={() => {
                onPriceFromChange(balanceCurrent.amount.toString())
              }}
              className="hover:underline"
            >
              {balanceCurrent.amount} {balanceCurrent.label.toUpperCase()}
            </button>
          </p>
        </div>
        <div>
          <p className="mb-4">Monto a intercambiar</p>
          <div className="flex mb-12">
            <div className="w-fit mr-4">
              <ButtonDrop
                options={balOptions}
                value={fromBal}
                onChange={(ev) => {
                  onFromBalChange(ev.value)
                }}
              />
            </div>
            <div className="w-full max-w-[380px]">
              <Input
                value={fromAmount.toString()}
                iconLeft={<DollarIcon />}
                type="number"
                onChange={(ev) => {
                  onPriceFromChange(ev.target.value)
                }}
                error={inputFromErrors.error}
                errorMessage={inputFromErrors.message}
              />
            </div>
          </div>
          <p className="mb-4">Quiero recibir</p>
          <div className="flex">
            <div className="w-fit mr-4">
              <ButtonDrop
                options={availableToBalOptions}
                value={toBal}
                onChange={(ev) => {
                  onToBalChange(ev.value)
                }}
              />
            </div>
            <div className="w-full max-w-[380px]">
              <Input
                value={toAmount.toString()}
                type="number"
                onChange={(ev) => {
                  onPriceToChange(ev.target.value)
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <Button variant="outlined" className="w-[180px] mr-5">
          Atrás
        </Button>
        <Button
          disabled={fromAmount <= 0 || toAmount <= 0 || inputFromErrors.error}
          variant="gradiant"
          className="w-[180px]"
          onClick={onSubmit}
        >
          Continuar
        </Button>
      </div>
    </div>
  )
}
