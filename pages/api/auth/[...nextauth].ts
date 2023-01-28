import NextAuth, { NextAuthOptions } from "next-auth";
import InstagramProvider from "next-auth/providers/instagram";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prismadb";

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),

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
			if (email) {
				console.log(email);
			}
			console.log("No Email");
			console.log(user);
			return true;
		},
		async jwt({ token }) {
			return token;
		},
	},
};

export default NextAuth(authOptions);
