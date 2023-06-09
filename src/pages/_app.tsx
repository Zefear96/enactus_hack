import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { queryClient } from "@/utils/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { createEmotionCache, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
// import { modals } from '@/components/modals';
import Navbar from "@/components/Navbar";
import { FooterLinks } from "@/components/Footer";
import { Provider } from "react-redux";
import { persistor, store } from "../store/store";
import { InitStore } from "@/store/initStore";
import { PersistGate } from 'redux-persist/integration/react'

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
	const data = [
		{
			title: "Услуги",
			links: [
				{
					label: "Хостелы/Приюты",
					link: "/",
				},
				{
					label: "Вет.клиники/Аптеки",
					link: "/",
				},
				{
					label: "Акссесуары",
					link: "/",
				},
				{
					label: "Зоомагазины",
					link: "/",
				},
				{
					label: "Животные даром",
					link: "/",
				},
			],
		},
		{
			title: "Информации",
			links: [
				{
					label: "Контакты",
					link: "/reviews/add",
				},
				{
					label: "О нас",
					link: "#aboutus",
				},
				{
					label: "Реклама",
					link: "/services/add/commercial",
				},
				{
					label: "Отзывы",
					link: "#feedbackblock",
				},
				{
					label: "Полезные статьи",
					link: "#articles",
				},
			],
		},
	];

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
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
						<FooterLinks data={data} />
						{/* </ModalsProvider> */}
						<InitStore />
					</MantineProvider>
				</QueryClientProvider>
			</PersistGate>
		</Provider>
	);
}
