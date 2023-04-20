import { baseAxios } from "@/utils/baseAxios";
import { Comment } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

type ArgComment = {
    id: number;
};

export const fetchComment = async (arg: ArgComment) => {
    const { data } = await baseAxios.get<Comment>(`/feedback/comment/${arg.id}/`);
    console.log(data);
    return data
}

export const useFetchComment = (arg: ArgComment) => {
    const query = useQuery({
        queryFn: () => fetchComment(arg),
        queryKey: ["comment"],
        initialData: null
    })

    return [query.data, query] as const
}