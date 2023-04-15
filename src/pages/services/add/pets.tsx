import React from "react";
import AddPetsForm from "@/components/services/Pets/AddPetsForm";

const services = () => {
	return <AddPetsForm onSubmit={console.log} />;
};

export default services;
