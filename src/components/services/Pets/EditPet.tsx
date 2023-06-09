import React from "react";
import { Pet } from "@/utils/types";
import PetsForm, { PetsFormValues } from "./PetsForm";
import { useRouter } from "next/router";
import { useEditPet } from "@/services/pets/editPet";
import { useFetchPet } from "@/services/pets/fetchOnePet";
import { GetServerSideProps } from "next";
import PetsFormEdit from "./PetsFormEdit";

type Props = {
	// item: Pet;
	petId: number
};

type PropsOnePet = {

	title: string;
	breed: string;
	image: any;
	description: string;
	price: number;
	category: number;
	id: number;
	owner: string;
};

const EditPet = ({ petId }: Props) => {
	const [editPet, { isLoading, isError }] = useEditPet();
	const [onePet] = useFetchPet({ id: petId });
	console.log(onePet);
	// console.log(petId);

	const router = useRouter();

	if (!onePet) return <h1>Not Found!!</h1>;

	const handleSubmit = (values: PetsFormValues) => {
		console.log(values, 'worked edit pet');

		editPet({
			id: onePet.id,
			data: values,
		});

		router.push(`/services/pets/${onePet.id}/`);
	};

	if (isLoading) return <h1>Loading ...</h1>;
	if (isError) return <h1>Something wrong!!</h1>;
	if (!onePet) return <h1>Not Found</h1>;

	return (
		<div>
			<PetsFormEdit
				defaultValues={{
					title: onePet.title,
					breed: onePet.breed,
					image: onePet.image,
					description: onePet.description,
					category: onePet.category,
				}}
				onSubmit={handleSubmit}
			/>
		</div>
	);
};

export default EditPet;

export const getServerSideProps: GetServerSideProps<
	Props,
	{ petId: string }
> = async (context) => {
	const petId = context.params?.petId ? parseInt(context.params?.petId) : null;

	if (!petId) {
		return {
			notFound: true,
		};
	}
	return {
		props: {
			petId,
		},
	};
};
