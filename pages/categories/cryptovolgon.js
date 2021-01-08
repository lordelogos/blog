import React from "react";
import Footer from "../Footer";
import Nav from "../Nav";
import Head from "next/head";
import styles from "../../styles/Categories.module.css";
import Link from "next/link";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

function cryptovolgon({ posts, categories }) {
	return (
		<div>
			<Head>
				<title>{posts.category}</title>
				<link rel="icon" href="/favicon.ico" />
				<meta name="description" content="latest events in cryptocurrency" />
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

	const cryptovolgon = await fetch(
		"http://cryptonium-blog.herokuapp.com/categories/1"
	);
	const cryptovolgon_articles = await cryptovolgon.json();

	return {
		props: { posts: cryptovolgon_articles, categories: cats },
		revalidate: 60,
	};
}

export default cryptovolgon;
