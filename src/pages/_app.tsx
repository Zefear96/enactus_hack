import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { queryClient } from "@/utils/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import Navbar from "@/components/Navbar";
// import { modals } from '@/components/modals';

// declare module "@mantine/modals" {
//   export interface MantineModalsOverride {
//     modals: typeof modals;
//   }
// } //??? для того, чтобы знать типизацию

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
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
