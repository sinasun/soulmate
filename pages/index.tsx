import Layout from "@/components/Layout";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
	const { data: session, status } = useSession();
	const loading = status === "loading";

	return (
		<Layout>
			<div className='flex flex-col w-4/5 md:w-2/3 mx-auto mt-24 pb-32'>
				<h1 className='text-4xl md:text-6xl text-text-primary font-medium text-center'>
					Send Love to Your Crush
				</h1>

				<p className=' text-text-primary text-base md:text-xl mt-8 text-center'>
					Login with instagram and wait for your crush to like you
					back
				</p>
				{!session && (
					<>
						<p> Sign in to continue</p>
						<button onClick={() => signIn("instagram")}>
							Sign In
						</button>
					</>
				)}
				{session && (
					<>
						<h1>Successfully signed in as {session.user?.name}</h1>
						<button onClick={() => signOut()}>sign out</button>
					</>
				)}
			</div>
		</Layout>
	);
}
