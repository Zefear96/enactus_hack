import { useMutation } from "@tanstack/react-query";
import { baseAxios } from "@/utils/baseAxios";
import { Commercial } from "@/utils/types";

type CreateCommercialArg = {
    title: string;
    category: string;
    description: string;
    address: string;
    contact: string;
    social_net: string;
    image?: File | null;
}

const createCommercial = async (arg: CreateCommercialArg) => {
    const formData = new FormData();
    console.log(arg);

    Object.entries(arg).forEach(([key, value]) => {
        const stringValue = value instanceof Blob ? value : value?.toString();
        if (!stringValue) return;
        console.log(key, stringValue, value);

        formData.append(key, stringValue);
    });

    const { data } = await baseAxios.post<Commercial>("/shop/get_shop/", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return data
}

export const useCreateCommercial = () => {

    const mutation = useMutation({
        mutationFn: createCommercial,
    })

    return [mutation.mutateAsync, mutation] as const
}