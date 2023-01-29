import type { NextApiRequest, NextApiResponse } from "next";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";

//database
const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	let status = 200;
	const session = (await getServerSession(req, res, authOptions)) as Session;
	console.log(session);
	const username = await session.user?.name;

	const curshes = await prisma.connection.findMany({
		where: {
			userId: username,
		},
	});

	res.status(status).json(curshes);
};

export default handler;
