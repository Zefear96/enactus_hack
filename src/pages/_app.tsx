import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { queryClient } from "@/utils/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { createEmotionCache, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
// import { modals } from '@/components/modals';
import Navbar from "@/components/Navbar";

// declare module "@mantine/modals" {
//   export interface MantineModalsOverride {
//     modals: typeof modals;
//   }
// } //??? для того, чтобы знать типизацию

export const myCache = createEmotionCache({
	key: "mantine",
	prepend: false,
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				withCSSVariables
				emotionCache={myCache}
				theme={{
					/** Put your mantine theme override here */
					colorScheme: "light",
				}}
			>
				{/* <ModalsProvider modals={modals}> */}
				<Navbar />
				<Component {...pageProps} />
				{/* </ModalsProvider> */}
			</MantineProvider>
		</QueryClientProvider>
	);
}
