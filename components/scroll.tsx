"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brain, Eye, Sparkles } from "lucide-react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const lines = [
	{
		first: "Control",
		second: "Your",
		icon: <Brain className="h-[var(--icon-size)] w-[var(--icon-size)]" strokeWidth={1.5} />,
	},
	{
		first: "Mind",
		second: "Manifest",
		icon: <Sparkles className="h-[var(--icon-size)] w-[var(--icon-size)]" strokeWidth={1.5} />,
	},
	{
		first: "Your",
		second: "Reality",
		icon: <Eye className="h-[var(--icon-size)] w-[var(--icon-size)]" strokeWidth={1.5} />,
	},
];

export default function MindManifest() {
	const containerRef = useRef<HTMLDivElement>(null);

	const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
	const firstWordRefs = useRef<(HTMLSpanElement | null)[]>([]);
	const iconRefs = useRef<(HTMLSpanElement | null)[]>([]);

	const paragraphRef = useRef<HTMLParagraphElement>(null);
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
						firstWordRefs.current[2],
						{
							autoAlpha: 0,
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
		"flex flex-nowrap items-center justify-center whitespace-nowrap text-foreground font-semibold tracking-tight text-[clamp(1.75rem,8vw,6rem)] leading-[1.1] text-zinc-300";

	const iconChipClass =
		"inline-flex shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-card px-2 text-primary backdrop-blur-sm [--icon-size:clamp(2rem,7vw,4.5rem)]";

	return (
		<div ref={containerRef} id="mind-manifest-section" className="relative z-10 w-full">
			<div className="flex h-screen w-full items-center justify-center overflow-hidden">
				<div className="relative flex h-full w-full flex-col items-center justify-center gap-[clamp(0.5rem,2vw,1.25rem)] px-[clamp(0.75rem,4vw,2rem)]">
					{lines.map((line, index) => (
						<span
							key={line.first + line.second}
							ref={(el) => {
								lineRefs.current[index] = el;
							}}
							className={`${index === 2 ? `${lineClass} will-change-transform` : lineClass}`}>
							<span ref={(el) => { firstWordRefs.current[index] = el; }} >
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
							<span>{line.second}</span>
						</span>
					))}

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