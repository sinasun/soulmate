import NextAuth, { NextAuthOptions } from "next-auth";
import InstagramProvider from "next-auth/providers/instagram";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prismadb";
import type { NextApiRequest, NextApiResponse } from "next";

let email = "";
function auth(
	req: NextApiRequest,
	res: NextApiResponse
): ReturnType<typeof NextAuth> {
	if (req.body.userType !== undefined) {
		email = req.body.userType;
		console.log(email);
	}
	return NextAuth(req, res, authOptions(req, res));
}
function authOptions(
	req: NextApiRequest,
	res: NextApiResponse
): NextAuthOptions {
	return {
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
				console.log;
				delete account?.user_id;
				return true;
			},
		},
		debug: true,
	};
}

export default auth;
