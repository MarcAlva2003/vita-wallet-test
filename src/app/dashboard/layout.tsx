'use client'

import { ModalContainer } from '@/components/UI/modal/modal.component'
import { Sidebar } from '@/components/sidebar/sidebar.component'
import { navItems } from '@/constants/nav-items.constant'
import { useProfile } from '@/hooks/useProfile.hook'
import { useSessionExpired } from '@/context/session-expired.context'
import { useUserToken } from '@/hooks/useUserToken.hook'

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const {} = useProfile()
  const { logout } = useUserToken()
  const { sessionExpired } = useSessionExpired()

  return (
    <div className="flex">
      <Sidebar navItems={navItems} />
      <div className='w-full max-w-[1200px]'>
      <div className="w-full mx-[auto] px-[50px] xl:px-[70px] pt-[80px] pb-[70px] max-w-[1100px]">
        {children}
      </div>
      </div>
      <ModalContainer isOpen={sessionExpired} onClose={logout}>
        <div className="min-h-5"></div>
      </ModalContainer>
    </div>
  )
}
