import React from "react";
import PetsForm, { PetsFormValues } from "./PetsForm";
import { useCreatePet } from "@/services/pets/createPet";
import { useRouter } from "next/router";

const CreatePet = () => {
	const [createPet] = useCreatePet();
	const router = useRouter();

	const handleSubmit = (data: PetsFormValues) => {
		console.log(data);

		createPet(data);
		router.push("/services/pets");
	};

	return (
		<div>
			<PetsForm onSubmit={handleSubmit} />
		</div>
	);
};

export default CreatePet;
