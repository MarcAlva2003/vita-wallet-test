'use client'

import { APP_ROUTES } from '@/constants/app-routes.constant'
import { AuthRequired } from '@/HOC/isAuthenticated.hoc'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUserToken } from '@/hooks/useUserToken.hook'

function Home() {
  const { push } = useRouter()
  const { getAccessToken } = useUserToken()
  useEffect(() => {
    if (!getAccessToken()) {
      push(APP_ROUTES.LOGIN)
    }
    push(APP_ROUTES.HOME)
  })

  return <></>
}

export default AuthRequired(Home)
