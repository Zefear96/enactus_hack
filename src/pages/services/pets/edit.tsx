// // import { baseAxios } from '@/utils/baseAxios';
// import DetailsPet from "@/components/services/Pets/DetailsPet";
// import EditPet from "@/components/services/Pets/EditPet";
// import { fetchPet, useFetchPet } from "@/services/pets/fetchOnePet";
// import { Pet } from "@/utils/types";
// import { GetServerSideProps } from "next";
// import React from "react";

// type Props = {
// 	petId: number;
// };

// const PetDetailsPage = ({ petId }: Props) => {
// 	const [onePet] = useFetchPet({ id: petId });
// 	console.log(onePet);

// 	if (!onePet) return <h1>Not Found!!</h1>;

// 	return (
// 		<div>
// 			<EditPet onePet={onePet} />
// 		</div>
// 	);
// };

// export default PetDetailsPage;

// export const getServerSideProps: GetServerSideProps<
// 	Props,
// 	{ petId: string }
// > = async (context) => {
// 	const petId = context.params?.petId ? parseInt(context.params?.petId) : null;

// 	if (!petId) {
// 		return {
// 			notFound: true,
// 		};
// 	}
// 	return {
// 		props: {
// 			petId,
// 		},
// 	};
// };
import EditPet from "@/components/services/Pets/EditPet";
import React from "react";
import { GetServerSideProps } from "next";

type Props = {
	petId: number;
};

const edit = ({ petId }: Props) => {
	return (
		<div>
			<EditPet petId={petId} />
		</div>
	);
};

export default edit;

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
