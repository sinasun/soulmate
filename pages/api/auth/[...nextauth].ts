import NextAuth, { NextAuthOptions } from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";
import InstagramProvider from "next-auth/providers/instagram";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prismadb";

let emailCookie = "";
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
	// Get a custom cookie value from the request

	emailCookie = req.cookies["email"]!;

	return await NextAuth(req, res, authOptions);
}

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
	},
	events: {
		async createUser(message) {
			// await prisma.user.updateMany({
			// 	where: { name: user.name! },
			// 	data: {
			// 		email: email,
			// 	},
			// });
			console.log("User:", message);
		},
	},
	debug: false,
};
