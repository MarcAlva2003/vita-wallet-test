import { API_ROUTE, APP_NAME, BASE_URL } from './base-url'

interface IGetProfileParams {
  access_token: string
  uid: string
  expiry: string
  client: string  
}

export const getProfile = async (params: IGetProfileParams) => {
  try {
    const response = await fetch(`${BASE_URL}${API_ROUTE.LOGIN}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'access-token': params.access_token,
        'app-name': APP_NAME,
        uid: params.uid,
        expiry: params.expiry,
        client: params.client
      }
    })
    const data = await response.json()
    console.log({data});
    return data;
  }catch (err) {
    console.log({err});
    
  }
}
