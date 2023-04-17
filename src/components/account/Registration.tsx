import React from "react";
import RegistrationForm, { RegistrationFormValues } from "./RegistrationForm";
import { useRegisterUser } from "@/services/user/registerFetch";
import { useRouter } from "next/router";

const Registration = () => {
	const [registerUser] = useRegisterUser();
	const router = useRouter();

	const handleSubmit = (data: RegistrationFormValues) => {

		console.log(data);

		registerUser(data);
		router.push("/account/login/");


	};

	return (
		<div className="flex justify-center items-center m-auto my-10">
			<RegistrationForm onSubmit={handleSubmit} />
		</div>
	);
};

export default Registration;
