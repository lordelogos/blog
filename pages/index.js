import Head from "next/head";
import styles from "../styles/Home.module.css";
import Nav from "./Nav";
import Footer from "./Footer";
import Link from "next/link";
import PriceTracker from "./PriceTracker";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

export default function Home({
	categories,
	featured,
	volgon,
	gnosis,
	elites,
	twitter,
}) {
	return (
		<div className={styles.container}>
			<Head>
				<title>Cryptonium Blog</title>
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
					{/* featured.articles[0] */}
					<img src={featured.articles[0].Cover_photo.formats.large.url} />
					<div>
						<p className={styles.fcategory}>{featured.category}</p>
						<Link href={`/posts/${featured.articles[0].id}`}>
							<a className={styles.ftitle}>{featured.articles[0].Title}</a>
						</Link>
						<p className={styles.fauthor}>
							{featured.articles[0].Author}&nbsp;&nbsp;•&nbsp;&nbsp;
							<AccessTimeIcon style={{ fontSize: 20 }} />
							&nbsp;{Math.ceil(featured.articles[0].Body.length / 200)}&nbsp;min
							read
						</p>
					</div>
				</section>

				<section className={styles.collection}>
					<section className={styles.category}>
						<Link href={`/categories/cryptovolgon`}>
							<a className={styles.catName}>Cryptovolgon</a>
						</Link>
						<p className={styles.catInfo}>
							Get the best and latest news in the cryptomarket space
						</p>
						<div className={styles.articles}>
							{volgon.articles.slice(-3).map((post) => (
								<div
									key={post.id}
									className={`${styles.article} ${styles.volgon} `}>
									<img
										src={post.Cover_photo.formats.small.url}
										alt={post.Title}
									/>
									<div>
										<p className={`${styles.acat} ${styles.volgon}`}>
											{volgon.category}
										</p>
										<Link href={`/posts/${post.id}`}>
											<a className={styles.atitle}>{post.Title}</a>
										</Link>
										<p className={styles.ainfo}>
											{post.Author}&nbsp;•&nbsp;&nbsp;
											<AccessTimeIcon style={{ fontSize: 16 }} />
											&nbsp;{Math.ceil(post.Body.length / 400)} min read
										</p>
									</div>
								</div>
							))}
						</div>
					</section>

					<section className={styles.category}>
						<Link href={`/categories/cryptognosis`}>
							<a className={styles.catName}>Cryptognosis</a>
						</Link>
						<p className={styles.catInfo}>
							Get yourself educated with a basic knowledge of what Crypto is
						</p>
						<div className={styles.articles}>
							{gnosis.articles.slice(-3).map((post) => (
								<div
									key={post.id}
									className={`${styles.article} ${styles.gnosis} `}>
									<img
										src={post.Cover_photo.formats.small.url}
										alt={post.Title}
									/>
									<div>
										<p className={`${styles.acat} ${styles.gnosis} `}>
											{gnosis.category}
										</p>
										<Link href={`/posts/${post.id}`}>
											<a className={styles.atitle}>{post.Title}</a>
										</Link>
										<p className={styles.ainfo}>
											{post.Author}&nbsp;•&nbsp;&nbsp;
											<AccessTimeIcon style={{ fontSize: 16 }} />
											&nbsp;{Math.ceil(post.Body.length / 400)} min read
										</p>
									</div>
								</div>
							))}
						</div>
					</section>

					<section className={styles.category}>
						<Link href={`/categories/cryptoelites`}>
							<a className={styles.catName}>Cryptoelites</a>
						</Link>
						<p className={styles.catInfo}>
							Get to know the living forces who are making impact in the
							cryptospace
						</p>
						<div className={styles.articles}>
							{elites.articles.slice(-3).map((post) => (
								<div
									key={post.id}
									className={`${styles.article} ${styles.elites} `}>
									<img
										src={post.Cover_photo.formats.small.url}
										alt={post.Title}
									/>
									<div>
										<p className={`${styles.acat} ${styles.elites} `}>
											{elites.category}
										</p>
										<Link href={`/posts/${post.id}`}>
											<a className={styles.atitle}>{post.Title}</a>
										</Link>
										<p className={styles.ainfo}>
											{post.Author}&nbsp;•&nbsp;&nbsp;
											<AccessTimeIcon style={{ fontSize: 16 }} />
											&nbsp;{Math.ceil(post.Body.length / 400)} min read
										</p>
									</div>
								</div>
							))}
						</div>
					</section>

					<section className={styles.category}>
						<Link href={`/categories/cryptotwitter`}>
							<a className={styles.catName}>Cryptotwitter</a>
						</Link>
						<p className={styles.catInfo}>
							Stay in touch with weekly tweets from our popular crypto
							influencers
						</p>
						<div className={styles.articles}>
							{twitter.articles.slice(-3).map((post) => (
								<div
									key={post.id}
									className={`${styles.article} ${styles.twitter} `}>
									<img
										src={post.Cover_photo.formats.small.url}
										alt={post.Title}
									/>
									<div>
										<p className={`${styles.acat} ${styles.twitter} `}>
											{twitter.category}
										</p>
										<Link href={`/posts/${post.id}`}>
											<a className={styles.atitle}>{post.Title}</a>
										</Link>
										<p className={styles.ainfo}>
											{post.Author}&nbsp;•&nbsp;&nbsp;
											<AccessTimeIcon style={{ fontSize: 16 }} />
											&nbsp;{Math.ceil(post.Body.length / 400)} min read
										</p>
									</div>
								</div>
							))}
						</div>
					</section>
				</section>
				<Footer />
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
			featured: featured,
			volgon: cryptovolgon_articles,
			gnosis: cryptognosis_articles,
			elites: cryptoelites_articles,
			twitter: cryptotwitter_articles,
		},
		revalidate: 50,
	};
}		
