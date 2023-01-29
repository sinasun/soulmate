import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const prisma = new PrismaClient();

type InputData = {
	crushId: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = (await getServerSession(req, res, authOptions)) as Session;
	const username = await session.user?.name;
	let status = 200,
		resultBody = {
			status: "fail",
			message: "Error",
		};
	const { crushId } = (await JSON.parse(req.body)) as InputData;
	await prisma.connection.create({
		data: {
			userId: username,
			crushId: crushId,
		},
	});
	const findUser = await prisma.connection.findFirstOrThrow({
		where: { userId: crushId, userId: username },
	});
	if (findUser) {
		console.log("HOOOOOOOOOOOOOOOORAYYYYYYYYYY");
	}
	await prisma.$disconnect();

	res.status(status).json(resultBody);
};

export default handler;
