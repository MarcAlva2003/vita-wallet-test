'use client'

import { APP_ROUTES } from '@/constants/app-routes.constant'
import { AuthRequired } from '@/HOC/isAuthenticated.hoc'
import Button from '@/components/UI/button/button.component'
import { ButtonDrop } from '@/components/UI/select/button-drop.component'
import { DollarIcon } from '@/assets/icons/ui'
import Input from '@/components/UI/input/input.component'
import { Skeleton } from '@/components/UI/skeleton/skeleton.component'
import { useExchange } from '@/hooks/useExchange.hook'
import { useExchangeData } from '@/context/exchange-data.context'
import { useMemo } from 'react'
import { useRouter } from 'next/navigation'

function Intercambiar() {
  const router = useRouter()
  const { fromAmount, fromBal, toAmount, toBal, setFromAmount, setFromBal, setToAmount, setToBal } = useExchangeData()
  const {
    availableToBalOptions,
    balOptions,
    balanceCurrent,
    inputFromErrors,
    onFromBalChange,
    onPriceFromChange,
    onPriceToChange,
    onToBalChange
  } = useExchange({ fromAmount, fromBal, toAmount, toBal, setFromAmount, setFromBal, setToAmount, setToBal })

  const onSubmit = () => {
    router.push(APP_ROUTES.EXCHANGE_RESUME)
  }

  const statusLoading = useMemo(() => {
    return !fromBal.length || !toBal.length
  }, [fromBal, toBal])

  return (
    <div className="min-h-[calc(100vh_-_150px)] flex flex-col justify-between">
      <div className="max-h-[calc(100vh_-_150px_-_71px)] h-[calc(100vh_-_150px_-_75px)] pl-[2px] overflow-auto">
        <header className="mb-10">
          <h2>¿Qué deseas intercambiar?</h2>
        </header>
        <div className="mb-12 flex">
          <p className="text-blue-2 font-semibold mr-1">Saldo disponible: </p>
          {balanceCurrent.amount ? (
            <p className="text-blue-2 font-semibold">
              <button
                onClick={() => {
                  onPriceFromChange(balanceCurrent.amount.toString())
                }}
                className="hover:underline"
              >
                {balanceCurrent.amount} {balanceCurrent.label.toUpperCase()}
              </button>
            </p>
          ) : (
            <Skeleton width={120} height={24} />
          )}
        </div>
        <div>
          <p className="mb-4">Monto a intercambiar</p>
          <div className="flex mb-12">
            <div className="w-fit mr-4">
              {statusLoading ? (
                <Skeleton height={56} width={86} />
              ) : (
                <ButtonDrop
                  options={balOptions}
                  value={fromBal}
                  onChange={(ev) => {
                    onFromBalChange(ev.value)
                  }}
                />
              )}
            </div>
            <div className="w-full max-w-[380px]">
              {statusLoading ? (
                <Skeleton height={56} width={'100%'} />
              ) : (
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
              )}
            </div>
          </div>
          <p className="mb-4">Quiero recibir</p>
          <div className="flex">
            <div className="w-fit mr-4">
              {statusLoading ? (
                <Skeleton height={56} width={86} />
              ) : (
                <ButtonDrop
                  options={availableToBalOptions}
                  value={toBal}
                  onChange={(ev) => {
                    onToBalChange(ev.value)
                  }}
                />
              )}
            </div>
            <div className="w-full max-w-[380px]">
              {statusLoading ? (
                <Skeleton height={56} width={'100%'} />
              ) : (
                <Input
                  value={toAmount.toString()}
                  type="number"
                  onChange={(ev) => {
                    onPriceToChange(ev.target.value)
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex pt-4">
        <Button variant="outlined" className="max-w-[185px] mr-5">
          Atrás
        </Button>
        <Button
          disabled={fromAmount <= 0 || toAmount <= 0 || inputFromErrors.error}
          variant="gradiant"
          className="max-w-[185px]"
          onClick={onSubmit}
        >
          Continuar
        </Button>
      </div>
    </div>
  )
}

export default AuthRequired(Intercambiar)
