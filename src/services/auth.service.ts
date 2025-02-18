import { ACCESS_TOKEN_KEY, CLIENT_KEY, EXPIRY_KEY, USER_ID_KEY } from '@/hooks/useUserToken.hook';
import { API_ROUTE, APP_NAME, BASE_URL } from './base-url'

export const login = async (params: { email: string; password: string }) => {
  try {
    const response = await fetch(`${BASE_URL}${API_ROUTE.LOGIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'app-name': APP_NAME
      },
      body: JSON.stringify({ ...params, dev_mode: 'true' })
    })
    const data = await response.json()
    if (data.data) {
      return {
        ok: true,
        data: data.data,
        accessToken: response.headers.get(ACCESS_TOKEN_KEY),
        uid: response.headers.get(USER_ID_KEY),
        expiry: response.headers.get(EXPIRY_KEY),
        client: response.headers.get(CLIENT_KEY),
      }
    }

    return {
      ok: false,
      message: data.message
    }
  } catch (err) {
    console.error(err)
  }
}
