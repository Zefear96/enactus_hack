import React from "react";
import AddCommercialForm, { CommercialFormValues } from "@/components/services/commercial/AddCommercialForm";
import { useCreateCommercial } from '@/services/commercials/createCommercial';

const Commercial = () => {
	const [createCommercial] = useCreateCommercial();
	const handleSubmit = (values: CommercialFormValues) => {
		// console.log(data);

		createCommercial(values);
	};

	return (
		<div className="flex justify-center items-center m-auto my-10">
			<AddCommercialForm onSubmit={handleSubmit} />
		</div>
	);
};

export default Commercial;
