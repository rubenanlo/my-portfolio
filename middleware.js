// For more information on middleware, check this source:
// https://vercel.com/docs/concepts/functions/edge-middleware/middleware-api
// https://nextjs.org/docs/pages/building-your-application/routing/middleware

import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const middleware = async (req) => {
  // Token will exist if the user is logged in
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Allow requests if the token exists or it's an excluded path
  if (token) {
    return NextResponse.next();
  }

  // Redirect to login page if no token. Remember that
  // nextjs requires absolute urls
  return NextResponse.redirect(`${process.env.NEXTAUTH_URL}`);
};

export const config = {
  // This regex includes any path except /. We also needed to exclude favicon.ico, api,
  // _next/static and _next/image to allow the app to work properly. Otherwise,
  // the page never renders. Note that Nextjs, when rendering the app, it
  // renders the following pathnames by default: favicon.ico, _next/static,
  // _next/image and api. With the middleware above, and without excluding these
  // last pathnames, the middleware would redirect to /login, causing the app to
  // not work. Source: https://github.com/vercel/next.js/pull/42320/commits/a08905bae6a07f78832ec89c0fd75dc68ee919bf
  matcher: ["/admin/(.*)"],
};
