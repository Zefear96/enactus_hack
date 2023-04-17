import { baseAxios } from "@/utils/baseAxios";
import { Pet } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ArgPet = {
	id: number;
	data: {
		title: string;
		breed?: string;
		image?: File | null | string;
		description?: string;
		price?: number;
		category: number;
	};
};

export const editPet = async (arg: ArgPet) => {

	// if (typeof arg.data.image === "object") {
	//     newPost.append("image", editedPost.image);
	//   }

	const formData = new FormData();

	Object.entries(arg).forEach(([key, value]) => {
		const stringValue = value instanceof Blob ? value : value?.toString();
		if (!stringValue) return;

		formData.append(key, stringValue);
	});

	const { data } = await baseAxios.patch<Pet>(
		`/pets/change/${arg.id}`,
		formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	}
	);

	console.log(data);
	return data;
};

export const useEditPet = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: editPet,
		onSettled(data, error, variables, context) {
			queryClient.invalidateQueries(["pet"]);
		},
	});

	return [mutation.mutateAsync, mutation] as const;
};
