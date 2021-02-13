const toUrl = (host, route) =>
	`<url><loc>http://www.${host}${route}</loc></url>`;

const createSitemap = (
	host,
	routes,
	categories,
	articles
) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${routes.map((route) => toUrl(host, route)).join("")}
    ${categories
			.map((cat) => toUrl(host, `/categories/${cat.category}`))
			.join("")}
    ${articles.map((art) => toUrl(host, `/posts/${art.id}`)).join(" ")}
    </urlset>`;

const Sitemap = () => {};

Sitemap.getInitialProps = async ({ res, req }) => {
	const routes = [""];
	const cat = await fetch("http://cryptonium-blog.herokuapp.com/categories");
	const categories = await cat.json();
	const pos = await fetch("http://cryptonium-blog.herokuapp.com/articles");
	const posts = await pos.json();
	const sitemap = createSitemap(req.headers.host, routes, categories, posts);
	res.setHeader("Content-Type", "text/xml");
	res.write(sitemap);
	res.end();
	return res;
};

export default Sitemap;
