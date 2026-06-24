"use client";

import { createContext, useContext, useState, ReactNode } from "react";

const LoaderContext = createContext<{
	loaderDone: boolean;
	setLoaderDone: (v: boolean) => void;
}>({ loaderDone: false, setLoaderDone: () => { } });

export function LoaderProvider({ children }: { children: ReactNode }) {
	const [loaderDone, setLoaderDone] = useState(false);
	return (
		<LoaderContext.Provider value={{ loaderDone, setLoaderDone }}>
			{children}
		</LoaderContext.Provider>
	);
}

export const useLoader = () => useContext(LoaderContext);