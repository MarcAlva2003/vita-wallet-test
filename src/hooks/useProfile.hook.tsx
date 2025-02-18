import { getProfile } from '@/services/profile.service'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useUserToken } from './useUserToken.hook'

export const useProfile = () => {
  const { getAccessToken, getUserId, getClient, getExpiry, logout } = useUserToken()

  const {
    data: profileData,
    isLoading,
    isFetching
  } = useQuery({
    // Correct usage of useQuery
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
      console.log('HERE 2')
      logout()
    }
    console.log({ profileData })
  }, [profileData, isFetching, isLoading])

  return {}
}
