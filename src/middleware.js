import { NextResponse } from "next/server";

const middleware = (request) => {
  const isLoggedIn = request.cookies.get("isLoggedIn")?.value;
  if (isLoggedIn) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(
      new URL(`/login?returnUrl=${request.nextUrl.pathname}`, request.url)
    );
  }
};

export default middleware;

export const config = {
  matcher: ["/checkout", "/orders/:path*", "/profile"],
};
