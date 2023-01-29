import { useSession } from "next-auth/react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AddCrush() {
	const { data: session } = useSession();
	const router = useRouter();

	useEffect(() => {
		console.log(session);
		if (session) {
			if (!session?.user?.email) {
				router.push("/register");
			}
		} else {
			router.push("/");
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [session]);

	const [disabled, setDisable] = useState(true);
	const [crushInstagram, setCrushInstagram] = useState("");

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setDisable(true);
		await fetch("/api/crush/addCrush", {
			method: "POST",
			body: JSON.stringify({
				crushId: crushInstagram,
			}),
		}).then(() => {
			setDisable(false);
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

			<div className='mb-8 mt-24'>
				<input
					required
					type='text'
					id='crushinstagram'
					name='crushinstagram'
					placeholder='Your Crush Instagram id'
					onChange={(e) => setCrushInstagram(e.target.value)}
					className='bg-white border outline-none border-primary  text-text-primary focus:!border-text-primary text-base rounded-3xl  block w-full px-4 py-3'
				/>
			</div>
			<button
				type='submit'
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
