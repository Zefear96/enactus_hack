import React from "react";
import ProfileForm, { ProfileFormValues } from "./ProfileForm";
import { useUpdateUser } from "@/services/user/updateUser";
import { useFetchUser } from "@/services/user/fetchUser";
import { useRouter } from "next/router";

const EditProfile = () => {
	const [currentUser, { isLoading, isError }] = useFetchUser();
	const [updateUser] = useUpdateUser();
	const router = useRouter();

	const handleSubmit = (values: ProfileFormValues) => {
		updateUser({
			data: values,
		});
		router.push("/account");
	};

	if (isLoading) return <h1>Loading ...</h1>;
	if (isError) return <h1>Something wrong!!</h1>;
	if (!currentUser) return <h1>Not Found</h1>; //чтобы тайпскрипт знал, что нужно остановиться и null не будет

	return (
		<div>
			<ProfileForm
				defaultValues={{
					phone_number: currentUser.phone_number,
					email: currentUser.email,
				}}
				onSubmit={handleSubmit}
			/>
		</div>
	);
};

export default EditProfile;
