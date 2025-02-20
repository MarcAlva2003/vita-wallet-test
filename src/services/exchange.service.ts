import { API_ROUTE, BASE_URL } from './base-url'

import { APP_NAME } from './base-url'
import { IAuthParams } from '@/hooks/useUserToken.hook'

interface IExchangeData extends IAuthParams {
  currency_sent: string
  currency_received: string
  amount_sent: number
}

export const postExchange = async (params: IExchangeData) => {
  try {
    const { currency_received, currency_sent, amount_sent, ...rest } = params
    const body = { currency_received, currency_sent, amount_sent }
    const response = await fetch(`${BASE_URL}${API_ROUTE.EXCHANGE}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'access-token': rest.accessToken,
        'app-name': APP_NAME,
        uid: rest.uid,
        expiry: rest.expiry,
        client: rest.client
      },
      body: JSON.stringify({ ...body })
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
