import React from "react";
import LoginForm, { LoginFormValues } from "./LoginForm";
import { useLoginUser } from "@/services/user/loginFetch";
import { useRouter } from "next/router";

const Login = () => {
	const [loginUser] = useLoginUser();
	const router = useRouter();

	const handleSubmit = (data: LoginFormValues) => {
		console.log(data);

		loginUser(data);
		router.push("/account");
	};

	return (
		<div className="flex justify-center items-center m-auto my-10">
			<LoginForm onSubmit={handleSubmit} />
		</div>
	);
};

export default Login;
