import React from "react";
import Nav from "./Nav";
import { useRouter } from "next/router";
import Link from "next/link";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import styles from "../styles/Search.module.css";
import Head from "next/head";
import Footer from "./Footer";

function search({ cats, posts }) {
	const router = useRouter();
	const keyword = router.query.query;
	const result = posts.filter((post) =>
		post.Title.toLowerCase().includes(keyword)
	);
	console.log(result);
	return (
		<div>
			<Head>
				<title>Search results for {keyword}</title>
				<link rel="icon" href="/favicon.ico" />
				<meta name="description" content="Your favourite crypto blog" />
			</Head>
			<main>
				<Nav categories={cats} />
				<section className={styles.search}>
					<div className={styles.search__intro}>
						<p>
							{result?.length} {result.length === 1 ? "Post" : "Posts"} Matching
						</p>
						<h2>{keyword}</h2>
					</div>
					<div className={styles.collection}>
						{result?.map((post) => (
							<div key={post.id} className={styles.article}>
								<p className={styles.article__cat}>
									{post.categories[0].category}
								</p>
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
				</section>
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
	const res = await fetch("http://cryptonium-blog.herokuapp.com/articles");
	const posts = await res.json();
	return { props: { posts, cats } };
}

export default search;
