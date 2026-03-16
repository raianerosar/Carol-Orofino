// src/components/NavbarWrapper.tsx
'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'

export default function NavbarWrapper() {
  const pathname = usePathname()
  // Transparent on home page (e.g., /pt, /en, /es)
  const isHome = /^\/[a-z]{2}\/?$/.test(pathname)
  return <Navbar transparent={isHome} />
}
