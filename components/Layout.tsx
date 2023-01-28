import Header from "./Header";
import Footer from "./Footer";
import type { ReactNode } from "react";
import { Pacifico, Ubuntu } from "@next/font/google";
const pacifico = Pacifico({
	weight: "400",
	subsets: ["latin"],
});

import Image from "next/image";
import backgroundImage from "@/public/background.jpg";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			<Header />
			<main className={pacifico.className}>
				<Image
					src={backgroundImage}
					alt='Background Image'
					className=' object-fill fixed -z-10 overflow-hidden'
					placeholder='blur'
					quality={100}
					fill
					sizes='100vw'
					style={{
						objectFit: "cover",
					}}
				/>
				{children} <Footer />
			</main>
		</>
	);
}
