'use client'

import { ModalContainer } from '@/components/UI/modal/modal.component'
import { Sidebar } from '@/components/sidebar/sidebar.component'
import { navItems } from '@/constants/nav-items.constant'
import { useProfile } from '@/hooks/useProfile.hook'
import { useSessionExpired } from '@/context/session-expired.context'
import { useState } from 'react'
import { useUserToken } from '@/hooks/useUserToken.hook'

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const {} = useProfile()
  const [mobileModalOpen, setMobileModal] = useState<boolean>(false)
  const { logout } = useUserToken()
  const { sessionExpired } = useSessionExpired()

  return (
    <div className="flex">
      <div className={`${mobileModalOpen ? '' : 'left-[-300px]'} z-[100] fixed lg:sticky`}>
        <Sidebar isOpen={mobileModalOpen} onOpenChange={setMobileModal} navItems={navItems} />
      </div>
      <div className="w-full max-w-[1200px]">
        <div className="w-full mx-[auto] px-[12px] md:px-[50px] xl:px-[70px] pt-[80px] pb-[70px] max-w-[1100px]">{children}</div>
      </div>
      <ModalContainer isOpen={sessionExpired} onClose={logout}>
        <div className="min-h-5 px-5 py-4">
          <h2 className="text-center text-blue-2 mb-4">Su sesión ha expirado</h2>
          <p>Por favor, vuelva a iniciar sesión nuevamente</p>
        </div>
      </ModalContainer>
    </div>
  )
}
