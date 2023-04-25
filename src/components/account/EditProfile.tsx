import React from "react";
import ProfileForm, { ProfileFormValues } from "./ProfileForm";
import { useUpdateUser } from "@/services/user/updateUser";
import { useFetchUser } from "@/services/user/fetchUser";
import { useRouter } from "next/router";
// import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";

const EditProfile = () => {
	const [currentUser, { isLoading, isError }] = useFetchUser();
	const [updateUser] = useUpdateUser();
	const router = useRouter();

	const handleSubmit = (values: ProfileFormValues) => {
		updateUser({
			data: values,
		});
		console.log('update worked');

		router.push("/account");
		// notifications.show({
		// 	title: "Успешно!",
		// 	message: "Ваши данные были изменены.",
		// 	styles: (theme) => ({
		// 		root: {
		// 			backgroundColor: theme.colors.violet[6],
		// 			borderColor: theme.colors.green[6],

		// 			"&::before": { backgroundColor: theme.white },
		// 			"::selection": {
		// 				backgroundColor: theme.colors.green,
		// 				color: theme.colors.violet,
		// 			},
		// 		},

		// 		title: {
		// 			color: theme.white,
		// 			"::selection": {
		// 				backgroundColor: theme.colors.green,
		// 				color: theme.colors.white,
		// 			},
		// 		},
		// 		description: {
		// 			color: theme.white,
		// 			"::selection": {
		// 				backgroundColor: theme.colors.green,
		// 				color: theme.colors.white,
		// 			},
		// 		},
		// 		closeButton: {
		// 			color: theme.white,
		// 			"&:hover": { backgroundColor: theme.colors.red[7] },
		// 		},
		// 	}),
		// 	icon: <IconCheck />,
		// });

	};

	if (isLoading) return <h1>Loading ...</h1>;
	if (isError) return <h1>Something wrong!!</h1>;
	if (!currentUser) return <h1>Not Found</h1>; //чтобы тайпскрипт знал, что нужно остановиться и null не будет
	if (currentUser.name === null) { currentUser.name = '' }

	return (
		<div className="flex w-2/4 mx-auto my-10 max-sm:w-full max-sm:my-5">
			<ProfileForm
				defaultValues={{
					name: currentUser.name,
					phone_number: currentUser.phone_number,
					email: currentUser.email,
					profile_image: currentUser.profile_image
				}}
				onSubmit={handleSubmit}
			/>
		</div>
	);
};

export default EditProfile;
