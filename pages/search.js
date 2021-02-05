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

	const setCategory = (post) => {
		switch (post.categories[0].category) {
			case "Cryptovolgon":
				return styles.volgon;
			case "Cryptognosis":
				return styles.gnosis;
			case "Cryptoelites":
				return styles.elites;
			case "Cryptotweet of the week":
				return styles.twitter;
		}
	};

	return (
		<div>
			<Head>
				<title>Search results for {keyword}</title>
				<link rel="icon" href="/favicon.ico" />
				<meta name="description" content="Your favourite crypto blog" />
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
							<div key={post.id} className={`${styles.article}`}>
								<img
									src={post.Cover_photo.formats.small.url}
									alt={post.Title}
								/>
								<div>
									<p className={`${styles.acat} ${setCategory(post)} `}>
										{post.categories[0].category}
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
	return { props: { posts, cats }, revalidate: 60 };
}

export default search;
