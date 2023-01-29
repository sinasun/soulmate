import { useSession } from "next-auth/react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TextField from "@/components/TextField";

export default function AddCrush() {
	const { data: session } = useSession();
	const router = useRouter();

	useEffect(() => {
		console.log(session);
		if (session) {
			if (!session.user) {
				router.push("/");
			}
			if (!session?.user?.email) {
				router.push("/register");
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [session]);

	const handleId = (e: React.FormEvent<HTMLInputElement>) => {
		if (e.currentTarget.value) {
			setDisable(false);
		} else {
			setDisable(true);
		}
	};
	const [disabled, setDisable] = useState(true);
	const [crushInstagram, setCrushInstagram] = useState("");

	const handleSubmit = async () => {
		console.log("wtf");
		setDisable(true);
		await fetch("/api/crush/addCrush", {
			method: "POST",
			body: JSON.stringify({
				crushId: crushInstagram,
			}),
		}).then((res: any) => {
			setDisable(false);
			console.log(res);
		});
	};

	return (
		<Layout>
			<h1 className='text-4xl md:text-6xl text-text-primary font-medium text-center'>
				Send Love to Your Crush
			</h1>

			<p className=' text-text-primary text-base md:text-xl mt-8 text-center'>
				Submit Your Crush Instagram Id and get alert whenever she likes
				you back!
			</p>

			<TextField
				id='instagramid'
				name='instagramid'
				placeholder='Enter Your Crush Instagram Id'
				type='text'
				handle={handleId}
			/>
			<button
				disabled={disabled}
				onClick={handleSubmit}
				className='mt-0 bg-primary text-xl text-text-primary px-16 py-6 w-fit rounded-3xl mx-auto duration-200 border-2 border-primary hover:border-text-primary '
			>
				{" "}
				Submit{" "}
			</button>
		</Layout>
	);
}
