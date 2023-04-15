import { useMutation } from "@tanstack/react-query";
// import { User } from '@/utils/types';
import { baseAxios } from "@/utils/baseAxios";
import { storageSetItem } from "@/utils/storage";
import { access } from "fs";

type loginUserArg = {
	phone_number: string;
	password: string;
};

const loginUser = async (arg: loginUserArg) => {
	const { data } = await baseAxios.post<{ access: string; refresh: string }>(
		"/account/login/",
		arg,
	);

	// console.log(data);
	storageSetItem("app.accessToken", data.access);

	return data;
};

export const useLoginUser = () => {
	const mutation = useMutation({
		mutationFn: loginUser,
	});

	return [mutation.mutateAsync, mutation] as const;
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
