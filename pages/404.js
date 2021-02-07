import Head from "next/head";
import styles from "../styles/Home.module.css";
import Nav from "./Nav";
import Footer from "./Footer";
import Link from "next/link";
import PriceTracker from "./PriceTracker";

export default function Home({ categories }) {
	return (
		<div className={styles.container}>
			<Head>
				<title>Cryptonium Blog</title>
				<link rel="icon" href="/favicon.svg" />
				<script
					async
					src="https://www.googletagmanager.com/gtag/js?id=G-7RW1J5GDZ7"></script>
				<script
					dangerouslySetInnerHTML={{
						__html: `window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());
				gtag('config', 'G-7RW1J5GDZ7');`,
					}}
				/>
			</Head>
			<main>
				<Nav categories={categories} />
				<PriceTracker />
				<section className={styles.notFound}>
					<div>
						<img src="/404.svg" />
					</div>
					<div>Article not found</div>
				</section>
				<Footer />
			</main>
		</div>
	);
}

export async function getStaticProps() {
	//for categories in search
	const categories = await fetch(
		"http://cryptonium-blog.herokuapp.com/categories"
	);
	const cats = await categories.json();

	return {
		props: {
			categories: cats,
		},
		revalidate: 60,
	};
}
