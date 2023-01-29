import NextAuth, { NextAuthOptions } from "next-auth";
import InstagramProvider from "next-auth/providers/instagram";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prismadb";

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	secret: process.env.SECRET,
	providers: [
		InstagramProvider({
			clientId: process.env.INSTAGRAM_CLIENT_ID,
			clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
			checks: [],
		}),
	],
	theme: {
		colorScheme: "light",
	},
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			delete account?.user_id;
			return true;
		},
		async redirect({ url, baseUrl }) {
			console.log("Url:", url);
			console.log("baseUrl:", baseUrl);
			return baseUrl;
		},
		async session({ session, token, user }) {
			console.log("Session", session, token);
			return session;
		},
	},
};

export default NextAuth(authOptions);
