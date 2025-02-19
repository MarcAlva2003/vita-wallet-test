'use client'

import { Sidebar } from "@/components/sidebar/sidebar.component";
import { navItems } from "@/constants/nav-items.constant";
import { useProfile } from "@/hooks/useProfile.hook";

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  const {} = useProfile()
  return (
    <div className="flex">
      <Sidebar navItems={navItems}/>
      <div className="w-full p-[53px_120px_60px_70px]">
        {children}
      </div>
    </div>
  )
}