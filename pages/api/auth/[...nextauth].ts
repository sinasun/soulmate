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
		}),
	],
	theme: {
		colorScheme: "light",
	},
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			delete account?.user_id;
			console.log("Sign In:", user, account, profile, email, credentials);
			return true;
		},
		async jwt({ token, account, profile }) {
			// Persist the OAuth access_token and or the user id to the token right after signin
			console.log("JWT", token, account, profile);
			return token;
		},
	},
	events: {
		async createUser(message) {
			console.log("Create User:", message);
		},
		async session(message) {
			console.log("Session:", message);
		},
	},
	debug: true,
};

export default NextAuth(authOptions);
