'use client'

import { AuthRequired } from '@/HOC/isAuthenticated.hoc'
import { BalanceCard } from '@/components/balance-card/balance-card.component'
import { IUserBalance } from '@/interfaces/user-data.interfaces'
import { SimpleCoinIcon } from '@/assets/icons'
import { useMemo } from 'react'
import { useProfile } from '@/hooks/useProfile.hook'
import { useUserDataContext } from '@/context/user-data.context'

function Home() {
  const { data } = useUserDataContext()

  const {} = useProfile()

  const formattedBals: { currency: string; balance: number }[] = useMemo(() => {
    return Object.entries(data.balances as IUserBalance).map(([currency, balance]) => ({ currency, balance }))
  }, [data.balances])

  return (
    <div>
      <header className="flex items-center mb-[74px]">
        <SimpleCoinIcon className="mr-3" />
        <h2 className="">
          ¡Hola{' '}
          <span className="bg-gradient-to-r from-blue-2 to-blue-1 bg-clip-text text-transparent">
            {data.firstName}!
          </span>
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

export default AuthRequired(Home)
