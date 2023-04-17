import { baseAxios } from "@/utils/baseAxios";
import { useMutation } from "@tanstack/react-query";
import { storageGetItem, storageSetItem, storageRemoveItem } from "@/utils/storage";
import { useCallback } from "react";
import { useRouter } from 'next/router'

const checkAuth = async () => {

    let refreshToken = await storageGetItem("app.refreshToken");
    console.log(refreshToken);


    try {

        const { data } = await baseAxios.post<{ access: string; refresh: string }>(
            "/account/refresh/",
            { refresh: refreshToken },
        );

        console.log(data, 'refreshWorked');

        storageSetItem("app.accessToken", data.access);
        storageSetItem("app.refreshToken", refreshToken);

        return data;

    } catch (error) {
        console.log(error);
    }
};

export const useCheckAuth = () => {
    const logout = useLogout()

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
        storageRemoveItem('app.refreshToken');
        storageRemoveItem('app.accessToken');

        router.push('/');
    }, [])

    return logout
}

// const logout = useLogout()

// logout()