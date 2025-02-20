import { APP_ROUTES } from '@/constants/app-routes.constant'
import { useRouter } from 'next/navigation'

export const ACCESS_TOKEN_KEY = 'access-token'
export const USER_ID_KEY = 'uid'
export const EXPIRY_KEY = 'expiry'
export const CLIENT_KEY = 'client'

export interface IAuthParams {
  accessToken: string
  uid: string
  expiry: string
  client: string
}

export const useUserToken = () => {
  const router = useRouter()

  const setTokens = (data: IAuthParams) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken)
      localStorage.setItem(USER_ID_KEY, data.uid)
      localStorage.setItem(EXPIRY_KEY, data.expiry)
      localStorage.setItem(CLIENT_KEY, data.client)
    }
  }
  const setUid = (uid: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_ID_KEY, uid)
    }
  }
  const getAccessToken = () => {
    return typeof window !== 'undefined' ? localStorage.getItem(ACCESS_TOKEN_KEY) : ''
  }
  const getExpiry = () => {
    return typeof window !== 'undefined' ? localStorage.getItem(EXPIRY_KEY) : ''
  }
  const getClient = () => {
    return typeof window !== 'undefined' ? localStorage.getItem(CLIENT_KEY) : ''
  }
  const getUserId = () => {
    return typeof window !== 'undefined' ? localStorage.getItem(USER_ID_KEY) : ''
  }
  const removeTokens = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ACCESS_TOKEN_KEY)
      localStorage.removeItem(USER_ID_KEY)
    }
  }

  const logout = () => {
    removeTokens()
    router.push(APP_ROUTES.LOGIN)
  }

  return {
    setTokens,
    getAccessToken,
    removeTokens,
    setUid,
    getUserId,
    getExpiry,
    getClient,
    logout
  }
}
