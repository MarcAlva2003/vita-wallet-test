'use client'

import { DollarBgIcon } from '@/assets/icons'
import { INavItem } from '@/constants/nav-items.constant'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUserToken } from '@/hooks/useUserToken.hook'

interface ISidebar {
  navItems: INavItem[]
}

export const Sidebar: React.FC<ISidebar> = (props) => {
  const { navItems } = props
  const { logout } = useUserToken()
  const pathname = usePathname()

  const isCurrentPath = (path: string) => {
    return pathname.includes(path)
  }

  return (
    <div className="w-[370px] min-w-[370px] max-w-[370px] h-screen sticky top-0  p-[12vh_92px_64px_0] flex flex-col justify-between relative">
      <nav>
        <ul>
          {navItems.map((item: INavItem, index: number) => (
            <li key={`nav-item-${index}`} className="mb-2 last:mb-0">
              <Link href={item.path}>
                <div
                  className={`pl-[80px] w-full py-4 rounded-[0_32px_32px_0] ${
                    isCurrentPath(item.path) ? 'bg-blue-2' : ''
                  }`}
                >
                  <h3 className={`text-white ${isCurrentPath(item.path) ? 'font-semibold' : ''}`}>{item.label}</h3>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <button className="w-fit p-4 ml-[64px]" onClick={logout}>
        <h3 className="text-white ">Cerrar Sesion</h3>
      </button>
      <div className="absolute w-full h-screen top-0 left-0 z-[-1] bg-blue-1">
        <DollarBgIcon className="absolute w-full bottom-0" />
      </div>
    </div>
  )
}
