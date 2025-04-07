// import { Backend_URL } from "@/lib/Constants";
// import { NextAuthOptions } from "next-auth";
// import { JWT } from "next-auth/jwt";
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// async function refreshToken(token: JWT): Promise<JWT> {
//     const res = await fetch(Backend_URL + "/auth/refresh", {
//       method: "POST",
//       headers: {
//         authorization: `Refresh ${token.backendTokens.refreshToken}`,
//       },
//     });
  
//     const response = await res.json();
  
//     return {
//       ...token,
//       backendTokens: response,
//     };
// }

// export const authOptions: NextAuthOptions = {
//     providers: [
//         CredentialsProvider({
//             name:"Credentials",
//             credentials: {
//                 email: { label: "Email", type: "email", placeholder: "jonhdoe@gmail.com" },
//                 password: { label: "Password", type: "password" }
//             },
//             async authorize(credentials, req) {
//                 if (!credentials?.email || !credentials?.password) return null;
//                 const { email, password } = credentials;
//                 const res = await fetch(Backend_URL + "/auth/login", {
//                     method: "POST",
//                     body: JSON.stringify({ email, password }),
//                     headers: { "Content-Type": "application/json" }
//                 });
                
//                 if (res.status === 401) return null;
//                 const user = await res.json();
//                 return user;
//             }
//         })
//     ],

//     callbacks: {
//         async jwt({ token, user }) {
//             if (user) return { ...token, ...user };
//             if (new Date().getTime() < token.backendTokens.expiresIn) return token;
//             return await refreshToken(token);
//         },

//         async session({ session, token }) {
//             session.user = token.user;
//             session.backendTokens = token.backendTokens;
//             return session;
//         },
//     },
//     secret: process.env.NEXTAUTH_SECRET,
// };


// lib/authOptions.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Backend_URL } from "@/lib/Constants";
import { JWT } from "next-auth/jwt";

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(`${Backend_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      Authorization: `Refresh ${token.backendTokens.refreshToken}`,
    },
  });

  const data = await res.json();

  return {
    ...token,
    backendTokens: data,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const res = await fetch(`${Backend_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        if (!res.ok) return null;
        const user = await res.json();
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };
      if (Date.now() < token.backendTokens?.expiresIn) return token;
      return await refreshToken(token);
    },
    async session({ session, token }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

