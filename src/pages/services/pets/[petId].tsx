// import { baseAxios } from '@/utils/baseAxios';
import DetailsPet from "@/components/services/Pets/DetailsPet";
import EditPet from "@/components/services/Pets/EditPet";
import { fetchPet, useFetchPet } from "@/services/pets/fetchOnePet";
import { Pet } from "@/utils/types";
import { GetServerSideProps } from "next";
import React from "react";

type Props = {
	petId: number;
};

const PetDetailsPage = ({ petId }: Props) => {
	const [data] = useFetchPet({ id: petId });
	console.log(data);

	if (!data) return <h1>Not Found!!</h1>;

	return (
		<div>
			<DetailsPet pet={data} />
			{/* <EditPet petId={petId} /> */}
		</div>
	);
};

export default PetDetailsPage;

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
