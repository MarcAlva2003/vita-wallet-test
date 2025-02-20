'use client'

import { AuthRequired } from '@/HOC/isAuthenticated.hoc'
import { BalanceCard } from '@/components/balance-card/balance-card.component'
import { IUserBalance } from '@/interfaces/user-data.interfaces'
import { SimpleCoinIcon } from '@/assets/icons'
import { Skeleton } from '@/components/UI/skeleton/skeleton.component'
import { TransactionItem } from '@/components/transaction-item/transaction-item.component'
import { TransactionItemSkeleton } from '@/components/transaction-item/transaction-skeleton.component'
import { useMemo } from 'react'
import { useTransactions } from '@/hooks/useTransactions.hook'
import { useUserDataContext } from '@/context/user-data.context'

function Home() {
  const { data } = useUserDataContext()

  const { transactions, isLoading } = useTransactions()

  const formattedBals: { currency: string; balance: number }[] = useMemo(() => {
    return Object.entries(data.balances as IUserBalance).map(([currency, balance]) => ({ currency, balance }))
  }, [data.balances])

  return (
    <div>
      <header className="flex items-center mb-[74px]">
        <SimpleCoinIcon className="mr-3" />
        {data.firstName.length ? (
          <h2 className="">
            ¡Hola{' '}
            <span className="bg-gradient-to-r from-blue-2 to-blue-1 bg-clip-text text-transparent">
              {data.firstName}!
            </span>
          </h2>
        ) : (
          <Skeleton height={38} width={220} />
        )}
      </header>
      <section className="mb-[56px]">
        <h3 className="mb-6">Mis saldos</h3>
        {!Object.keys(data.balances).length ? (
          <div className="grid grid-cols-2 2xl:grid-cols-3 gap-[20px]">
            <Skeleton height={130} width={'100%'} />
            <Skeleton height={130} width={'100%'} />
            <Skeleton height={130} width={'100%'} />
          </div>
        ) : (
          <ul className="grid grid-cols-2 2xl:grid-cols-3 gap-[20px]">
            {formattedBals.map((item, index) => (
              <li key={`balance-card-${index}`}>
                <BalanceCard balance={item.balance} currencyKey={item.currency} />
              </li>
            ))}
          </ul>
        )}
      </section>
      <section>
        <h3 className="mb-6">Historial</h3>
        {isLoading ? (
          <div>
            <TransactionItemSkeleton/>
            <TransactionItemSkeleton/>
            <TransactionItemSkeleton/>
            <TransactionItemSkeleton/>
            <TransactionItemSkeleton/>
            <TransactionItemSkeleton/>
          </div>
        ) : (
          <ul>
            {transactions.map((item, index) => (
              <li key={`transaction-item-${index}`}>
                <TransactionItem transaction={item} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default AuthRequired(Home)
