/* eslint-disable */
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export function useIntersectionObserver({ root, target, onIntersect, threshold = 1.0, rootMargin = "0px", enabled = true }) {
	useEffect(() => {
		if (!enabled) {
			return;
		}

		const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && onIntersect()), {
			root: root && root.current,
			rootMargin,
			threshold,
		});

		const el = target && target.current;

		if (!el) {
			return;
		}

		observer.observe(el);

		return () => {
			observer.unobserve(el);
		};
		//eslint-disable-next-line
	}, [target.current, enabled]);
}

export function useDelayRouteExit(ms, callback) {
	const [isMount, setMount] = useState(false);
	const [isLeaving, setLeave] = useState(false);
	const history = useHistory();
	let allowRouteLeave = false;
	useEffect(() => {
		setTimeout(() => setMount(true), 150);
	}, []);

	useEffect(function () {
		return history.block((location, action) => {
			if (!allowRouteLeave) {
				setLeave(true);
				if (callback) callback();
				allowRouteLeave = true;
				setTimeout(function () {
					if (action === "PUSH") {
						history.push(location.pathname + location.search);
					} else if (action === "POP") {
						history.goBack();
					} else if (action === "REPLACE") {
						history.replace(location.pathname + location.search);
					}
				}, ms);
				return false;
			}
		});
	}, []);
	return { isLeaving, isMount, setMount };
}
