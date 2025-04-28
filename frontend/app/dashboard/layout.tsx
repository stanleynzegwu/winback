import LeftSidebar from "./components/LeftSidebar";
import Topbar from "./components/Topbar";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Backend_URL } from "@/lib/Constants";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import DashboardDataFetcher from "./components/DashboardDataFetcher";
// import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  ////////////////////
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
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email", placeholder: "johndoe@gmail.com" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          if (!credentials?.email || !credentials?.password) return null;
          const { email, password } = credentials;
          const res = await fetch(Backend_URL + "/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
          });

          if (res.status === 401) return null;
          const user = await res.json();
          return user;
        },
      }),
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

  ////////////////////
  const session = await getServerSession(authOptions);

  // Check if the user is authenticated
  if (!session) {
    // Redirect to the sign-in page if the user is not authenticated
    redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent("/dashboard")}`);
    //redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent(pathname)}`);
  }

  // Check if the user is an admin
  if (session.user.role !== "admin") {
    // If the user is not an admin, redirect to an access-denied page
    redirect("/access-denied");
  }

  return (
    <div className="flex flex-col min-h-screen md:flex-row bg-[#444291]">
      {/* Leftsidebar */}
      <Topbar />
      <LeftSidebar />
      {/* rightSidebar */}
      <div className="w-full max-h-screen min-h-screen overflow-x-hidden overflow-y-auto relative md:p-4 ">
        <DashboardDataFetcher />
        {children}
      </div>
    </div>
  );
}
