import React from "react";
import EditProfile from "@/components/account/EditProfile";
import Profile from "@/components/account/Profile";

const EditPage = () => {
	return (
		<div className="flex w-11/12 m-auto max-sm:flex-col">
			<Profile />
			<EditProfile />
		</div>
	);
};

export default EditPage;
