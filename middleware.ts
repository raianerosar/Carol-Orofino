// middleware.ts
import createMiddleware from 'next-intl/middleware'
import { routing } from './src/lib/i18n'

export default createMiddleware(routing)

export const config = {
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
}
