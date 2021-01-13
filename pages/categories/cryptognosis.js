import React from "react";
import Footer from "../Footer";
import Nav from "../Nav";
import Head from "next/head";
import styles from "../../styles/Categories.module.css";
import Link from "next/link";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

function cryptognosis({ posts, categories }) {
	console.log(posts);
	return (
		<div>
			<Head>
				<title>{posts.category}</title>
				<link rel="icon" href="/favicon.ico" />
				<meta
					name="description"
					content="Begginner's guide to the world of cryptocurrency"
				/>
				<script
					async
					src="https://www.googletagmanager.com/gtag/js?id=G-7RW1J5GDZ7"></script>
				<script
					dangerouslySetInnerHTML={{
						__html: `window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());

				gtag('config', 'G-7RW1J5GDZ7');`,
					}}></script>
			</Head>
			<main>
				<Nav categories={categories} />
				<div className={`${styles.banner} ${styles.gnosis}`}>
					<h2>{posts.category}</h2>
				</div>
				<div className={styles.containerdiv}>
					{posts.articles.map((post) => (
						<div
							key={post.id}
							className={`${styles.article} ${styles.twitter} `}>
							<img src={post.Cover_photo.formats.small.url} alt={post.Title} />
							<div>
								<p className={`${styles.acat} ${styles.gnosis} `}>
									{posts.category}
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
				<Footer />
			</main>
		</div>
	);
}

export async function getStaticProps() {
	const categories = await fetch(
		"http://cryptonium-blog.herokuapp.com/categories"
	);
	const cats = await categories.json();

	const cryptognosis = await fetch(
		"http://cryptonium-blog.herokuapp.com/categories/2"
	);
	const cryptognosis_articles = await cryptognosis.json();
	return {
		props: { posts: cryptognosis_articles, categories: cats },
		revalidate: 60,
	};
}

export default cryptognosis;
