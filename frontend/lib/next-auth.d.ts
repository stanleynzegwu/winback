import NextAuth from "next-auth"

declare module "next-auth"{

    interface Session{
        user: {
            id: number;
            email: string;
            username: string;
        };

        backendTokens: {
            accessToken: string;
            refreshToken: string;
        }
    }
}