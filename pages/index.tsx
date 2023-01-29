import Layout from "@/components/Layout";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TextField from "@/components/TextField";

export default function Home() {
	const { data: session } = useSession();

	const router = useRouter();

	useEffect(() => {
		if (session) {
			if (!session?.user?.email) {
				router.push("/register");
			} else {
				router.push("/mycrush");
			}
		}
	}, [session, router]);
	const [email, setEmail] = useState("");
	const [disabled, setDisable] = useState(true);
	const validateEmail = (email: String) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};
	const handleEmail = (e: React.FormEvent<HTMLInputElement>) => {
		setEmail(e.currentTarget.value);
		if (validateEmail(e.currentTarget.value)) {
			setDisable(false);
		} else {
			setDisable(true);
		}
	};
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
				<TextField
					id='email'
					name='email'
					placeholder='Enter Your Email'
					type='email'
					handle={handleEmail}
				/>
				{!session && (
					<>
						<p> Sign in to continue</p>
						<button
							disabled={disabled}
							onClick={() =>
								signIn("instagram", { email: email })
							}
						>
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
