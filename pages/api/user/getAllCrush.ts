import type { NextApiRequest, NextApiResponse } from "next";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type InputData = {
	session: Session;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	let status = 200;
	const { session } = (await JSON.parse(req.body)) as InputData;

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
