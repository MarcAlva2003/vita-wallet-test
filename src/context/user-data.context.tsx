import { IUserBalance, IUserData, IUserDataContext } from '@/interfaces/user-data.interfaces'
import { createContext, useContext, useEffect, useState } from 'react'

const UserDataContext = createContext<IUserDataContext>({
  data: {
    balances: {},
    firstName: '',
    lastName: '',
    email: ''
  },

  setBalances: () => {},
  setFirstName: () => {},
  setLastName: () => {},
  setUserData: () => {}
})

export const UserDataContextProvider = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  const [balances, setBalances] = useState<IUserBalance>({})
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const setUserData = (data: IUserData) => {
    setBalances(data.balances)
    setFirstName(data.firstName)
    setLastName(data.lastName)
    setEmail(data.email)
  }

  useEffect(() => {}, [balances])

  return (
    <UserDataContext.Provider
      value={{
        data: {
          balances,
          firstName,
          lastName,
          email
        },
        setBalances,
        setFirstName,
        setLastName,
        setUserData
      }}
    >
      {children}
    </UserDataContext.Provider>
  )
}

export const useUserDataContext = () => useContext(UserDataContext)
