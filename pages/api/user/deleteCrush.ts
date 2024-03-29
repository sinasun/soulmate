import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const prisma = new PrismaClient();

type InputData = {
	crushId: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = (await getServerSession(req, res, authOptions)) as Session;
	const username = await session.user?.name;

	let status = 200;

	const { crushId } = (await JSON.parse(req.body)) as InputData;
	const findUser = await prisma.connection.findFirst({
		where: {
			AND: [{ userId: username! }, { crushId: crushId }],
		},
	});
	const crush = await prisma.connection.delete({
		where: {
			id: findUser!.id,
		},
	});

	res.status(status).json(crush);
};

export default handler;
