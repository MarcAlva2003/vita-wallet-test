import { APP_ROUTES } from '@/constants/app-routes.constant'
import type { NextComponentType } from 'next'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUserToken } from '@/hooks/useUserToken,hook'

export const AuthRequired = (WrappedComponent: NextComponentType) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const AuthRequiredComponent = (props: any) => {
    const { getAccessToken, removeToken } = useUserToken()
    const { push } = useRouter()

    const logout = () => {
      removeToken()
    }

    useEffect(() => {
      if (!getAccessToken()) {
        console.log('HEREEE');
        
        logout()
        push(APP_ROUTES.LOGIN)
      }
    }, [])

    return <WrappedComponent {...props} />
  }

  AuthRequiredComponent.displayName = `AuthRequired(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`

  return AuthRequiredComponent
}
