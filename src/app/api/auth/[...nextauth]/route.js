import CredentialsProvider from 'next-auth/providers/credentials'
import { base_backend_url } from '../../../../../constants'
import NextAuth from 'next-auth'

export const authOptions = {
    providers: [
        CredentialsProvider({
            id: 'userLogin',
            name: 'User Login',
            credentials: {
                'aadhaar_number': { name: 'Aadhaar Number', type: 'text' },
                'password': { name: 'Password', type: 'password' },
                'user_type': { name: 'User Type', type: 'text' }
            },
            authorize: async (credentials, req) => {
                if (!credentials) return null
                const { aadhaar_number , password , user_type} = credentials

                const res = await fetch(`${base_backend_url}/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        aadhaar_number,
                        password,
                        user_type
                    })
                })

                const data = await res.json()
                if (res.ok && data.access_token && data.token_type) {
                    return data
                }
                return null;
            }
        })
    ],
    callbacks:{
        async jwt({token , user}){
            if(user){
                token.access_token = user.access_token,
                token.token_type = user.token_type
            }
            return token;
        },
        async session({session,token}){
            session.access_token = token.access_token,
            session.token_type = token.token_type
            return session;
        }
    },
    session:{
        strategy: 'jwt',
    },
    secret: `${process.env.NEXTAUTH_SECRET}`
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }