import Head from "next/head";
import styles from "../styles/Home.module.css";
import Nav from "./Nav";
import Footer from "./Footer";
import Link from "next/link";
import PriceTracker from "./PriceTracker";
import moment from "moment";
// import AccessTimeIcon from "@material-ui/icons/AccessTime";

export default function Home({
	categories,
	latest,
	volgon,
	gnosis,
	elites,
	twitter,
}) {
	console.log(volgon.articles);
	const catPick = (cat) => {
		switch (cat) {
			case "Cryptovolgon":
				return "volgon";
			case "Cryptoelites":
				return "elites";
			case "Cryptognosis":
				return "gnosis";
			case "Cryptotweet of the week":
				return "twitter";
		}
	};
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
						<p>Our insight on today's latest news</p>

						<div className={styles.section__latestArticles}>
							{latest.slice(0, 6).map((article) => (
								<div
									key={article.id}
									className={styles.section__latestArticles__article}>
									<img
										// srcSet={`${article.Cover_photo.formats.thumbnail.url} 600w, ${article.Cover_photo.formats.small.url}768w`}
										// sizes="(max-width: 600px) 600px, 768px"
										src={article.Cover_photo.formats.small.url}
									/>
									<Link href={`/posts/${article.id}`}>
										<a className={styles.section__latestArticles__title}>
											{article.Title}
										</a>
									</Link>
									<div>
										<p className={`${catPick(article.categories[0].category)}`}>
											{article.categories[0].category}
										</p>
										<p>
											{moment(article.Date_published).format("DD MMMM, YYYY")}
										</p>
									</div>
									<Link href={`/posts/${article.id}`}>
										<a className={styles.viewMoreBtn}>View more</a>
									</Link>
								</div>
							))}
						</div>
					</div>
				</section>

				<section className={styles.categories}>
					<div className={styles.category}>
						<h2>Crytovolgon</h2>
						<p>Get the best and latest news in the cryptomarket space</p>

						{/* articles fetched will show here */}
						<div className={styles.catArticlesContainer}>
							{volgon.articles.slice(-3).map((article) => (
								<div key={article.id} className={styles.catArticles}>
									<img src={article.Cover_photo.formats.thumbnail.url} />
									<div>
										<h2>{article.Title}</h2>
										<p>
											{moment(article.Date_published).format("DD MMMM, YYYY")}
										</p>
									</div>
								</div>
							))}
						</div>
						<div className={styles.moreOnCat}>
							<a>More on Cryptovolgon &rarr;</a>
						</div>
					</div>
					<div className={styles.category}>
						<h2>Crytognosis</h2>
						<p>
							Get yourself educated with a basic knowledge of what Crypto is
						</p>

						{/* articles fetched will show here */}
						<div className={styles.catArticlesContainer}>
							{gnosis.articles.slice(-3).map((article) => (
								<div key={article.id} className={styles.catArticles}>
									<img src={article.Cover_photo.formats.thumbnail.url} />
									<div>
										<h2>{article.Title}</h2>
										<p>
											{moment(article.Date_published).format("DD MMMM, YYYY")}
										</p>
									</div>
								</div>
							))}
						</div>
						<div className={styles.moreOnCat}>
							<a>More on Cryptognosis &rarr;</a>
						</div>
					</div>

					<div className={styles.category}>
						<h2>Cryptoelites</h2>
						<p>
							Get to know the living forces who are making impact in the
							cryptospace
						</p>

						{/* articles fetched will show here */}
						<div className={styles.catArticlesContainer}>
							{elites.articles.slice(-3).map((article) => (
								<div key={article.id} className={styles.catArticles}>
									<img src={article.Cover_photo.formats.thumbnail.url} />
									<div>
										<h2>{article.Title}</h2>
										<p>
											{moment(article.Date_published).format("DD MMMM, YYYY")}
										</p>
									</div>
								</div>
							))}
						</div>
						<div className={styles.moreOnCat}>
							<a>More on Cryptoelites &rarr;</a>
						</div>
					</div>

					<div className={styles.category}>
						<h2>Cryptotwitter</h2>
						<p>
							Stay in touch with weekly tweets from our popular crypto
							influencers
						</p>

						{/* articles fetched will show here */}
						<div className={styles.catArticlesContainer}>
							{twitter.articles.slice(-3).map((article) => (
								<div key={article.id} className={styles.catArticles}>
									<img src={article.Cover_photo.formats.thumbnail.url} />
									<div>
										<h2>{article.Title}</h2>
										<p>
											{moment(article.Date_published).format("DD MMMM, YYYY")}
										</p>
									</div>
								</div>
							))}
						</div>
						<div className={styles.moreOnCat}>
							<a>More on Cryptotwitter &rarr;</a>
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

	// for articles
	const cryptovolgon = await fetch(
		"http://cryptonium-blog.herokuapp.com/categories/1"
	);
	const cryptovolgon_articles = await cryptovolgon.json();
	const cryptognosis = await fetch(
		"http://cryptonium-blog.herokuapp.com/categories/2"
	);
	const cryptognosis_articles = await cryptognosis.json();
	const cryptoelites = await fetch(
		"http://cryptonium-blog.herokuapp.com/categories/3"
	);
	const cryptoelites_articles = await cryptoelites.json();
	const cryptotwitter = await fetch(
		"http://cryptonium-blog.herokuapp.com/categories/9"
	);
	const cryptotwitter_articles = await cryptotwitter.json();

	return {
		props: {
			categories: cats,
			latest: latest_articles_res,
			volgon: cryptovolgon_articles,
			gnosis: cryptognosis_articles,
			elites: cryptoelites_articles,
			twitter: cryptotwitter_articles,
		},
		revalidate: 50,
	};
}
