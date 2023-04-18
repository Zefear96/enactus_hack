import { baseAxios } from "@/utils/baseAxios";
import { User } from "@/utils/types";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type } from "os";

type UpdateUserArg = {
    data: Partial<User>
}

const updateUser = async (arg: UpdateUserArg) => {
    // console.log(arg.data);
    const formData = new FormData();
    // arg.data.name ? formData.append('name', arg.data.name) : null;
    // arg.data.email ? formData.append('email', arg.data.email) : null;
    // arg.data.phone_number ? formData.append('phone_number', arg.data.phone_number) : null;
    // typeof arg.data.profile_image === 'object' && arg.data.profile_image ? formData.append('profile_image', arg.data.profile_image) : null

    Object.entries(arg.data).forEach(([key, value]) => {
        const stringValue = value instanceof Blob ? value : value?.toString();
        if (!stringValue) return;
        console.log(key, stringValue, value);

        formData.append(key, stringValue);
    });

    const res = await baseAxios.patch<User>('/account/edit_profile/', formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
    );
    console.log(res);

    return res.data
}

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: updateUser,
        onSettled() {
            queryClient.invalidateQueries(["account"])
        }
    })

    return [mutation.mutateAsync, mutation] as const
}