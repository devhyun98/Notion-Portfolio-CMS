'use client'

import { ThemeProvider } from '@/components/common/theme-provider'
import { Toaster } from 'sonner'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="theme">
      {children}
      <Toaster />
    </ThemeProvider>
  )
}
