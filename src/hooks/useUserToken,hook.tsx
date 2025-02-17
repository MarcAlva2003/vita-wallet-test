const ACCESS_TOKE_KEY = 'access-token'

export const useUserToken = () => {
  const setToken = (token: string) => {
    localStorage.setItem(ACCESS_TOKE_KEY, token)
  }
  const getAccessToken = () => {
    return localStorage.getItem(ACCESS_TOKE_KEY)
  }
  const removeToken = () => {
    localStorage.removeItem(ACCESS_TOKE_KEY)
  }
  return {
    setToken,
    getAccessToken,
    removeToken
  }
}
