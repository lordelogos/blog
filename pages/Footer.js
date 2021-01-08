import React, { useState } from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import styles from "../styles/Footer.module.css";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Link from "next/link";

function Footer() {
	const [email, setEmail] = useState("");
	const [success, setSuccess] = useState(false);
	const [disabled, setDisabled] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		// const form = document.forms["newsletter-form"];
		const formData = new FormData();
		formData.append("email", email);

		fetch(
			"https://script.google.com/macros/s/AKfycbw6hHiMFpdKDfG_FuqWKbYBrYiBTUdb4sLpCYaLKkwGoRjPkKnmPuejWw/exec",
			{ method: "POST", body: formData }
		)
			.then(() => {
				setSuccess(true);
				setDisabled(true);
				setEmail("");
				setTimeout(() => {
					setSuccess(false);
					setDisabled(false);
				}, 4000);
			})
			.catch((error) => console.error("Error!", error.message));
	};

	return (
		<div className={styles.footbody}>
			<div className={styles.container}>
				<h2 className={styles.container__head}>Newsletter Sign Up</h2>
				<p className={styles.container__desc}>
					Stay updated with the latest events, trading advice and much more
					directly to your inbox
				</p>

				{success && (
					<div className={styles.alert} onClick={() => setSuccess(false)}>
						<p>
							Your sign up was successful&nbsp;
							<CheckCircleIcon />
						</p>
					</div>
				)}
				<form
					className={styles.container__form}
					onSubmit={handleSubmit}
					name="newsletter-form">
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Your email addresss"
					/>
					<button type="submit" disabled={disabled}>
						Subscribe
					</button>
				</form>

				<div className={styles.socials__cta}>
					<p>Follow us</p>
					<div className={styles.socials}>
						<Link href="https://web.facebook.com/IamCryptonium?_rdc=1&_rdr">
							<a target="_blank">
								<FacebookIcon fontSize="large" />
							</a>
						</Link>
						<Link href="https://twitter.com/_Cryptonium?s=08">
							<a target="_blank">
								<TwitterIcon fontSize="large" />
							</a>
						</Link>
						<Link href="https://www.instagram.com/iamcryptonium/">
							<a target="_blank">
								<InstagramIcon fontSize="large" />
							</a>
						</Link>
					</div>
				</div>
			</div>
			<div className={styles.footer}>
				<div>
					<div className={styles.footer__logo}>
						<svg
							version="1.0"
							xmlns="http://www.w3.org/2000/svg"
							width="1200.000000pt"
							height="1137.000000pt"
							viewBox="0 0 1200.000000 1137.000000"
							preserveAspectRatio="xMidYMid meet">
							<g
								transform="translate(0.000000,1137.000000) scale(0.100000,-0.100000)"
								fill="#0d1137"
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
						<h2>Cryptonium</h2>
					</div>
					<p>Copyright &copy; 2020</p>
				</div>
			</div>
		</div>
	);
}

export default Footer;
