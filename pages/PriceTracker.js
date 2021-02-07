import React from "react";
import styles from "../styles/Price.module.css";

function PriceTracker() {
	return (
		<div>
			<div className={styles.priceTrackerContainer}>
				<div className={styles.priceTracker}>
					<iframe
						src="https://widget.coinlib.io/widget?type=horizontal_v2&theme=light&pref_coin_id=1505&invert_hover=no"
						width="100%"
						height="36px"
						scrolling="auto"
						marginwidth="0"
						marginheight="0"
						frameborder="0"
						border="0"
						className={styles.priceTrackerIframe}></iframe>
				</div>
			</div>
		</div>
	);
}

export default PriceTracker;
