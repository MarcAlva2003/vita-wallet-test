import { ITransaction, TransactionCategories } from '@/interfaces/transactions.interfaces'

import { useUserDataContext } from '@/context/user-data.context'

interface ITransactionItem {
  transaction: ITransaction
}

export const TransactionItem: React.FC<ITransactionItem> = (props) => {
  const { transaction } = props
  const { data } = useUserDataContext()
  const { email } = data

  const transactionTitles = {
    exchange: 'Intercambiaste',
    transfer: {
      recived: 'Recibiste',
      sent: 'Transferiste'
    },
    recharge: 'Recargaste'
  }

  const getTransactionTitle = () => {
    switch (transaction.attributes.category) {
      case TransactionCategories.exchange:
        return transactionTitles.exchange
      case TransactionCategories.recharge:
        return transactionTitles.recharge
      case TransactionCategories.transfer:
        return ''
    }
  }

  const getFormattedBalAmount = (): { color: string; text: string } => {
    
    // [TEMPORAL CONDITIONAL]
    if (email !== transaction.attributes.recipient.email) {
      return {
        text: `- $ ${transaction.attributes.total} ${transaction.attributes.currency_iso_code}`,
        color: 'text-red'
      }
    }
    return {
      text: `+ $ ${transaction.attributes.total} ${transaction.attributes.currency_iso_code}`,
      color: 'text-blue-2'
    }

    
    // [DO NOT DELETE]: FUNCTION TO SEPARATE TRANSACTIONS, EXCHANGES AND RECHARGES.
    if (transaction.attributes.category !== TransactionCategories.exchange) {
      if (
        transaction.attributes.category === TransactionCategories.transfer &&
        email !== transaction.attributes.recipient.email
      ) {
        return {
          text: `- $ ${transaction.attributes.total} ${transaction.attributes.currency_iso_code}`,
          color: 'text-red'
        }
      }
      return {
        text: `+ $ ${transaction.attributes.total} ${transaction.attributes.currency_iso_code}`,
        color: 'text-blue-2'
      }
    }
    return {
      text: `$ ${transaction.attributes.total} ${transaction.attributes.currency_iso_code}`,
      color: 'text-black'
    }
  }

  return (
    <div className="w-full flex items-center justify-between py-5 border-b border-solid border-gray-1">
      <div>
        <p>{getTransactionTitle()}</p>
      </div>
      <div>
        <p className={`font-semibold ${getFormattedBalAmount().color}`}>{getFormattedBalAmount().text}</p>
      </div>
    </div>
  )
}
