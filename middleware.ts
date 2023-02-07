// export { locales as middleware } from 'nextra/locales'

import { withLocales } from "nextra/locales";
import { NextResponse } from "next/server";

// export const config = {
//   matcher: ['/', '/index'],
// }

export const middleware = withLocales((request) => {
    const basicAuth = request.headers.get("authorization");
    const url = request.nextUrl;
    const contentRoute = /\.(jpe?g|svg|png|webmanifest|xml|ico|txt)$/.test(request.nextUrl.pathname);
    if (contentRoute) return NextResponse.next();
    if (basicAuth) {
        const authValue = basicAuth.split(" ")[1];
        const [user, pwd] = atob(authValue).split(":");
        if (user === "4dmin" && pwd === "testpwd123") {
            return NextResponse.next();
        } else {
            request.headers.delete("authorization");
            url.pathname = "/api/auth";
            return NextResponse.rewrite(url);
        }
    }
    url.pathname = "/api/auth";
    return NextResponse.rewrite(url);
});
