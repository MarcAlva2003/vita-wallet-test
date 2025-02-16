'use client'

import { BalanceCard } from '@/components/balance-card/balance-card.component'
import { SimpleCoinIcon } from '@/assets/icons'
import { useMemo } from 'react'

export default function Home() {
  const balances = {
    usd: 8017079.39,
    usdc: 1803418.31,
    usdt: 103221.24,
    btc: 1.574e-5
  }

  const formattedBals:  { currency: string; balance: number }[] = useMemo(() => {
    return Object.entries(balances).map(([currency, balance]) => ({ currency, balance }));
  }, [])

  return (
    <div>
      <header className="flex items-center mb-[74px]">
        <SimpleCoinIcon className="mr-3" />
        <h2 className="">
          ¡Hola <span className="bg-gradient-to-r from-blue-2 to-blue-1 bg-clip-text text-transparent">Marcos!</span>
        </h2>
      </header>
      <section className="mb-[56px]">
        <h3 className="mb-6">Mis saldos</h3>
        <ul className="grid grid-cols-3 gap-[20px]">
          {formattedBals.map((item, index) => (
            <li key={`balance-card-${index}`}>
              <BalanceCard balance={item.balance} currencyKey={item.currency} />
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3 className="mb-6">Historial</h3>
      </section>
    </div>
  )
}
