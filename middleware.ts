import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_TOKEN } from "./@shared/constants"

export function middleware(req: NextRequest){
    const { pathname } = req.nextUrl
    const verifyCookie = req.cookies.get(`${AUTH_TOKEN}`)

    if(pathname.startsWith("/_next")) return NextResponse.next()

    if (!verifyCookie) {
        if (!req.nextUrl.pathname.startsWith("/auth")) {
          req.nextUrl.pathname = "/auth";
          return NextResponse.redirect(req.nextUrl);
        }
      } 
      else if (verifyCookie && req.nextUrl.pathname.startsWith("/auth")) {
        req.nextUrl.pathname = "/";
        return NextResponse.redirect(req.nextUrl);
      }
}

export const config = {
    matcher: ["/", "/auth",  "/books", "/upload" ],
  };