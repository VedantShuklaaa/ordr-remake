"use client";
import Orb from "./Orb";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brain, Eye, Sparkles } from "lucide-react";
import { useGSAP } from "@gsap/react";


gsap.registerPlugin(ScrollTrigger, useGSAP);


const lines = [
	{
		first: "Global",
		second: "Vault",
		icon: <Brain className="h-[var(--icon-size)] w-[var(--icon-size)]" strokeWidth={1.5} />,
	},
	{
		first: "O(1)",
		second: "Repricing",
		icon: <Sparkles className="h-[var(--icon-size)] w-[var(--icon-size)]" strokeWidth={1.5} />,
	},
	{
		first: "openMM",
		second: "Paradigm",
		icon: <Eye className="h-[var(--icon-size)] w-[var(--icon-size)]" strokeWidth={1.5} />,
	},
];


export default function MindManifest() {
	const containerRef = useRef<HTMLDivElement>(null);


	const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
	const firstWordRefs = useRef<(HTMLSpanElement | null)[]>([]);
	const iconRefs = useRef<(HTMLSpanElement | null)[]>([]);


	const paragraphRef = useRef<HTMLParagraphElement>(null);
	const leftPanelRef = useRef<HTMLDivElement>(null);
	const scrollHintRef = useRef<HTMLDivElement>(null);


	useGSAP(
		() => {
			const ctx = gsap.context(() => {
				gsap.set(iconRefs.current, {
					width: 0,
					autoAlpha: 0,
					scale: 0.6,
					overflow: "hidden",
				});


				gsap.set(paragraphRef.current, {
					autoAlpha: 0,
					y: 30,
					x: 0,
				});


				gsap.set(lineRefs.current, {
					x: (index) => (index % 2 === 0 ? "-12vw" : "12vw"),
				});


				gsap.set(leftPanelRef.current, {
					autoAlpha: 0,
					scale: 0,
					transformOrigin: "center center",
				});


				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: containerRef.current,
						start: "top top",
						end: "+=2500",
						scrub: 1.2,
						pin: true,
						anticipatePin: 1,
					},
				});


				tl.to(
					iconRefs.current,
					{
						width: "var(--icon-size)",
						autoAlpha: 1,
						scale: 1,
						ease: "power2.out",
						duration: 1.8,
					},
					0
				)
					.to(
						firstWordRefs.current,
						{
							marginRight: "clamp(0.75rem, 5vw, 2.5rem)",
							ease: "power2.out",
							duration: 1.8,
						},
						0
					)
					.to(
						[lineRefs.current[0], lineRefs.current[1]],
						{
							autoAlpha: 0,
							y: -40,
							ease: "power2.inOut",
							duration: 1.1,
						},
						2
					)
					.to(
						lineRefs.current[2],
						{
							x: "30vw",
							y: "20vh",
							scale: 0.5,
							transformOrigin: "center center",
							ease: "power3.inOut",
							duration: 1.7,
						},
						2
					)
					.to(
						paragraphRef.current,
						{
							autoAlpha: 1,
							y: 0,
							ease: "power2.out",
							duration: 1.2,
						},
						3.1
					)
					.to(
						paragraphRef.current,
						{
							x: 250,
							ease: "power2.inOut",
							duration: 1,
						},
						4.1
					)
				tl.to(
					leftPanelRef.current,
					{
						autoAlpha: 1,
						scale: 1,
						ease: "power2.out",
						duration: 0.75,
					},
					4.1
				)
					.to(
						scrollHintRef.current,
						{
							autoAlpha: 0,
							ease: "power1.out",
							duration: 0.4,
						},
						0
					);
			}, containerRef);


			return () => ctx.revert();
		},
		{ scope: containerRef }
	);


	const lineClass =
		"flex flex-nowrap items-center justify-center whitespace-nowrap text-foreground font-twid font-semibold tracking-tight text-[clamp(1.75rem,8vw,6rem)] leading-[1.1] text-zinc-300 tracking-wide font-twid";


	const iconChipClass =
		"inline-flex shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-card px-2 text-primary backdrop-blur-sm [--icon-size:clamp(2rem,7vw,4.5rem)]";


	return (
		<div ref={containerRef} id="mind-manifest-section" className="relative z-10 w-full">
			<div className="flex h-screen w-full items-center justify-center overflow-hidden">
				<div className="h-full w-full absolute">
					<Orb
						hue={0}
						hoverIntensity={0.5}
						rotateOnHover
						forceHoverState={false}
					/>
				</div>


				<div className="relative flex h-full w-full flex-col items-center justify-center gap-[clamp(0.5rem,2vw,2rem)] px-[clamp(0.75rem,4vw,2rem)]">
					{lines.map((line, index) => (
						<span
							key={line.first + line.second}
							ref={(el) => {
								lineRefs.current[index] = el;
							}}
							className={`${index === 2 ? `${lineClass} will-change-transform` : lineClass}`}
						>
							<span
								ref={(el) => {
									firstWordRefs.current[index] = el;
								}}
							>
								{line.first}
							</span>
							<span
								ref={(el) => {
									iconRefs.current[index] = el;
								}}
								className={iconChipClass}
							>
								{line.icon}
							</span>
							<span className="italic tracking-wide">{line.second}</span>
						</span>
					))}


					<div
						ref={leftPanelRef}
						className="absolute top-1/2 left-[max(15%,6rem)] hidden h-150 w-120 -translate-y-1/2 rounded-2xl border border-zinc-500 md:block bg-black"
					>
						<div className="h-full w-full flex flex-col items-center justify-centers gap-2 p-4">
							<div className="h-[70%] w-full border border-zinc-500 rounded-xl"></div>
							<div className="h-[30%] w-full border border-zinc-500 rounded-xl"></div>
						</div>
					</div>


					<p
						ref={paragraphRef}
						className="absolute left-1/2 top-1/2 w-[min(90%,42rem)] -translate-x-1/2 -translate-y-1/2 text-center text-[clamp(0.95rem,2.2vw,1.25rem)] leading-relaxed text-zinc-200 font-twid font-semibold"
					>
						PropAMMs are the gold standard for liquidity on Solana, but they are a closed club. Operated by single teams with proprietary infrastructure, locked behind years of custom engineering. A new market maker has to build everything from scratch just to compete at the same level. Ordr changes that. With Shard Book architecture and a global vault, any market maker gets the same on-chain efficiency and depth as a propAMM. No custom infra. No gatekeeping. This is the openMM era.
					</p>
				</div>


				<div
					ref={scrollHintRef}
					className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground sm:text-xs"
				>
					Scroll
				</div>
			</div>
		</div>
	);
}