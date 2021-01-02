import React from "react";
import Footer from "../Footer";
import Nav from "../Nav";
import Head from "next/head";
import styles from "../../styles/Categories.module.css";
import Link from "next/link";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

function cryptognosis({ posts, categories }) {
	return (
		<div>
			<Head>
				<title>{posts.category}</title>
				<link rel="icon" href="/favicon.ico" />
				<meta
					name="description"
					content="Begginner's guide to the world of cryptocurrency"
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
	return { props: { posts: cryptognosis_articles, categories: cats } };
}

export default cryptognosis;


// REST OPERATOR EXAMPLES
explanation:
The rest operator works using the spread operator introduced in ES6 "...". it is used for array destructuring.

it breaks down an array and assigns its values to variables.
Example of destructuring:
[a,b] = [1,2]
console.log(a) // 1
console.log(b) // 2

example of spread operator usage for destructuring:

let numbers = [1,2,3,4];
let spreadNumbers= [...numbers, 5,6]
console.log(spreadNumbers) // [1,2,3,4,5,6]

Now for the rest operator.
example in a function to add N numbers and print the number being added at each step

function add_N_numbers([a,...b]){
	let ans = a;
	console.log("The first number is ", ans);
	for (var i= 0; i < b.length; i++){
		ans += b[i];
		console.log(`After adding ${b[i]} the sum is ${ans}`);
	}

	return ans
}

calling add_N_numbers([1,2,3,4]) should output the following:

first round: 1
second round: After adding 2, the sum is 3
third round: After adding 3, the sum is 6
fourth round : After adding 4, the sum is 10

I know this was a long explanation with an example that rarely comes up but i just want you to know why you would use the REST operator

