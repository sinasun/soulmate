import Head from "next/head";

export default function Header() {
	
	return (
		<Head>
			<title>Soul Mate</title>
			<meta name='description' content='Soul Mate' />
			<meta
				name='viewport'
				content='width=device-width, initial-scale=1'
			/>
			<link rel='icon' href='/favicon.ico' />
		</Head>
	);
}
