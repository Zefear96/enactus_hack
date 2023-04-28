import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseAxios } from "@/utils/baseAxios";
import { storageSetItem } from "@/utils/storage";
import { useAppDispatch } from "@/store/hooks";
import { updateTokens } from "@/store/slices/auth.slice";
import { error } from "console";
import React from "react";

type loginUserArg = {
	phone_number: string;
	password: string;
};

const loginUser = async (arg: loginUserArg) => {
	const { data } = await baseAxios.post<{ access: string; refresh: string }>(
		"/account/login/",
		arg,
	);

	return data;
};

export const useLoginUser = () => {
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();
	const [errorMessage, setErrorMessage] = React.useState<string>("");

	const mutation = useMutation({
		mutationFn: loginUser,
		onSuccess(data) {
			dispatch(
				updateTokens({ accessToken: data.access, refreshToken: data.refresh }),
			);
		},
		onError(error: any) {
			console.log("Ошибка входа:", error);
			setErrorMessage(error);

			// здесь можно обработать ошибку, например, вывести сообщение об ошибке на экран
		},
		onSettled() {
			queryClient.invalidateQueries({
				predicate(query) {
					return query.queryKey?.[0] === "account";
				},
			});
		},
	});

	return [mutation.mutateAsync, mutation, errorMessage] as const;
};

//Первый вариант логики без оптимизации

// import { useMutation, } from '@tanstack/react-query';
// import { User } from '@/utils/types';
// import { baseAxios } from '@/utils/baseAxios';

// type loginUserArg = {
//     data: Partial<User> & ({ password: string } | { phone_number: string }) //только эти поля обязательны, остальные нет
// }

// const loginUser = async (arg: loginUserArg) => {
//     const { data } = await baseAxios.post<User>("/account/login/", {
//         ...arg.data
//     });

//     localStorage.setItem("tokens", JSON.stringify(data));

//     return data
// }

// export const useLoginUser = () => {

//     const mutation = useMutation({
//         mutationFn: loginUser,
//     })

//     return [mutation.mutateAsync, mutation] as const
// }
