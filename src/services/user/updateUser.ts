import { baseAxios } from "@/utils/baseAxios";
import { User } from "@/utils/types";
import { useMutation, useQueryClient } from '@tanstack/react-query';

type UpdateUserArg = {
    data: Partial<User>
}

const updateUser = async (arg: UpdateUserArg) => {
    // console.log(arg.data);

    const formData = new FormData();

    Object.entries(arg.data).forEach(([key, value]) => {
        const stringValue = value instanceof Blob ? value : value?.toString();
        if (!stringValue) return;
        console.log(key, stringValue, value);

        formData.append(key, stringValue);
    });

    console.log(formData.entries());
    //  let array = formData.entries()
    //   for (var pair of array) {
    //     console.log(pair[0]+ ', ' + pair[1]);
    //   }

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