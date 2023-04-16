import React from "react";
import PetsForm, { PetsFormValues } from "./PetsForm";
import { useCreatePet } from "@/services/pets/createPet";

const CreatePet = () => {
	const [createPet] = useCreatePet();

	const handleSubmit = (data: PetsFormValues) => {
		console.log(data);

		createPet(data);
	};

	return (
		<div>
			<PetsForm onSubmit={handleSubmit} />
		</div>
	);
};

export default CreatePet;
