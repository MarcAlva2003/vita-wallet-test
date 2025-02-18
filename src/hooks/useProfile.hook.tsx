import { getProfile } from '@/services/profile.service'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useUserDataContext } from '@/context/user-data.context'
import { useUserToken } from './useUserToken.hook'

export const useProfile = () => {
  const { getAccessToken, getUserId, getClient, getExpiry, logout } = useUserToken()
  const { setUserData } = useUserDataContext()
  const {
    data: profileData,
    isLoading,
    isFetching
  } = useQuery({
    queryKey: ['getProfile'],
    queryFn: () =>
      getProfile({
        accessToken: getAccessToken() as string,
        uid: getUserId() as string,
        client: getClient() as string,
        expiry: getExpiry() as string
      }),
    retry: false
  })

  useEffect(() => {
    if (profileData?.statusCode === 401) {
      logout()
    } else {
      if (profileData?.data) {
        setUserData({
          balances: profileData?.data.data.attributes.balances,
          firstName: profileData?.data.data.attributes.first_name,
          lastName: profileData?.data.data.attributes.last_name,
          email: profileData?.data.data.attributes.email,
        })
      }
    }
  }, [profileData, isFetching, isLoading])

  return {}
}
