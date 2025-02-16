import { Sidebar } from "@/components/sidebar/sidebar.component";
import { navItems } from "@/constants/nav-items.constant";

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <div className="flex">
      <Sidebar navItems={navItems}/>
      <div className="w-full p-[53px_120px_60px_70px]">
        {children}
      </div>
    </div>
  )
}