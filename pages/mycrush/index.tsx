import { useSession } from "next-auth/react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MePage() {
	const [crushes, setCrushes] = useState() as [any, any];

	useEffect(() => {});
	const { data: session } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (session != null) {
			if (!session?.user?.email) {
				router.push("/register");
			}
		} else {
			router.push("/");
		}
		async function fetchData() {
			const res = await fetch(`/api/user/getAllCrush`, {
				method: "POST",
				body: JSON.stringify({}),
			});
			setCrushes(res.body);
		}
		fetchData();
	}, [session, router]);

	return (
		<div className='flex flex-col'>
			<table>
				<tr>
					<th>Crush Instagram Id</th>
					<th>Delete</th>
				</tr>

				{crushes ? (
					crushes.map((row: any) => (
						<tr key={row.crushId}>
							<td>{row.crushId}</td>
							<td>
								<button
									color='error'
									onClick={async () => {
										console.log(row.id);
										const res = await fetch(
											`/api/nft/deleteNft`,
											{
												method: "POST",
												body: JSON.stringify({
													crushId: row.crushId,
												}),
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
		</div>
	);
}
