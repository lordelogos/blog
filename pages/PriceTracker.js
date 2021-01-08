import React, { useEffect, useState, useRef } from "react";
import styles from "../styles/Price.module.css";
import useInterval from "./useInterval";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import { IconButton } from "@material-ui/core";

export default function PriceTracker() {
	const [btc, setBtc] = useState(null);
	const [eth, setEth] = useState(null);
	const [usdt, setUsdt] = useState(null);
	const [ltc, setLtc] = useState(null);
	const [bch, setBch] = useState(null);
	const [xlm, setXlm] = useState(null);
	const [link, setLink] = useState(null);
	const [iota, setIota] = useState(null);
	const [dot, setDot] = useState(null);
	const [fbtc, setfBtc] = useState(null);
	const [feth, setfEth] = useState(null);
	const [fusdt, setfUsdt] = useState(null);
	const [fltc, setfLtc] = useState(null);
	const [fbch, setfBch] = useState(null);
	const [fxlm, setfXlm] = useState(null);
	const [fiota, setfIota] = useState(null);
	const [fdot, setfDot] = useState(null);
	const [flink, setfLink] = useState(null);

	const fetchData = async () => {
		const data_btc = await fetch(
			"https://api.coingecko.com/api/v3/coins/bitcoin"
		);
		const btc1 = await data_btc.json();
		const formerBtc = btc;
		setfBtc(btc1.market_data.current_price.usd - formerBtc);
		setBtc(btc1.market_data.current_price.usd);

		// for ethereum
		const data_eth = await fetch(
			"https://api.coingecko.com/api/v3/coins/ethereum"
		);
		const eth1 = await data_eth.json();
		const formerEth = eth;
		setfEth(eth1.market_data.current_price.usd - formerEth);
		setEth(eth1.market_data.current_price.usd);

		// for litecoin
		const data_ltc = await fetch(
			"https://api.coingecko.com/api/v3/coins/litecoin"
		);
		const ltc1 = await data_ltc.json();
		const formerLtc = ltc;
		setfLtc(ltc1.market_data.current_price.usd - formerLtc);
		setLtc(ltc1.market_data.current_price.usd);

		// for tether
		const data_usdt = await fetch(
			"https://api.coingecko.com/api/v3/coins/tether"
		);
		const usdt1 = await data_usdt.json();
		const formerUsdt = usdt;
		setfUsdt(usdt1.market_data.current_price.usd - formerUsdt);
		setUsdt(usdt1.market_data.current_price.usd);

		// for bitcoin-cash
		const data_bch = await fetch(
			"https://api.coingecko.com/api/v3/coins/bitcoin-cash"
		);
		const bch1 = await data_bch.json();
		const formerBch = bch;
		setfBch(bch1.market_data.current_price.usd - formerBch);
		setBch(bch1.market_data.current_price.usd);

		// for stellar
		const data_xlm = await fetch(
			"https://api.coingecko.com/api/v3/coins/stellar"
		);
		const xlm1 = await data_xlm.json();
		const formerXlm = xlm;
		setfXlm(xlm1.market_data.current_price.usd - formerXlm);
		setXlm(xlm1.market_data.current_price.usd);

		// for iota
		const data_iota = await fetch(
			"https://api.coingecko.com/api/v3/coins/iota"
		);
		const iota1 = await data_iota.json();
		const formerIota = iota;
		setfIota(iota1.market_data.current_price.usd - formerIota);
		setIota(iota1.market_data.current_price.usd);

		// for chainlink
		const data_link = await fetch(
			"https://api.coingecko.com/api/v3/coins/chainlink"
		);
		const link1 = await data_link.json();
		const formerLink = link;
		setfLink(link1.market_data.current_price.usd - formerLink);
		setLink(link1.market_data.current_price.usd);

		// for Polkadot
		const data_dot = await fetch(
			"https://api.coingecko.com/api/v3/coins/polkadot"
		);
		const dot1 = await data_dot.json();
		const formerDot = dot;
		setfDot(dot1.market_data.current_price.usd - formerDot);
		setDot(dot1.market_data.current_price.usd);
	};

	useEffect(() => {
		fetchData();
	}, []);

	useInterval(fetchData, 10000);

	const sliderRef = useRef();

	const handleScrollLeft = () => {
		sliderRef.current.scrollLeft -= 1000;
	};

	const handleScrollRight = () => {
		sliderRef.current.scrollLeft += 500;
	};

	return (
		<div className={styles.price}>
			{
				<IconButton style={{ padding: "6px" }} onClick={handleScrollLeft}>
					<ArrowLeftIcon />
				</IconButton>
			}
			<div className={styles.coin_container} ref={sliderRef}>
				<div className={styles.coin}>
					<h2>BTC</h2>
					<h2 className={fbtc < 0 ? styles.loss : styles.gain}>
						<span>$</span>
						{btc && `${btc.toLocaleString()}`}
					</h2>
				</div>
				<div className={styles.coin}>
					<h2>ETH</h2>
					<h2 className={feth < 0 ? styles.loss : styles.gain}>
						<span>$</span>
						{eth && `${eth.toLocaleString()}`}
					</h2>
				</div>
				<div className={styles.coin}>
					<h2>LTC</h2>
					<h2 className={fltc < 0 ? styles.loss : styles.gain}>
						<span>$</span>
						{ltc && `${ltc.toLocaleString()}`}
					</h2>
				</div>
				<div className={styles.coin}>
					<h2>BCH</h2>
					<h2 className={fbch < 0 ? styles.loss : styles.gain}>
						<span>$</span>
						{bch && `${bch.toLocaleString()}`}
					</h2>
				</div>
				<div className={styles.coin}>
					<h2>XLM</h2>
					<h2 className={fxlm < 0 ? styles.loss : styles.gain}>
						<span>$</span>
						{xlm && `${xlm.toLocaleString()}`}
					</h2>
				</div>
				<div className={styles.coin}>
					<h2>IOTA</h2>
					<h2 className={fiota < 0 ? styles.loss : styles.gain}>
						<span>$</span>
						{iota && `${iota.toLocaleString()}`}
					</h2>
				</div>
				<div className={styles.coin}>
					<h2>LINK</h2>
					<h2 className={flink < 0 ? styles.loss : styles.gain}>
						<span>$</span>
						{link && `${link.toLocaleString()}`}
					</h2>
				</div>
				<div className={styles.coin}>
					<h2>DOT</h2>
					<h2 className={fdot < 0 ? styles.loss : styles.gain}>
						<span>$</span>
						{dot && `${dot.toLocaleString()}`}
					</h2>
				</div>
				<div className={styles.coin}>
					<h2>USDT</h2>
					<h2 className={fusdt < 0 ? styles.loss : styles.gain}>
						<span>$</span>
						{usdt && `${usdt.toLocaleString()}`}
					</h2>
				</div>
			</div>
			{
				<IconButton style={{ padding: "6px" }} onClick={handleScrollRight}>
					<ArrowRightIcon />
				</IconButton>
			}
		</div>
	);
}

// bitcoin
// ethereum
// litecoin
// bitcoin-cash
// tether
