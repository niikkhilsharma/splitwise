import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { auth } from "@/auth";

export default async function middleware(request: NextRequest) {
  const session = await auth();
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-next-href", request.nextUrl.href);

  console.log(session);
  if (!session && request.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher:
    "/((?!api/auth|auth|images|_next/static|_next/image|favicon.ico|^/$).+)",
};
