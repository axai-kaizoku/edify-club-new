import { NextAuthConfig, Session, User, type DefaultSession } from "next-auth"
import { DefaultJWT, JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"

export type AddressDetails = {
  _id: string
  userId: string
  orgId?: string | null
  deleted_at?: string | null
  city?: string
  address?: string
  isPrimary: boolean
  createdAt?: string
  updatedAt?: string
}

export type LoggedInUser = {
  _id: string
  name: string
  gender: string
  password: string
  email: string
  phone: string
  role: number
  designation?: string | null
  image: string
  addressDetails: AddressDetails[]
}

export type LoginResponse = {
  message: string
  token: string
  user: LoggedInUser[]
}

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      // id?: string
      token?: string
      user: LoginResponse["user"][0]
      // ...other properties
    } & DefaultSession["user"]
  }

  export interface AdapterUser {
    // id?: string
    token?: string
    user: LoginResponse["user"]
  }

  interface User {
    // id?: string
    token?: string
    user: LoginResponse["user"]
  }
}

declare module "next-auth/jwt" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface JWT extends DefaultJWT {
    // id?: string
    token?: string
    user: LoginResponse["user"][0]
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          "https://api.edify.club/edifyweb-backend/v1/auth/login",
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )

        const body = await res.json()

        // console.log("BODY ✅", body)

        if (res.status === 200) {
          return body
        }
        return null

        /**
         * Mock data
         */

        // const data = {
        //   "message": "Login successful",
        //   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2EyZjEyMzdlOTk0ZjEzMjY0Mzg2M2UiLCJyb2xlIjo1LCJpYXQiOjE3NDAzOTA2MDYsImV4cCI6MTc0Mjk4MjYwNn0.Eoaw8pH0mfevsO6v19gTAjEn9lRzY2sp4Zsu3ZE2wA4",
        //   "user": [
        //     {
        //       "_id": "67a2f1237e994f132643863e",
        //       "first_name": "Ved",
        //       "last_name": "Tyagi",
        //       "gender": "Male",
        //       "password": "$2b$10$a15xbHMU8TWRxaYvNjXKieeclTjCc9pl8QfFhmoRFLiu8.zBchvIK",
        //       "email": "vedtyagi1999@gmail.com",
        //       "phone": "7985476796",
        //       "role": 5,
        //       "designation": null,
        //       "image": "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1737105738855.jpg",
        //       "addressDetails": [
        //         {
        //           "_id": "67b6f5fc808272bd964e7b11",
        //           "userId": "67a2f1237e994f132643863e",
        //           "orgId": null,
        //           "deleted_at": null,
        //           "city": "Kanpur Nagar",
        //           "isPrimary": true,
        //           "__v": 0
        //         },
        //         {
        //           "_id": "67b6f65929e39bbd58dae865",
        //           "userId": "67a2f1237e994f132643863e",
        //           "address": "Chennai",
        //           "isPrimary": true,
        //           "deleted_at": null,
        //           "createdAt": "2025-02-20T09:31:05.099Z",
        //           "updatedAt": "2025-02-20T09:31:05.099Z",
        //           "__v": 0
        //         }
        //       ]
        //     }
        //   ]
        // }

        // if (credentials.email === "vedtyagi1999@gmail.com") {
        //   return data
        // }
        // return null
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }: { token: JWT; user: User }) => {
      // console.log(token, "jwt token")
      // console.log(user, "jwt user")
      if (user) {
        token.token = user.token
        token.user = user.user[0]
      }

      // console.log(token, "jwt res")

      return token
    },
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      // console.log(session, "session session")
      // console.log(token, "session token")
      if (token) {
        session.user.token = token.token
        // @ts-ignore
        session.user.user = token.user
      }
      return session
    },
  },
} satisfies NextAuthConfig
