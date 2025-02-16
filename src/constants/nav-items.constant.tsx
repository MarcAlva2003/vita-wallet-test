import { APP_ROUTES } from "./app-routes.constant"

export interface INavItem {
  label: string,
  path: string
}

export const navItems: INavItem[] = [
  {
    label: 'Inicio',
    path: APP_ROUTES.HOME
  },
  {
    label: 'Transferir',
    path: APP_ROUTES.TRANSFER
  },
  {
    label: 'Recargar',
    path: APP_ROUTES.RECARGE
  },
  {
    label: 'Intercambiar',
    path: APP_ROUTES.EXCHANGE
  },
  {
    label: 'Perfil',
    path: APP_ROUTES.PROFILE
  },
  {
    label: 'Ayuda',
    path: APP_ROUTES.HELP
  },
]