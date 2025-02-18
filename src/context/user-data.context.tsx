import { IUserBalance, IUserData, IUserDataContext } from '@/interfaces/user-data.interfaces'
import { createContext, useContext, useEffect, useState } from 'react'

const UserDataContext = createContext<IUserDataContext>({
  data: {
    uid: '',
    balances: {},
    firstName: '',
    lastName: ''
  },

  setUid: () => {},
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
  const [uid, setUid] = useState<string>('')
  const [balances, setBalances] = useState<IUserBalance>({})
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')

  const setUserData = (data: IUserData) => {
    console.log({data});
    
    setUid(data.uid)
    setBalances(data.balances)
    setFirstName(data.firstName)
    setLastName(data.lastName)
  }

  useEffect(() => {
console.log({balances});

  }, [balances])
  
  return (
    <UserDataContext.Provider
      value={{
        data: {
          uid,
          balances,
          firstName,
          lastName
        },
        setUid,
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
