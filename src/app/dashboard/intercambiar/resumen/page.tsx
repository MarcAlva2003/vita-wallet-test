'use client'

import { useEffect, useState } from 'react'

import { APP_ROUTES } from '@/constants/app-routes.constant'
import { ArrowLeftIcon } from '@/assets/icons/ui'
import { AuthRequired } from '@/HOC/isAuthenticated.hoc'
import { BanknoteIcon } from '@/assets/icons'
import Button from '@/components/UI/button/button.component'
import Link from 'next/link'
import { ModalContainer } from '@/components/UI/modal/modal.component'
import { postExchange } from '@/services/exchange.service'
import { useExchange } from '@/hooks/useExchange.hook'
import { useExchangeData } from '@/context/exchange-data.context'
import { useFormatText } from '@/hooks/useFormatText.hook'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useUserToken } from '@/hooks/useUserToken.hook'

function ExchangeResume() {
  const router = useRouter()
  const [successModalOpen, setSuccessModalOpen] = useState<boolean>(false)
  const { formatBalanceNumber } = useFormatText()
  const { fromAmount, fromBal, toAmount, toBal, setFromAmount, setFromBal, setToAmount, setToBal } = useExchangeData()
  const { getAccessToken, getUserId, getClient, getExpiry, logout } = useUserToken()
  const { isFetching, exchangeRate, resetValues } = useExchange({
    fromAmount,
    fromBal,
    toAmount,
    toBal,
    setFromAmount,
    setFromBal,
    setToAmount,
    setToBal
  })
  const { mutate, isSuccess } = useMutation({
    mutationFn: () =>
      postExchange({
        accessToken: getAccessToken() as string,
        uid: getUserId() as string,
        client: getClient() as string,
        expiry: getExpiry() as string,
        amount_sent: fromAmount,
        currency_received: toBal,
        currency_sent: fromBal
      }),
    onSuccess: (data) => {
      if (data?.statusCode === 401) {
        logout()
      } else if (data?.statusCode === 201) {
        setSuccessModalOpen(true)
      } else {
        alert('No se pudo realizar la operación. Intenta de nuevo más tarde')
      }
    }
  })

  const onSubmit = () => {
    if (!isSuccess && !successModalOpen) {
      mutate()
    }
  }

  const goBack = () => {
    router.push(APP_ROUTES.EXCHANGE)
  }

  const onSuccessModalClose = () => {
    resetValues()
    goBack()
  }
  useEffect(() => {
    if (fromAmount === 0) {
      goBack()
    }
  }, [])

  return (
    <div className="min-h-[calc(100vh_-_113px)] flex flex-col justify-between">
      <div>
        <header className="mb-10 relative flex items-center mb-[90px]">
          <Link
            href={APP_ROUTES.EXCHANGE}
            className=" left-[-64px] w-[48px] mt-1 h-[48px] mr-4 flex items-center justify-center"
          >
            <ArrowLeftIcon className="scale-[1.4]" />
          </Link>
          <h2>Resumen de transacción</h2>
        </header>
        <div className="bg-white p-[11px_24px] w-full max-w-[490px]">
          <div className="w-full flex items-center justify-between mb-2">
            <p className="text-[14px]">Monto a intercambiar</p>
            <p className="font-semibold">
              $ {formatBalanceNumber(fromAmount)} {fromBal.toUpperCase()}
            </p>
          </div>
          <div className="w-full flex items-center justify-between mb-2">
            <p className="text-[14px]">Tasa de cambio</p>
            <p className="font-semibold">
              1 {fromBal.toUpperCase()} = {formatBalanceNumber(exchangeRate as number)} {toBal.toUpperCase()}
            </p>
          </div>
          <div className="w-full flex items-center justify-between mb-2">
            <p className="text-[14px]">Total a recibir</p>
            <p className="font-semibold text-blue-1">
              {formatBalanceNumber(toAmount)} {toBal.toUpperCase()}
            </p>
          </div>
        </div>
      </div>
      <div className="flex">
        <Button onClick={goBack} variant="outlined" className="w-[180px] mr-5">
          Atrás
        </Button>
        <Button disabled={isFetching} variant="gradiant" className="w-[180px]" onClick={onSubmit}>
          {isFetching ? 'Actualizando...' : 'Intercambiar'}
        </Button>
      </div>
      <ModalContainer isOpen={successModalOpen} onClose={onSuccessModalClose}>
        <div className="px-[100px] pt-[32px] pb-[54px]">
          <BanknoteIcon className="mb-[32px]" />
          <h2 className="text-blue-2 mb-4">¡Intercambio exitoso!</h2>
          <p>Ya cuentas con los BTC en tu saldo.</p>
        </div>
      </ModalContainer>
    </div>
  )
}

export default AuthRequired(ExchangeResume)
