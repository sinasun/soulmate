import { useSession } from "next-auth/react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function MePage(props: any) {
	console.log(props);
	const { data: session } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (session) {
			if (!session?.user?.email) {
				router.push("/register");
			}
		} else {
			router.push("/");
		}
	}, [session, router]);

	return (
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

export async function getServerSideProps() {
	// Fetch data from external API
	const res = await fetch(`http://khodaveisi.com/api/user/getAllCrush`, {
		method: "POST",
		body: JSON.stringify({}),
	});
	if (res.ok) {
		const data = await res.json();

		return { props: { data } };
	}
	return { props: {} };
}
