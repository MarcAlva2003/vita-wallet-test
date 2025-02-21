import { createContext, useContext, useState } from 'react'

interface ISessionExpiredContext {
  sessionExpired: boolean
  onSessionExpired: () => void
  resetSessionExpired: () => void
}

const SessionExpiredContext = createContext<ISessionExpiredContext>({
  sessionExpired: false,
  onSessionExpired: () => {},
  resetSessionExpired: () => {}
})

export const SessionExpiredContextProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [sessionExpired, setSessionExpired] = useState<boolean>(false)
  const onSessionExpired = () => {
    setSessionExpired(true)
  }

  const resetSessionExpired = () => {
    setSessionExpired(false)
  }

  return (
    <SessionExpiredContext.Provider value={{ onSessionExpired, sessionExpired, resetSessionExpired }}>
      {children}
    </SessionExpiredContext.Provider>
  )
}

export const useSessionExpired = () => useContext(SessionExpiredContext)
