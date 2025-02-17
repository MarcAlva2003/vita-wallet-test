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
    console.log(response.headers.get('access-token'))
    if (data.data) {
      return {
        ok: true,
        data: data.data,
        access_token: response.headers.get('access-token')
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
