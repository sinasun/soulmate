import Layout from "@/components/Layout";
import TextField from "@/components/TextField";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Register = () => {
	const { data: session } = useSession();

	const router = useRouter();
	useEffect(() => {
		if (session != undefined) {
			if (session != null) {
				if (session?.user?.email) {
					router.push("/mycrush");
				}
			} else {
				router.push("/");
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [session]);

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

	const submitEmail = async () => {
		setDisable(true);
		const res = await fetch("/api/user/email", {
			method: "POST",
			body: JSON.stringify({
				email,
			}),
		}).then(() => {
			setDisable(false);
			router.push("/mycrush");
		});
	};

	return (
		<Layout>
			<div className='flex flex-col w-4/5 md:w-2/3 mx-auto mt-24 pb-32'>
				<TextField
					id='email'
					name='email'
					placeholder='Enter Your Email'
					type='email'
					handle={handleEmail}
				/>
				<button
					disabled={disabled}
					onClick={submitEmail}
					className='mt-0 bg-primary text-xl text-text-primary px-16 py-6 w-fit rounded-3xl mx-auto duration-200 border-2 border-primary hover:border-text-primary'
				>
					Submit
				</button>
			</div>
		</Layout>
	);
};

export default Register;
