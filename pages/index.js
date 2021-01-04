import Head from "next/head";
import styles from "../styles/Home.module.css";
import Nav from "./Nav";
import Footer from "./Footer";
import Link from "next/link";
import PriceTracker from "./PriceTracker";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Button from "@material-ui/core/Button";

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
			</Head>
			<main>
				<Nav categories={categories} />
				<PriceTracker />
				<section className={styles.section}>
					<div className={styles.featured}>
						<p className={styles.featured__cat}>{featured?.category}</p>
						<Link href={`/posts/${featured.articles[0].id}`}>
							<a className={styles.featured__name}>
								{featured.articles[0].Title}
							</a>
						</Link>
						<p className={styles.featured__info}>
							{featured.articles[0].Author} -&nbsp;
							<AccessTimeIcon style={{ fontSize: 16 }} /> &nbsp;
							{Math.ceil(featured.articles[0].Body.length / 200)} min
						</p>
					</div>
				</section>
				<section className={styles.collection}>
					<h2 className={styles.collection__header}>Cryptovolgon</h2>
					<p className={styles.collection__desc}>
						Latest events in the world of Cryptocurrency
					</p>
					<div className={styles.collection__articles}>
						{volgon.articles.slice(0, 3).map((post) => (
							<div key={post.id} className={styles.article}>
								<p className={styles.article__cat}>{volgon.category}</p>
								<Link href={`/posts/${post.id}`}>
									<a className={styles.article__name}>{post.Title}</a>
								</Link>
								<p className={styles.article__info}>
									by&nbsp;<b>{post.Author}</b>&nbsp; -&nbsp;
									<AccessTimeIcon style={{ fontSize: 16 }} />
									&nbsp; {Math.ceil(post.Body.length / 200)} min
								</p>
							</div>
						))}
					</div>
					<div className={styles.morediv}>
						<Link href={`/categories/cryptovolgon`}>
							<a>View more &rarr;</a>
						</Link>
					</div>
				</section>

				<section className={styles.collection}>
					<h2 className={styles.collection__header}>Cryptognosis</h2>
					<p className={styles.collection__desc}>
						Getting started in the crypto space. Join me!
					</p>
					<div className={styles.collection__articles}>
						{gnosis.articles.slice(0, 3).map((post) => (
							<div key={post.id} className={styles.article}>
								<p className={styles.article__cat}>{gnosis.category}</p>
								<Link href={`/posts/${post.id}`}>
									<a className={styles.article__name}>{post.Title}</a>
								</Link>
								<p className={styles.article__info}>
									by&nbsp;<b>{post.Author}</b>&nbsp; -&nbsp;
									<AccessTimeIcon style={{ fontSize: 16 }} />
									&nbsp; {Math.ceil(post.Body.length / 200)} min
								</p>
							</div>
						))}
					</div>
					<div className={styles.morediv}>
						<Link href={`/categories/cryptognosis`}>
							<a>View more &rarr;</a>
						</Link>
					</div>
				</section>

				<section className={styles.collection}>
					<h2 className={styles.collection__header}>Cryptoelites</h2>
					<p className={styles.collection__desc}>
						Get exposed to some major players in the crypto space.
					</p>
					<div className={styles.collection__articles}>
						{elites.articles.slice(0, 3).map((post) => (
							<div key={post.id} className={styles.article}>
								<p className={styles.article__cat}>{elites.category}</p>
								<Link href={`/posts/${post.id}`}>
									<a className={styles.article__name}>{post.Title}</a>
								</Link>
								<p className={styles.article__info}>
									by&nbsp;<b>{post.Author}</b>&nbsp; -&nbsp;
									<AccessTimeIcon style={{ fontSize: 16 }} />
									&nbsp; {Math.ceil(post.Body.length / 200)} min
								</p>
							</div>
						))}
					</div>
					<div className={styles.morediv}>
						<Link href={`/categories/cryptoelites`}>
							<a>View more &rarr;</a>
						</Link>
					</div>
				</section>

				<section className={styles.collection}>
					<h2 className={styles.collection__header}>Cryptotwitter</h2>
					<p className={styles.collection__desc}>
						Tweet of the week from your favourites in the game.
					</p>
					<div className={styles.collection__articles}>
						{twitter.articles.slice(0, 3).map((post) => (
							<div key={post.id} className={styles.article}>
								<p className={styles.article__cat}>{twitter.category}</p>
								<Link href={`/posts/${post.id}`}>
									<a className={styles.article__name}>{post.Title}</a>
								</Link>
								<p className={styles.article__info}>
									by&nbsp;<b>{post.Author}</b>&nbsp; -&nbsp;
									<AccessTimeIcon style={{ fontSize: 16 }} />
									&nbsp; {Math.ceil(post.Body.length / 200)} min
								</p>
							</div>
						))}
					</div>
					<div className={styles.morediv}>
						<Link href={`/categories/cryptotwitter`}>
							<a>View more &rarr;</a>
						</Link>
					</div>
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
		"http://cryptonium-blog.herokuapp.com/categories/5"
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
	};
}
