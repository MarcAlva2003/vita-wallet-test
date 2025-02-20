'use client'

import { APP_ROUTES } from '@/constants/app-routes.constant'
import { AuthRequired } from '@/HOC/isAuthenticated.hoc'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

function Home() {
  const { push } = useRouter()
  useEffect(() => {
    push(APP_ROUTES.HOME)
  }, [])

  return <></>
}

export default AuthRequired(Home)
