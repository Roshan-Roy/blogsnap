import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { getToken } from "next-auth/jwt"
import { feedbackRoute } from "./routes"

import {
    apiAuthPrefix,
    apiRoutePrefix,
    publicRoutes
} from "./routes"

const { auth } = NextAuth(authConfig)

export default auth(async (req) => {
    const { nextUrl } = req
    const loggedIn = !!req.auth
    const secret = process.env.AUTH_SECRET;
    const token = await getToken({ req, secret });

    const isAdmin = token?.isAdmin
    const isApiAuthRoutes = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isApiRoute = nextUrl.pathname.startsWith(apiRoutePrefix)

    if (isApiAuthRoutes) return

    if (!loggedIn && !isPublicRoute) {
        if (isApiRoute) {
            return Response.json({ message: "unauthorized" }, { status: 401 })
        }
        return Response.redirect(new URL("/", nextUrl))
    }
    if (nextUrl.pathname.startsWith(feedbackRoute) && !isAdmin) {
        return Response.redirect(new URL("/", nextUrl))
    }
})

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}