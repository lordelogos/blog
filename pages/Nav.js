import React, { useState } from "react";
import NotesIcon from "@material-ui/icons/Notes";
import CancelIcon from "@material-ui/icons/Cancel";
import SearchIcon from "@material-ui/icons/Search";
import styles from "../styles/Nav.module.css";
import Link from "next/link";
import Router from "next/router";

function Nav({ categories }) {
	const [showSearch, setShowSearch] = useState(false);
	const [toggleNav, setToggleNav] = useState(false);
	const [search, setSearch] = useState("");

	const handleChange = (e) => {
		e.preventDefault();
		setSearch(e.target.value);
	};

	const handleKeyPress = (e) => {
		if (e.keyCode === 13 && search !== "" && search !== null) {
			setShowSearch(false);
			Router.push({
				pathname: "/search",
				query: { query: search },
			});
		}
	};
	return (
		<nav className={styles.nav}>
			<div
				className={styles.hamburger}
				onClick={() => {
					setToggleNav(true);
					setShowSearch(false);
				}}>
				<NotesIcon
					style={{ fontSize: 30, cursor: "pointer", marginRight: 5 }}
				/>
			</div>

			<div className={styles.branding}>
				{/* blog logo */}
				<svg
					version="1.0"
					xmlns="http://www.w3.org/2000/svg"
					width="1200.000000pt"
					height="1137.000000pt"
					viewBox="0 0 1200.000000 1137.000000"
					preserveAspectRatio="xMidYMid meet">
					<g
						transform="translate(0.000000,1137.000000) scale(0.100000,-0.100000)"
						fill="#030927"
						// fill="#ffa900"
						stroke="none">
						<path
							d="M5360 11359 c-804 -51 -1623 -284 -2324 -661 -527 -284 -941 -592
-1367 -1017 -356 -356 -612 -683 -866 -1106 -435 -722 -690 -1498 -780 -2370
-24 -238 -24 -791 0 -1035 118 -1181 561 -2229 1327 -3140 149 -178 498 -525
680 -676 589 -491 1195 -830 1900 -1064 1097 -364 2268 -384 3385 -60 468 136
989 371 1415 638 693 434 1296 1026 1742 1707 233 356 379 641 555 1083 4 9
-194 12 -973 11 l-979 0 -117 -177 c-64 -97 -165 -238 -224 -312 -140 -175
-462 -497 -634 -634 -858 -684 -1884 -974 -2915 -825 -697 101 -1343 393
-1888 855 -690 583 -1160 1385 -1343 2291 -58 287 -77 486 -77 808 -1 294 7
404 49 664 160 1003 704 1884 1524 2471 722 516 1632 765 2560 700 1249 -88
2326 -708 2986 -1720 l79 -120 977 0 977 0 -13 38 c-51 142 -196 458 -291 633
-807 1486 -2182 2533 -3806 2897 -483 109 -1054 153 -1559 121z"
						/>
						<path
							d="M5512 7649 c-989 -95 -1754 -903 -1799 -1899 -32 -711 331 -1394 940
-1772 633 -394 1446 -396 2084 -7 329 201 632 547 778 888 l39 91 1238 0 1237
0 408 290 c224 160 665 474 979 698 l572 407 -2210 3 -2210 2 -16 43 c-33 85
-142 294 -197 376 -410 611 -1120 950 -1843 880z"
						/>
					</g>
				</svg>
				<Link href="/">
					<a>
						<h2>Cryptonium</h2>
					</a>
				</Link>
			</div>

			<ul className={toggleNav && styles.active}>
				<div
					className={styles.ul_close_mobile}
					onClick={() => setToggleNav(false)}>
					<CancelIcon style={{ fontSize: 30, cursor: "pointer" }} />
				</div>
				<li onClick={() => setToggleNav(false)}>
					<Link href={`/`}>
						<a>Home</a>
					</Link>
				</li>
				<li onClick={() => setToggleNav(false)}>
					<Link href={`/categories/cryptovolgon`}>
						<a>Cryptovolgon</a>
					</Link>
				</li>
				<li onClick={() => setToggleNav(false)}>
					<Link href={`/categories/cryptognosis`}>
						<a>Cryptognosis</a>
					</Link>
				</li>
				<li onClick={() => setToggleNav(false)}>
					<Link href={`/categories/cryptoelites`}>
						<a>Cryptoelites</a>
					</Link>
				</li>

				<div className={styles.ul_socials}></div>
			</ul>

			<div className={styles.searchbtn}>
				{showSearch ? (
					<CancelIcon
						onClick={() => setShowSearch(!showSearch)}
						style={{
							fontSize: "28px",
							cursor: "pointer",
						}}
					/>
				) : (
					<SearchIcon
						style={{
							fontSize: "28px",
							cursor: "pointer",
						}}
						onClick={() => {
							setShowSearch(!showSearch);
							setToggleNav(false);
						}}
					/>
				)}
			</div>

			{showSearch && (
				<div className={styles.ul}>
					<div className={styles.search}>
						<input
							type="text"
							placeholder="Search and press Enter"
							value={search}
							onChange={handleChange}
							onKeyDown={handleKeyPress}
						/>
						<SearchIcon />
					</div>
					<ul>
						<li onClick={() => setShowSearch(false)}>
							<Link href={`/categories/cryptovolgon`}>
								<a>
									Cryptovolgon <span>({categories[0]?.articles.length})</span>
								</a>
							</Link>
						</li>
						<li onClick={() => setShowSearch(false)}>
							<Link href={`/categories/cryptognosis`}>
								<a>
									Cryptognosis <span>({categories[1]?.articles.length})</span>
								</a>
							</Link>
						</li>
						<li onClick={() => setShowSearch(false)}>
							<Link href={`/categories/cryptoelites`}>
								<a>
									Cryptoelites <span>({categories[2]?.articles.length})</span>
								</a>
							</Link>
						</li>
						<li onClick={() => setShowSearch(false)}>
							<Link href={`/categories/cryptotwitter`}>
								<a>
									Crypto tweet of the week{" "}
									<span>({categories[3]?.articles.length})</span>
								</a>
							</Link>
						</li>
					</ul>
				</div>
			)}
		</nav>
	);
}

export default Nav;
