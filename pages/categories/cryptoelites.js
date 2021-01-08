import React from "react";
import Nav from "../Nav";
import Footer from "../Footer";
import Head from "next/head";
import styles from "../../styles/Categories.module.css";
import Link from "next/link";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

function cryptoelites({ posts, categories }) {
	return (
		<div>
			<Head>
				<title>{posts.category}</title>
				<link rel="icon" href="/favicon.ico" />
				<meta
					name="description"
					content="High profile players in the cryptocurrency space"
				/>
			</Head>
			<main>
				<Nav categories={categories} />
				<div className={styles.banner}>
					<h2>{posts.category}</h2>
					{/* <p>description goes here</p> */}
				</div>
				<div className={styles.containerdiv}>
					{posts.articles.map((post) => (
						<div key={post.id} className={styles.article}>
							<p className={styles.article__cat}>{posts.category}</p>
							<Link href={`/posts/${post.id}`}>
								<a className={styles.article__name}>{post.Title}</a>
							</Link>
							<p className={styles.article__info}>
								by&nbsp;<b>{post.Author}</b>&nbsp; -&nbsp;
								<AccessTimeIcon style={{ fontSize: 16 }} />
								&nbsp; {Math.ceil(post.Body.length / 400)} min
							</p>
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

	const cryptoelites = await fetch(
		"http://cryptonium-blog.herokuapp.com/categories/3"
	);
	const cryptoelites_articles = await cryptoelites.json();

	return {
		props: { posts: cryptoelites_articles, categories: cats },
		revalidate: 60,
	};
}

export default cryptoelites;
