import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Page(props: any) {
	const { data: session } = useSession();
	const router = useRouter();

	if (typeof window === "undefined") return null;

	if (session) {
		if (!session?.user?.email) {
			router.push("/register");
		} else {
			return (
				<>
					<div className='flex flex-col'>
						<table>
							<tr>
								<th>Crush Instagram Id</th>
								<th>Delete</th>
							</tr>

							{props.data ? (
								props.data.map((row: any) => (
									<tr key={row.crushId}>
										<td>{row.crushId}</td>
										<td>
											<button
												color='error'
												onClick={async () => {
													const res = await fetch(
														`/api/user/deleteNft`,
														{
															method: "POST",
															body: JSON.stringify(
																{
																	crushId:
																		row.crushId,
																}
															),
														}
													).then(() => {
														router.reload();
													});
												}}
											>
												Delete
											</button>
										</td>
									</tr>
								))
							) : (
								<></>
							)}
						</table>
					</div>{" "}
				</>
			);
		}
	} else {
		router.push("/");
	}
}

export async function getServerSideProps(context: any) {
	const session = await getServerSession(
		context.req,
		context.res,
		authOptions
	);
	const res = await fetch(`https://khodaveisi.com/api/user/getAllCrush`, {
		method: "POST",
		body: JSON.stringify({ session }),
	});
	if (res.ok) {
		const data = await res.json();

		return {
			props: {
				session,
				data,
			},
		};
	}
	return {
		props: {
			session,
		},
	};
}
