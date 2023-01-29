import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { useSession } from "next-auth/react";

export default function Page(props: any) {
	const { data: session } = useSession();

	console.log(props);

	if (typeof window === "undefined") return null;

	if (session) {
		return (
			<>
				<h1>Protected Page</h1>
				<p>You can view this page because you are signed in.</p>
			</>
		);
	}
	return <p>Access Denied</p>;
}

export async function getServerSideProps(context: any) {
	const session = await getServerSession(
		context.req,
		context.res,
		authOptions
	);
	const res = await fetch(`https://khodaveisi.com/api/user/getAllCrush`, {
		method: "POST",
		body: JSON.stringify({}),
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

// crushes.map((row: any) => (
// 	<tr key={row.crushId}>
// 		<td>{row.crushId}</td>
// 		<td>
// 			<button
// 				color='error'
// 				onClick={async () => {
// 					console.log(row.id);
// 					const res = await fetch(
// 						`/api/nft/deleteNft`,
// 						{
// 							method: "POST",
// 							body: JSON.stringify({
// 								crushId: row.crushId,
// 							}),
// 						}
// 					).then(() => {
// 						router.reload();
// 					});
// 				}}
// 			>
// 				Delete
// 			</button>
// 		</td>
// 	</tr>
// ))
