export { default } from "next-auth/middleware"

export const config = {
    // register、login、およびapiディレクトリのルート以外のルートが確実に保護
    matcher: [ "/((?!register|api|login).*)" ]

}