'use client'

import { Geist, Geist_Mono, Open_Sans } from 'next/font/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { UserDataContextProvider } from '@/context/user-data.context'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

const openSans = Open_Sans({ subsets: ['latin'] })

const queryClient = new QueryClient()
export default function AppLayoutContainer({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <body className={`${geistSans.variable} ${geistMono.variable} ${openSans.className} antialiased`}>
      <QueryClientProvider client={queryClient}>
        <UserDataContextProvider>{children}</UserDataContextProvider>
      </QueryClientProvider>
    </body>
  )
}
