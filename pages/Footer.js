import React, { useState } from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import styles from "../styles/Footer.module.css";
import Link from "next/link";

function Footer() {
	const [email, setEmail] = useState("");
	return (
		<div className={styles.footbody}>
			<div className={styles.container}>
				<h2 className={styles.container__head}>Newsletter Sign Up</h2>
				<p className={styles.container__desc}>
					Stay updated with the latest events, trading advice and much more
					directly to your inbox
				</p>

				<form className={styles.container__form}>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Your email addresss"
					/>
					<button>Subscribe</button>
				</form>

				<div className={styles.socials__cta}>
					<p>Follow us</p>
					<div className={styles.socials}>
						<FacebookIcon fontSize="large" style={{ cursor: "pointers" }} />
						<TwitterIcon fontSize="large" />
						<InstagramIcon fontSize="large" />
					</div>
				</div>
			</div>
			<div className={styles.footer}>
				<div>
					<h2 className={styles.footer__logo}>Cryptonium</h2>
					<p>Copyright &copy; 2020</p>
				</div>
			</div>
		</div>
	);
}

export default Footer;
