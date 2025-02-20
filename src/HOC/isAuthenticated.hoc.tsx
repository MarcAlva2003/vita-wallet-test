import type { NextComponentType } from 'next'
import { useEffect } from 'react'
import { useUserToken } from '@/hooks/useUserToken.hook'

export const AuthRequired = (WrappedComponent: NextComponentType) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const AuthRequiredComponent = (props: any) => {
    const { getAccessToken, logout } = useUserToken()

    useEffect(() => {
      if (!getAccessToken()) {
        logout()
      }
    })

    return <WrappedComponent {...props} />
  }

  AuthRequiredComponent.displayName = `AuthRequired(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`

  return AuthRequiredComponent
}
