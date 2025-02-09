
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"
import bcrypt from "bcrypt"
declare module "next-auth" {
    interface User {
      role: string
    }
    interface Session {
      user: {
        role: string
        name?: string | null
        email?: string | null
        image?: string | null
      }
    }
  }
  
  export const authOptions:NextAuthOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            return null
          }
  
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          })
  
          if (!user) {
            return null
          }
  
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
  
          if (!isPasswordValid) {
            return null
          }
  
          return {
            id: String(user.id),
            email: user.email,
            role: user.role,
          }
        },
      }),
    ],
    callbacks: {
      jwt: async ({ token, user }:any) => {
        if (user) {
          token.role = user.role
        }
        return token
      },
      session: async ({ session, token }:any) => {
        if (session?.user) {
          session.user.role = token.role as string
        }
        return session
      },
    },
    pages: {
      signIn: "/login",
    },
  }