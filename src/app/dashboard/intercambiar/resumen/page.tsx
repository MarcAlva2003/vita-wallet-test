'use client'

import { APP_ROUTES } from '@/constants/app-routes.constant'
import { ArrowLeftIcon } from '@/assets/icons/ui'
import Link from 'next/link'
import { useExchangeData } from '@/context/exchange-data.context'
import { useFormatText } from '@/hooks/useFormatText.hook'

export default function ExchangeResume() {
  const {fromAmount, toAmount, fromBal, toBal} = useExchangeData()
  const { formatBalanceNumber } = useFormatText()

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
          <div className='w-full flex items-center justify-between mb-2'>
            <p className='text-[14px]'>Monto a intercambiar</p>
            <p className='font-semibold'>$ {formatBalanceNumber(fromAmount)} {fromBal.toUpperCase()}</p>
          </div>
          <div className='w-full flex items-center justify-between mb-2'>
            <p className='text-[14px]'>Tasa de cambio</p>
            <p className='font-semibold'></p>
          </div>
          <div className='w-full flex items-center justify-between mb-2'>
            <p className='text-[14px]'>Total a recibir</p>
            <p className='font-semibold text-blue-1'>{formatBalanceNumber(toAmount)} {toBal.toUpperCase()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
