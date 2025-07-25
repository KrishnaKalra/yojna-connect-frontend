import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

const protectedRoutes = ['/schemes', '/scheme-details', '/profile', '/edit-profile'] 
export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  const isProtected = protectedRoutes.some((path) => req.nextUrl.pathname.startsWith(path))

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/schemes/:path*', '/scheme-details/:scheme_id*', '/profile', '/edit-profile'],
}
