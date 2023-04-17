import { baseAxios } from "@/utils/baseAxios";
import { Pet } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ArgPet = {
	id: number;
};

export const deletePet = async (arg: ArgPet) => {
	const { data } = await baseAxios.delete<Pet>(`/pets/change/${arg.id}`);
	console.log(data);
	// return data[0]?
	return data;
};

export const useDeletePet = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: deletePet,
		onSettled(data, error, variables, context) {
			queryClient.invalidateQueries(["pet"]);
			queryClient.invalidateQueries(["pet", { id: variables.id }]);
		},
	});

	return [mutation.mutateAsync, mutation] as const;
};
