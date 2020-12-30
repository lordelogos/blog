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
