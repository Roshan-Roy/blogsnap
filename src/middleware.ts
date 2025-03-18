import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { getToken } from "next-auth/jwt";
import { feedbackRoute } from "./routes";

import {
    apiAuthPrefix,
    apiRoutePrefix,
    publicRoutes
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
    const { nextUrl } = req;
    const loggedIn = !!req.auth;
    const secret = process.env.AUTH_SECRET;

    // Try getting the token normally
    let token = await getToken({ req, secret });

    // Fallback: Get token from Authorization header
    if (!token) {
        const authHeader = req.headers.get("Authorization");
        if (authHeader?.startsWith("Bearer ")) {
            const jwt = authHeader.split(" ")[1];
            try {
                const decodedToken = JSON.parse(
                    Buffer.from(jwt.split(".")[1], "base64").toString()
                );
                token = decodedToken;
            } catch (error) {
                console.error("Error decoding JWT in middleware:", error);
            }
        }
    }

    console.log("Token Data in Middleware:", token); // Debugging

    const isAdmin = token?.isAdmin || false;
    const isApiAuthRoutes = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isApiRoute = nextUrl.pathname.startsWith(apiRoutePrefix);

    if (isApiAuthRoutes) return;

    if (!loggedIn && !isPublicRoute) {
        if (isApiRoute) {
            return Response.json({ message: "unauthorized" }, { status: 401 });
        }
        return Response.redirect(new URL("/", nextUrl));
    }

    if (nextUrl.pathname.startsWith(feedbackRoute) && !isAdmin) {
        return Response.json({
            admin: isAdmin,
            x: nextUrl.pathname.startsWith(feedbackRoute),
        });
    }
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
