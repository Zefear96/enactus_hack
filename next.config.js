/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		// domains: ["34.89.184.22"],
		domains: ["petshackaton.ru"],
	},
	i18n: {
		locales: ["ru", "kg"],
		defaultLocale: "ru",
	},
};

module.exports = nextConfig;
