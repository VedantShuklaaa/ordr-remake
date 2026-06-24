"use client";
import { useRef } from "react";
import type { CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brain, Eye, Sparkles } from "lucide-react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Page() {
	const containerRef = useRef<HTMLDivElement>(null);

	const line1Ref = useRef<HTMLSpanElement>(null);
	const line2Ref = useRef<HTMLSpanElement>(null);
	const line3Ref = useRef<HTMLSpanElement>(null);

	const controlWordRef = useRef<HTMLSpanElement>(null);
	const mindWordRef = useRef<HTMLSpanElement>(null);
	const yourLastWordRef = useRef<HTMLSpanElement>(null);

	const brainIconRef = useRef<HTMLSpanElement>(null);
	const sparklesIconRef = useRef<HTMLSpanElement>(null);
	const eyeIconRef = useRef<HTMLSpanElement>(null);

	const paragraphRef = useRef<HTMLParagraphElement>(null);
	const scrollHintRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const ctx = gsap.context(() => {
				gsap.set([brainIconRef.current, sparklesIconRef.current, eyeIconRef.current], {
					width: 0,
					autoAlpha: 0,
					scale: 0.6,
					overflow: "hidden",
				});

				gsap.set(paragraphRef.current, {
					autoAlpha: 0,
					y: 30,
				});

				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: containerRef.current,
						start: "top top",
						end: "+=2500",
						scrub: 1,
						pin: true,
					},
				});

				tl.to(
					[brainIconRef.current, sparklesIconRef.current, eyeIconRef.current],
					{
						width: "var(--icon-size)",
						autoAlpha: 1,
						scale: 1,
						ease: "none",
						duration: 1.8,
					},
					0
				)
					.to(
						[controlWordRef.current, mindWordRef.current, yourLastWordRef.current],
						{
							marginRight: "clamp(0.75rem, 5vw, 2.5rem)",
							ease: "none",
							duration: 1.8,
						},
						0
					)
					.to(
						[line1Ref.current, line2Ref.current],
						{
							autoAlpha: 0,
							y: -40,
							ease: "none",
							duration: 0.9,
						},
						2
					)
					.to(
						yourLastWordRef.current,
						{
							autoAlpha: 0,
							ease: "none",
							duration: 0.9,
						},
						2
					)
					.to(
						line3Ref.current,
						{
							x: "30vw",
							y: "35vh",
							scale: 0.5,
							transformOrigin: "center center",
							ease: "none",
							duration: 1.5,
						},
						2
					)
					.to(
						paragraphRef.current,
						{
							autoAlpha: 1,
							y: 0,
							ease: "none",
							duration: 1,
						},
						3.2
					)
					.to(
						scrollHintRef.current,
						{
							autoAlpha: 0,
							ease: "none",
							duration: 0.25,
						},
						0
					);
			}, containerRef);

			return () => ctx.revert();
		},
		{ scope: containerRef }
	);

	const iconWrapStyle = {
		["--icon-size" as string]: "clamp(2rem, 7vw, 4.5rem)",
	} as CSSProperties;

	const lineClass =
		"flex flex-nowrap items-center justify-center whitespace-nowrap text-foreground font-semibold tracking-tight text-[clamp(1.75rem,8vw,6rem)] leading-[1.1]";

	const iconChipClass =
		"inline-flex shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-card/40 p-2 text-primary backdrop-blur-sm";

	const iconSvgClass = "h-[var(--icon-size)] w-[var(--icon-size)]";

	return (
		<div ref={containerRef} className="relative w-full">
			<div className="flex h-screen w-full items-center justify-center overflow-hidden">
				<div className="relative flex h-full w-full flex-col items-center justify-center gap-[clamp(0.5rem,2vw,1.25rem)] px-[clamp(0.75rem,4vw,2rem)]">
					<span ref={line1Ref} className={lineClass}>
						<span ref={controlWordRef}>Control</span>
						<span ref={brainIconRef} style={iconWrapStyle} className={iconChipClass}>
							<Brain className={iconSvgClass} strokeWidth={1.5} />
						</span>
						<span>Your</span>
					</span>

					<span ref={line2Ref} className={lineClass}>
						<span ref={mindWordRef}>Mind</span>
						<span ref={sparklesIconRef} style={iconWrapStyle} className={iconChipClass}>
							<Sparkles className={iconSvgClass} strokeWidth={1.5} />
						</span>
						<span>Manifest</span>
					</span>

					<span ref={line3Ref} className={`${lineClass} will-change-transform`}>
						<span ref={yourLastWordRef}>Your</span>
						<span ref={eyeIconRef} style={iconWrapStyle} className={iconChipClass}>
							<Eye className={iconSvgClass} strokeWidth={1.5} />
						</span>
						<span>Reality</span>
					</span>

					<p
						ref={paragraphRef}
						className="absolute left-1/2 top-1/2 w-[min(90%,42rem)] -translate-x-1/2 -translate-y-1/2 text-center text-[clamp(0.95rem,2.2vw,1.25rem)] leading-relaxed text-muted-foreground"
					>
						Every thought is a seed. Every belief, a blueprint. The world you walk through
						tomorrow is built from the quiet decisions you make today — to focus, to imagine,
						to insist on a different ending. Bend attention, and reality follows.
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