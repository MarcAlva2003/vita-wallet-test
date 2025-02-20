'use client'

import { ExchangeDataContextProvider } from "@/context/exchange-data.context";

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <div>
      <ExchangeDataContextProvider>
      {children}
      </ExchangeDataContextProvider>
    </div>
  )
}