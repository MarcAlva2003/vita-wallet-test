import { createContext, useContext, useState } from 'react'

interface ISessionExpiredContext {
  sessionExpired: boolean
  onSessionExpired: () => void
}

const SessionExpiredContext = createContext<ISessionExpiredContext>({
  sessionExpired: false,
  onSessionExpired: () => {}
})

export const SessionExpiredContextProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [sessionExpired, setSessionExpired] = useState<boolean>(false)
  const onSessionExpired = () => {
    setSessionExpired(true)
  }

  return (
    <SessionExpiredContext.Provider value={{ onSessionExpired, sessionExpired }}>
      {children}
    </SessionExpiredContext.Provider>
  )
}

export const useSessionExpired = () => useContext(SessionExpiredContext)
