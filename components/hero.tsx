"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Beams from "@/components/Beams"
import { useLoader } from "@/components/loaderContext";
import { LaunchAppButton } from "./launchApp";


export default function Hero() {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once: true, margin: "-100px" });
	const { loaderDone } = useLoader();

	const shouldAnimate = loaderDone && inView;
	const parallelDelay = 1;

	return (
		<div
			ref={ref}
			className="h-screen w-full flex flex-col items-center justify-center gap-4 relative"
		>
			<div className="h-full w-full absolute">
				<Beams
					beamWidth={2}
					beamHeight={15}
					beamNumber={12}
					lightColor="#ffffff"
					speed={2}
					noiseIntensity={1.75}
					scale={0.2}
					rotation={0}
				/>
			</div>


			<div className="h-[80vh] w-[95vw] lg:w-[80vw] border border-zinc-900 rounded-4xl relative flex flex-col gap-10 items-center justify-center z-99 backdrop-blur-lg">
				<div className="flex flex-col w-full items-center">
					<motion.div
						initial={{ opacity: 0, y: -16 }}
						animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
						transition={{
							duration: 0.6,
							delay: parallelDelay,
							ease: [0.22, 1, 0.36, 1],
						}}
					>
						<p className="text-[#b08a2a]">TRY OUT THE V1 MAINNET</p>
					</motion.div>

					<div
						className="leading-none flex flex-col gap-4 items-center text-center overflow-hidden w-full"
						style={{ fontSize: "clamp(3.3rem, 6.5vw, 6.4rem)" }}
					>
						<div className="overflow-hidden z-11 flex flex-col font-mono">
							<motion.h1
								className="text-white [word-spacing:-1rem]"
								initial={{ opacity: 0, y: "-110%" }}
								animate={shouldAnimate ? { opacity: 1, y: "0%" } : { opacity: 0, y: "-110%" }}
								transition={{ duration: 0.65, delay: 0.0, ease: [0.76, 0, 0.24, 1] }}
							>
								Open Market Making
							</motion.h1>

							<motion.h1
								className="text-white [word-spacing:-1rem]"
								initial={{ opacity: 0, y: "-170%" }}
								animate={shouldAnimate ? { opacity: 1, y: "0%" } : { opacity: 0, y: "-170%" }}
								transition={{ duration: 0.65, delay: 0.12, ease: [0.76, 0, 0.24, 1] }}
							>
								On{" "}
								<span className="relative inline-block">
									<motion.span
										className="bg-linear-to-br from-purple-600 via-blue-500 to-teal-400 text-transparent bg-clip-text"
										initial={{ opacity: 0 }}
										animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
										transition={{
											duration: 0.7,
											delay: parallelDelay,
											ease: "easeOut",
										}}
										aria-hidden
									>
										Solana
									</motion.span>

									<motion.span
										className="text-white absolute inset-0"
										initial={{ opacity: 1 }}
										animate={shouldAnimate ? { opacity: 0 } : { opacity: 1 }}
										transition={{
											duration: 0.7,
											delay: parallelDelay,
											ease: "easeOut",
										}}
										aria-hidden
									>
										Solana
									</motion.span>
								</span>
							</motion.h1>
						</div>

						<motion.div
							className="leading-none z-11 w-full flex items-center justify-center"
							initial={{ opacity: 0, y: -24 }}
							animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: -24 }}
							transition={{
								duration: 0.65,
								delay: 0.72,
								ease: [0.22, 1, 0.36, 1],
							}}
						>
							<p className="text-[0.875rem] lg:text-[1.2rem] text-center w-[90%] md:w-[70%] lg:w-[70%] xl:w-[50%] text-zinc-400">
								A fully on chain order book exchange on Solana that gives market makers
								their own private accounts, cheap repricing, and protection from toxic
								arbitrage.
							</p>
						</motion.div>
					</div>
				</div>

				<motion.div
					initial={{ opacity: 0, y: "-110%" }}
					animate={shouldAnimate ? { opacity: 1, y: "0%" } : { opacity: 0, y: "-110%" }}
					transition={{ duration: 0.65, delay: 0.0, ease: [0.76, 0, 0.24, 1] }}
				>
					<LaunchAppButton />
				</motion.div>
			</div>
		</div>
	)
}