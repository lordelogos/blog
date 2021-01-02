import React, { useState } from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import styles from "../styles/Footer.module.css";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";

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
					<div className={styles.alert}>
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
