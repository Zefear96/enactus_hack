import React from "react";
import EditProfile from "@/components/account/EditProfile";
import Profile from "@/components/account/Profile";

const editPage = () => {
	return (
		<div className="flex w-full">
			<Profile />
			<EditProfile />
		</div>
	);
};

export default editPage;
