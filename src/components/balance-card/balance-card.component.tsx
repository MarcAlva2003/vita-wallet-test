import { useBalFormat } from '@/hooks/useBalFormat.hook'
import { useFormatText } from '@/hooks/useFormatText.hook'

interface IBalanceCard {
  currencyKey: string
  balance: number
}

export const BalanceCard: React.FC<IBalanceCard> = (props) => {
  const { currencyKey, balance } = props

  const { formatBalanceNumber } = useFormatText()
  const { getCurrencyIcon, getCurrencyLabel } = useBalFormat()

  return (
    <div className="p-6 rounded-[6px] border border-solid border-gray-2 bg-gray-3 w-full">
      <div className="flex justify-between mb-[25px] items-center">
        <p className="text-base text-black">{getCurrencyLabel(currencyKey)}</p>
        {getCurrencyIcon(currencyKey)}
      </div>
      <div>
        <p className="text-2xl font-semibold text-black">$ {formatBalanceNumber(balance)}</p>
      </div>
    </div>
  )
}
