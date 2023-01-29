import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";

const SignInPage = () => {
	const { data: session, status } = useSession();

	useEffect(() => {
		console.log(status);
		if (status == "unauthenticated" && !session) {
			void signIn("instagram");
			console.log("instagram");
		}
		if (status == "authenticated" && session) window.close();
	}, [session, status]);

	return null;
};

export default SignInPage;
