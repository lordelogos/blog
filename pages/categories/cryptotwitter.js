import React from "react";
import Nav from "../Nav";
import Head from "next/head";
import styles from "../../styles/Categories.module.css";
import Link from "next/link";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

function cryptotwitter({ posts, categories }) {
	console.log(posts);
	return (
		<div>
			<Head>
				<title>{posts.category}</title>
				<link rel="icon" href="/favicon.ico" />
				<meta
					name="description"
					content="tweet of the week from high profiled crypto traders and investors"
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
								&nbsp; {Math.ceil(post.Body.length / 200)} min
							</p>
						</div>
					))}
				</div>
			</main>
		</div>
	);
}

export async function getStaticProps() {
	const categories = await fetch(
		"http://cryptonium-blog.herokuapp.com/categories"
	);
	const cats = await categories.json();

	const cryptotwitter = await fetch(
		"http://cryptonium-blog.herokuapp.com/categories/5"
	);
	const cryptotwitter_articles = await cryptotwitter.json();

	return { props: { posts: cryptotwitter_articles, categories: cats } };
}

export default cryptotwitter;
