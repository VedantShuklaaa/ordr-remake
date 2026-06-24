"use client";
import { useEffect, useState } from "react";
import { useLoader } from "@/components/loaderContext";

const START_DELAY = 200;
const MIN_DISPLAY_TIME = 3000;

export default function LoadingScreen() {
	const { setLoaderDone } = useLoader();
	const [visible, setVisible] = useState(false);
	const [fadeIn, setFadeIn] = useState(false);
	const [fadeOut, setFadeOut] = useState(false);

	useEffect(() => {
		const startTimer = setTimeout(() => {
			setVisible(true);
			const fadeInTimer = requestAnimationFrame(() => setFadeIn(true));

			const endTimer = setTimeout(() => {
				setFadeOut(true);
				setTimeout(() => {
					setVisible(false);
					setLoaderDone(true); // 👈 signal to the rest of the app
				}, 500);
			}, MIN_DISPLAY_TIME);

			return () => {
				cancelAnimationFrame(fadeInTimer);
				clearTimeout(endTimer);
			};
		}, START_DELAY);

		return () => clearTimeout(startTimer);
	}, [setLoaderDone]);

	if (!visible) return null;

	return (
		<div
			className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-500 ${fadeOut ? "opacity-0" : fadeIn ? "opacity-100" : "opacity-0"
				}`}
		>
			<video
				src="/intro.mp4"
				autoPlay
				muted
				playsInline
				className="w-[400px] h-[400px] object-contain"
			/>
		</div>
	);
}