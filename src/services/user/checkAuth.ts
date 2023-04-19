import { baseAxios } from "@/utils/baseAxios";
import { useMutation } from "@tanstack/react-query";
import {
	storageGetItem,
	storageSetItem,
	storageRemoveItem,
} from "@/utils/storage";
import { useCallback } from "react";
import { useRouter } from "next/router";

export const checkAuth = async () => {
	let refreshToken = await storageGetItem("app.refreshToken");
	// console.log(refreshToken);
	if (!refreshToken) {
		return;
	}

	try {
		const { data } = await baseAxios.post<{ access: string; refresh: string }>(
			"/account/refresh/",
			{ refresh: refreshToken },
		);

		console.log(data, "refreshWorked");

		storageSetItem("app.accessToken", data.access);
		storageSetItem("app.refreshToken", refreshToken);

		return data;
	} catch (error) {
		console.log(error);
	}
};

export const useCheckAuth = () => {
	const logout = useLogout();

	const mutation = useMutation({
		mutationFn: checkAuth,
		onError(error, variables, context) {
			logout();
		},
	});

	return [mutation.mutateAsync, mutation] as const;
};

export const useLogout = () => {
	const router = useRouter();

	const logout = useCallback(() => {
		storageRemoveItem("app.refreshToken");
		storageRemoveItem("app.accessToken");
		storageRemoveItem("user");

		router.push("/");
	}, []);

	return logout;
};

// const logout = useLogout()

// logout()

export const checkUserInSys = () => {
	let accessToken = null;

	if (typeof localStorage !== "undefined") {
		accessToken = localStorage.getItem("app.accessToken");
	}

	let refreshToken = null;

	if (typeof localStorage !== "undefined") {
		refreshToken = localStorage.getItem("app.refreshToken");
	}

	return accessToken && refreshToken;
};
