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
    localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken)
    localStorage.setItem(USER_ID_KEY, data.uid)
    localStorage.setItem(EXPIRY_KEY, data.expiry)
    localStorage.setItem(CLIENT_KEY, data.client)
  }
  const setUid = (uid: string) => {
    localStorage.setItem(USER_ID_KEY, uid)
  }
  const getAccessToken = () => {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
  }
  const getExpiry = () => {
    return localStorage.getItem(EXPIRY_KEY)
  }
  const getClient = () => {
    return localStorage.getItem(CLIENT_KEY)
  }
  const getUserId = () => {
    return localStorage.getItem(USER_ID_KEY)
  }
  const removeTokens = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(USER_ID_KEY)
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
