import { API_ROUTE, APP_NAME, BASE_URL } from './base-url'

import { IAuthParams } from '@/hooks/useUserToken.hook'

export const getProfile = async (params: IAuthParams) => {  
  try {
    const response = await fetch(`${BASE_URL}${API_ROUTE.PROFILE}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'access-token': params.accessToken,
        'app-name': APP_NAME,
        uid: params.uid,
        expiry: params.expiry,
        client: params.client
      }
    })
    return {
      data: await response.json(),
      ok: response.ok,
      statusCode: response.status
    }
  } catch (err) {
    throw err
  }
}
