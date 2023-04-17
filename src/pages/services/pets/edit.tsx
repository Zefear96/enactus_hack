import EditPet from "@/components/services/Pets/EditPet";
import React from "react";
import { GetServerSideProps } from "next";

type Props = {
	petId: number;
};

const editPage = ({ petId }: Props) => {
	return <div>{/* <EditPet petId={petId} /> */}</div>;
};

export default editPage;

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
