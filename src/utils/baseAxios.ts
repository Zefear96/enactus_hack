import { updateTokens } from "@/store/slices/auth.slice";
import { store } from "@/store/store";
import axios, { AxiosError } from "axios";
import { API_URL } from "./constants";

export const baseAxios = axios.create({
	baseURL: API_URL,
});


// const {data} = await baseAxios.get('/daf', {params: {q: "sadas"}, headers: {Authorization: ''}});

baseAxios.interceptors.request.use(
	async (config) => {
		const token = store.getState().auth.accessToken;

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

baseAxios.interceptors.response.use(resp => resp, async error => {
	console.log(error);
	if (!(error instanceof AxiosError)) return Promise.reject(error);

	if (!error.config || !error.response) return Promise.reject(error);

	if (!(error.response.status === 401 || error.response.status === 403)) return Promise.reject(error);

	const refreshToken = store.getState().auth.refreshToken;

	if (!refreshToken) {
		store.dispatch(updateTokens({ accessToken: null, refreshToken: null }));
		return Promise.reject(error)
	};

	try {
		const { data } = await axios.post<{ access: string }>('/account/refresh', { refresh: refreshToken });

		store.dispatch(updateTokens({ accessToken: data.access, refreshToken }));

		return await axios({
			...error.config,
			headers: {
				...error.config.headers,
				Authorization: `Bearer ${data.access}`,
			}
		});
	} catch (_) {
		store.dispatch(updateTokens({ accessToken: null, refreshToken: null }));
		return Promise.reject(error);
	}
})