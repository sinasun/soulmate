import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";

const SignInPage = () => {
	const { data: session, status } = useSession();

	useEffect(() => {
		console.log(status);
		if (status == "unauthenticated" && !session) {
			void signIn("instagram");
		}
		//if (status == "authenticated") window.close();
	}, [session, status]);

	return null;
};

export default SignInPage;
