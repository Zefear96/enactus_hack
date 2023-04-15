import React from "react";
import { useFetchUser } from "@/services/user/fetchUser";
import Link from "next/link";

const Profile = () => {
	const [currentUser, { isLoading, isError }] = useFetchUser();

	if (isLoading) return <h1>Loading ...</h1>;
	if (isError) return <h1>Something wrong!!</h1>;
	if (!currentUser) return <h1>Not Found</h1>; //чтобы тайпскрипт знал, что нужно остановиться и null не будет

	return (
		<div>
			<p>{currentUser.email}</p>
			<p>{currentUser.phone_number}</p>
			<Link href="account/edit">
				<button>Изменить данные</button>
			</Link>
		</div>
	);
};

export default Profile;
