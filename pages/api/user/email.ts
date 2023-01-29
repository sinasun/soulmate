import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Session, unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const prisma = new PrismaClient();

type InputData = {
	email: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = (await unstable_getServerSession(
		req,
		res,
		authOptions
	)) as Session;
	const username = await session.user?.name;
	let status = 200,
		resultBody = {
			status: "fail",
			message: "Error",
		};
	const { email } = (await JSON.parse(req.body)) as InputData;
	await prisma.user.update({
		where: { name: username },
		data: {
			email: email,
		},
	});

	await prisma.$disconnect();

	res.status(status).json(resultBody);
};
