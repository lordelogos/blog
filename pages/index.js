import Head from "next/head";
import styles from "../styles/Home.module.css";
import Nav from "./Nav";
import Footer from "./Footer";
import Link from "next/link";
import PriceTracker from "./PriceTracker";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

export default function Home({
	categories,
	latest,
	// featured,
	// volgon,
	// gnosis,
	// elites,
	// twitter,
}) {
	console.log(latest);
	return (
		<div className={styles.container}>
			<Head>
				<title>
					Your guide to Blockchain, cryptocurrency and education - Cryptonium
				</title>
				<link rel="icon" href="/favicon.ico" />
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
				<section className={styles.section}>
					<div className={styles.section__latest}>
						<h2>Latest Articles</h2>
						<p>Our insight to today's latest news</p>
						<div className={styles.section__latestArticles}>
							<div className={styles.section__latestArticles__article}>
								<img />
								<p className={styles.section__latestArticles__title}>
									Article title: This is were the article title goes
								</p>
								<div>
									<p>Category</p>
									<p>Date of publishing</p>
								</div>
							</div>
							<div className={styles.section__latestArticles__article}>
								<img />
								<p className={styles.section__latestArticles__title}>
									Article title: This is were the article title goes
								</p>
								<div>
									<p>Category</p>
									<p>Date of publishing</p>
								</div>
							</div>
							<div className={styles.section__latestArticles__article}>
								<img />
								<p className={styles.section__latestArticles__title}>
									Article title: This is were the article title goes
								</p>
								<div>
									<p>Category</p>
									<p>Date of publishing</p>
								</div>
							</div>
						</div>
					</div>
				</section>
				{/* <Footer /> */}
			</main>
		</div>
	);
}

export async function getStaticProps() {
	// for featured post
	const res = await fetch("http://cryptonium-blog.herokuapp.com/categories/6");
	const featured = await res.json();

	//for categories in search
	const categories = await fetch(
		"http://cryptonium-blog.herokuapp.com/categories"
	);
	const cats = await categories.json();

	// for latest articles
	const latest_articles = await fetch(
		"http://cryptonium-blog.herokuapp.com/articles?_sort=published_at:desc"
	);

	const latest_articles_res = await latest_articles.json();

	// // for articles
	// const cryptovolgon = await fetch(
	// 	"http://cryptonium-blog.herokuapp.com/categories/1"
	// );
	// const cryptovolgon_articles = await cryptovolgon.json();
	// const cryptognosis = await fetch(
	// 	"http://cryptonium-blog.herokuapp.com/categories/2"
	// );
	// const cryptognosis_articles = await cryptognosis.json();
	// const cryptoelites = await fetch(
	// 	"http://cryptonium-blog.herokuapp.com/categories/3"
	// );
	// const cryptoelites_articles = await cryptoelites.json();
	// const cryptotwitter = await fetch(
	// 	"http://cryptonium-blog.herokuapp.com/categories/9"
	// );
	// const cryptotwitter_articles = await cryptotwitter.json();

	return {
		props: {
			categories: cats,
			latest: latest_articles_res,
			// featured: featured,
			// volgon: cryptovolgon_articles,
			// gnosis: cryptognosis_articles,
			// elites: cryptoelites_articles,
			// twitter: cryptotwitter_articles,
		},
		revalidate: 50,
	};
}
