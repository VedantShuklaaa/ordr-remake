"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";

interface Props {
	href: string;
	children: React.ReactNode;
	className?: string;
	onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function TransitionLink({
	href,
	children,
	className,
	onClick,
}: Props) {
	const router = useRouter();

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		onClick?.(e);
		if (e.defaultPrevented) return;
		e.preventDefault();

		const overlay = document.getElementById("page-transition");
		const main = document.querySelector("main");
		if (!overlay) { router.push(href); return; }

		gsap.fromTo(overlay,
			{ y: "100%" },
			{
				y: "0%",
				duration: 0.7,
				ease: "power4.inOut",
				onComplete: () => {
					if (main) gsap.set(main, { opacity: 0 });

					router.push(href);

					setTimeout(() => {
						if (main) gsap.set(main, { opacity: 1 });

						gsap.to(overlay, {
							y: "-100%",
							duration: 0.7,
							ease: "power4.inOut",
							onComplete: () => {
								gsap.set(overlay, { y: "100%" });
							},
						});
					}, 100);
				},
			}
		);
	};

	return (
		<Link href={href} onClick={handleClick} className={className}>
			{children}
		</Link>
	);
}