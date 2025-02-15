import { useFormatText } from '@/hooks/useFormatText.hook'

interface IBalanceCard {
  currencyLabel: string
  currencyIcon: React.ReactNode
  balanceAmount: number
}

export const BalanceCard: React.FC<IBalanceCard> = (props) => {
  const { balanceAmount, currencyIcon, currencyLabel } = props

  const { formatBalanceNumber } = useFormatText()

  return (
    <div className="p-6 rounded-[6px] border border-solid border-gray-2 bg-gray-3 w-full">
      <div className="flex justify-between mb-[25px] items-center">
        <p className="text-base text-black">{currencyLabel}</p>
        {currencyIcon}
      </div>
      <div>
        <p className="text-2xl font-semibold text-black">$ {formatBalanceNumber(balanceAmount)}</p>
      </div>
    </div>
  )
}
