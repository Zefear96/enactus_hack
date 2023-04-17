import React from "react";
import AddCommercialForm, { CommercialFormValues } from "@/components/services/commercial/AddCommercialForm";
import { useCreateCommercial } from '@/services/commercials/createCommercial';
import { useRouter } from "next/router";


const Commercial = () => {
	const [createCommercial] = useCreateCommercial();
	const router = useRouter();

	const handleSubmit = (values: CommercialFormValues) => {
		// console.log(data);


		createCommercial(values);
		router.push("/services/commercials/confirm");

	};

	return (
		<div className="flex justify-center items-center m-auto my-10 w-4/12">
			<AddCommercialForm onSubmit={handleSubmit} />
		</div>
	);
};

export default Commercial;
