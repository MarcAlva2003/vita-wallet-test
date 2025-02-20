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
  const {sessionExpired} = useSessionExpired()
  
  return (
    <div className="flex">
      <Sidebar navItems={navItems} />
      <div className="w-full p-[53px_120px_60px_70px]">{children}</div>
      <ModalContainer isOpen={sessionExpired} onClose={logout}>
        <div className='min-h-5'></div>
      </ModalContainer>
    </div>
  )
}
