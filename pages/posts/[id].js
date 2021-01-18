import React, { useState } from "react";
import Nav from "../Nav";
import Footer from "../Footer";
import Head from "next/head";
import Marked from "marked";
import styles from "../../styles/Post.module.css";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import moment from "moment";

function Post({ post, categories }) {
	const [load, setLoad] = useState(true);
	const showComment = () => {
		setLoad(false);

		window.disqus_config = function () {
			this.page.url = window.location.href;
			this.page.identifier = post.id;
		};

		(function () {
			const script = document.createElement("script");
			script.src = "https://cryptonium.disqus.com/embed.js";
			script.setAttribute("data-timestamp", Date.now().toString());
			document.body.appendChild(script);
		})();

		const reset = function () {
			DISQUS.reset({
				reload: true,
				config: function () {
					this.page.identifier = post.id;
					this.page.url = window.location.href;
				},
			});
		};
	};
	return (
		<div>
			<Head>
				<title>{post.Title}</title>
				<link rel="icon" href="/favicon.ico" />
				<meta name="description" content={post.description} />
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

			<main className={styles.body}>
				<Nav categories={categories} />
				<div className={styles.articleName}>
					<h1>{post.Title}</h1>
					<p className={styles.article__info}>
						by&nbsp;{post.Author}&nbsp; -&nbsp;
						<AccessTimeIcon style={{ fontSize: 16 }} />
						&nbsp; {Math.ceil(post.Body.length / 400)} min
					</p>
				</div>
				<div className={styles.date}>
					{moment(post.Date_published).format("DD MMMM, YYYY")}
				</div>
				<div
					className={styles.article}
					dangerouslySetInnerHTML={{ __html: Marked(post.Body) }}></div>
				<div className={styles.commentSection}>
					{load && <button onClick={showComment}>Load Comments</button>}
					<div id="disqus_thread" className={styles.disqus}></div>
				</div>
				<Footer />
			</main>
		</div>
	);
}

export async function getStaticPaths() {
	// Call an external API endpoint to get posts
	const res = await fetch("http://cryptonium-blog.herokuapp.com/articles");
	const posts = await res.json();
	const paths = posts.map((post) => `/posts/${post.id}`);
	return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
	const res = await fetch(
		`http://cryptonium-blog.herokuapp.com/articles/${params.id}`
	);
	const categories = await fetch(
		"http://cryptonium-blog.herokuapp.com/categories"
	);
	const cats = await categories.json();
	const post = await res.json();
	return { props: { post: post, categories: cats }, revalidate: 60 };
}

export default Post;
