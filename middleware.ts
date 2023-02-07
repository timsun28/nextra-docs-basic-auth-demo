// export { locales as middleware } from 'nextra/locales'

import { withLocales } from "nextra/locales";
import { NextResponse } from "next/server";

// export const config = {
//   matcher: ['/', '/index'],
// }

export const middleware = withLocales((request) => {
    const basicAuth = request.headers.get("authorization");
    const url = request.nextUrl;
    if (basicAuth) {
        const authValue = basicAuth.split(" ")[1];
        const [user, pwd] = atob(authValue).split(":");
        if (user === "4dmin" && pwd === "testpwd123") {
            return NextResponse.next();
        }
    }
    url.pathname = "/api/auth";
    return NextResponse.rewrite(url);
});
