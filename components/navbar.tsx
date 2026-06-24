"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import TransitionLink from "./transitionLinks";
import { NavLink } from "./navLink";

export default function Navbar() {
	const [hidden, setHidden] = useState(false);
	const [atTop, setAtTop] = useState(true);
	const lastScrollY = useRef(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			setAtTop(currentScrollY < 10);

			if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
				setHidden(true);
			} else if (currentScrollY < lastScrollY.current) {
				setHidden(false);
			}

			lastScrollY.current = currentScrollY;
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 z-100 ${hidden ? "-translate-y-full" : "translate-y-0"}`}>
			<div className={`h-15 w-[95vw] lg:w-[80vw] mt-5 mx-auto p-2 flex items-center justify-between font-mono backdrop-blur-xl p-4 border-b transition-colors duration-300 ${atTop ? "border-transparent" : "border-zinc-600"}`}>
				<div className="flex items-center justify-center text-white gap-5 text-sm text-zinc-400">
					<TransitionLink href="/" className="hover:text-[#b08a2a] duration-200"><NavLink text="Protocol" /></TransitionLink>
					<TransitionLink href="/" className="hover:text-[#b08a2a] duration-200"><NavLink text="Team" /></TransitionLink>
				</div>

				<TransitionLink className="flex items-center justify-center gap-1" href="/">
					<span>
						<Image height={30} width={30} src="/logo-1.webp" alt="ORDER" />
					</span>
					<span className="text-white tracking-widest text-md text-zinc-400">
						ORDR
					</span>
				</TransitionLink>

				<div className="flex items-center justify-center text-white gap-5 text-sm text-zinc-400">
					<TransitionLink href="/" className="hover:text-[#b08a2a] duration-200"><NavLink text="Twitter" /></TransitionLink>
					<button className="py-2 px-3 border border-[#b08a2a]/50 text-[#b08a2a] cursor-pointer">
						Launch app
					</button>
				</div>
			</div>
		</div>
	);
}