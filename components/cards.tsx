"use client";
import { motion, useAnimate } from "framer-motion";
import { useLoader } from "@/components/loaderContext";
import { useEffect } from "react";

const cards = [
	{ from: -200, finalH: 320, text: "O", size: "text-6xl" },
	{ from: 200, finalH: 480, text: "R", size: "text-9xl" },
	{ from: -200, finalH: 640, text: "", size: "" },
	{ from: 200, finalH: 480, text: "D", size: "text-9xl" },
	{ from: -200, finalH: 320, text: "R", size: "text-6xl" },
];

const UNIFIED_H = 420;
const SHADOW = "0 0 24px 2px rgba(176, 138, 42, 0.15), 0 0 60px 4px rgba(176, 138, 42, 0.07)";
const NO_SHADOW = "0 0 0px 0px rgba(176, 138, 42, 0), 0 0 0px 0px rgba(176, 138, 42, 0)";


export default function Cards() {
	const { loaderDone } = useLoader();
	const [scope, animate] = useAnimate();

	useEffect(() => {
		if (!loaderDone) return;

		const run = async () => {
			await animate(
				".card",
				{ opacity: 1, y: 0, height: UNIFIED_H },
				{
					duration: 0.65,
					delay: (_i: number) => _i * 0.12,
					ease: [1, 1, 1, 1],
				}
			);

			await Promise.all(
				cards.map((card, i) =>
					animate(
						`.card-${i}`,
						{ height: card.finalH },
						{
							duration: 0.55,
							delay: i * 0.05,
							ease: [1, 1, 1, 1],
						}
					)
				)
			);

			await Promise.all([
				animate(".card", { boxShadow: SHADOW }, { duration: 0.5, ease: "easeOut" }),
				animate(".card-text", { opacity: 1 }, { duration: 0.5, ease: "easeOut" }),
			]);
		};

		run();
	}, [loaderDone, animate]);
	return (
		<div
			ref={scope}
			className="h-screen w-full flex items-center justify-center gap-10"
		>
			{cards.map((card, i) => (
				<motion.div
					key={i}
					className={`card card-${i} w-70 border border-zinc-600 hover:scale-105 duration-400 rounded-2xl cursor-pointer overflow-hidden flex items-center justify-center`}
					style={{
						opacity: 0,
						y: card.from,
						height: UNIFIED_H,
						boxShadow: NO_SHADOW,
					} as React.CSSProperties & { y: number }}
				>
					{card.text && (
						<motion.span
							className={`card-text tracking-widest text-white/80 select-none font-mono ${card.size}`}
							style={{ opacity: 0 }}
						>
							{card.text}
						</motion.span>
					)}
				</motion.div>
			))}
		</div>
	)
}