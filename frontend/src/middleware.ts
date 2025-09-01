import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("oasisToken")?.value;
  const { pathname } = req.nextUrl;

  const isAuthPage = ["/signin", "/signup"].includes(pathname);
  const isPublicPage = ["/", "/signin", "/signup"].includes(pathname);

  const headers = new Headers(req.headers);
  headers.set("x-current-path", req.nextUrl.pathname);

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && !isPublicPage) {
    const url = new URL("/signin", req.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next({ headers });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)"],
};
