// import { Backend_URL } from "@/lib/Constants";
// import { NextAuthOptions } from "next-auth";
// import { JWT } from "next-auth/jwt";
// import NextAuth from "next-auth/next";
// import CredentialsProvider  from "next-auth/providers/credentials";


// async function refreshToken(token: JWT): Promise<JWT> {
//     const res = await fetch(Backend_URL + "/auth/refresh", {
//       method: "POST",
//       headers: {
//         authorization: `Refresh ${token.backendTokens.refreshToken}`,
//       },
//     });
//     console.log("refreshed");
  
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
//                 email: {
//                     label: "Email",
//                     type: "email", //try text if it doesnt work
//                     placeholder: "jonhdoe@gmail.com"
//                 },
//                 password: { label: "Password", type: "password" }
//             },
//             async authorize(credentials,req){
//                 if (!credentials?.email || !credentials?.password) return null;
//                 const { email, password } = credentials;
//                 const res = await fetch(Backend_URL + "/auth/login", {
//                     method: "POST",
//                     body: JSON.stringify({
//                         email,
//                         password,
//                     }),
//                     headers: {
//                         "Content-Type": "application/json",
//                     }
//                 })
//                 if (res.status == 401) {
//                     console.log(res.statusText);
          
//                     return null;
//                   }
//                   const user = await res.json();
//                   return user;
//             }
//         })
//     ],

//     callbacks: {
//         async jwt({ token, user }) {
//           if (user) return { ...token, ...user };
    
//           if (new Date().getTime() < token.backendTokens.expiresIn)
//             return token;
    
//           return await refreshToken(token);
//         },
    
//         async session({ token, session }) {
//           session.user = token.user;
//           session.backendTokens = token.backendTokens;
    
//           return session;
//         },
//     },
// }

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };


//////////////////////////////////////////////////////////////////////////

import { Backend_URL } from "@/lib/Constants";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshToken(token: JWT): Promise<JWT> {
    const res = await fetch(Backend_URL + "/auth/refresh", {
      method: "POST",
      headers: {
        authorization: `Refresh ${token.backendTokens.refreshToken}`,
      },
    });
  
    const response = await res.json();
  
    return {
      ...token,
      backendTokens: response,
    };
}

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name:"Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jonhdoe@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) return null;
                const { email, password } = credentials;
                const res = await fetch(Backend_URL + "/auth/login", {
                    method: "POST",
                    body: JSON.stringify({ email, password }),
                    headers: { "Content-Type": "application/json" }
                });
                
                if (res.status === 401) return null;
                const user = await res.json();
                return user;
            }
        })
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) return { ...token, ...user };
            if (new Date().getTime() < token.backendTokens.expiresIn) return token;
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
