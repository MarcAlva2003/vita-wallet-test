import { useEffect, useState } from 'react'

import { getProfile } from '@/services/profile.service'
import { useQuery } from '@tanstack/react-query'
import { useSessionExpired } from '@/context/session-expired.context'
import { useUserDataContext } from '@/context/user-data.context'
import { useUserToken } from './useUserToken.hook'

export const useProfile = () => {
  const { getAccessToken, getUserId, getClient, getExpiry } = useUserToken()
  const [statusCode, setStatusCode] = useState<number>(0)
  const { onSessionExpired } = useSessionExpired()
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
    retry: false,
    enabled: !!getAccessToken() && statusCode !== 401
  })

  useEffect(() => {
    if (isFetching || isLoading) return;
    console.log(profileData);
    setStatusCode(profileData?.statusCode ?? 0)
    if (profileData?.statusCode === 401 && statusCode !== 401) {
      onSessionExpired()
      console.log('HERE 2');
    } else {
      if (profileData?.data) {
        setUserData({
          balances: profileData?.data.data.attributes.balances,
          firstName: profileData?.data.data.attributes.first_name,
          lastName: profileData?.data.data.attributes.last_name,
          email: profileData?.data.data.attributes.email
        })
      }
    }
  }, [profileData, isFetching, isLoading, onSessionExpired, setUserData])

  return {}
}
