//pages any users can access

export const publicRoutes = [
    "/"
]

//routes that start with this prefix are used for api authentication purposes

export const apiAuthPrefix = "/api/auth"

//protect api calls from unauthorized users

export const apiRoutePrefix = "/api"

//feedback page

export const feedbackRoute = "/feedbacks"

//the default redirect path after logging in

export const DEFAULT_LOGIN_REDIRECT = "/all/allblogs"
