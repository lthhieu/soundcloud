import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth"
import { sendRequest } from "@/utils/api"
import { JWT } from "next-auth/jwt"
export const authOptions: AuthOptions = {
    secret: process.env.NO_SECRET,
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
                const res = await sendRequest<IBackendResponse<JWT>>({
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`,
                    method: 'POST',
                    body: {
                        username: credentials?.username,
                        password: credentials?.password
                    },
                })

                if (res?.data) {
                    // Any object returned will be saved in `user` property of the JWT
                    return res.data as any
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    throw new Error(res.message)

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        // ...add more providers here
    ],
    callbacks: {
        async jwt({ token, user, account, trigger }) {
            if (trigger === 'signIn' && account?.provider !== 'credentials') {
                const res = await sendRequest<IBackendResponse<JWT>>({
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/social-media`,
                    method: 'POST',
                    body: {
                        type: account?.provider.toUpperCase(),
                        username: user.email
                    },
                })
                if (res.data) {
                    token = res.data
                    token.picture = user.image
                    token.name = user.name
                }
            }
            if (trigger === 'signIn' && account?.provider === 'credentials') {
                //local data
                //@ts-ignore
                token = user
            }
            return token
        },
        session({ session, token, user }) {
            if (token) {
                session.access_token = token.access_token
                session.refresh_token = token.refresh_token
                session.user = token.user
                session.user.name = token.name
                session.user.image = token.picture
            }
            return session
        }
    },
    // pages: {
    //     signIn: '/auth/signin'
    // }
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }