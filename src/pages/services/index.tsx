import React from "react";
import Header from "@/components/ServicesList/Header";
import Navbar from "@/components/Navbar";
import AddServicesForm from "@/components/ServicesList/AddServicesForm";

const ListServices = () => {
	return (
		<div>
			<Header />
			<AddServicesForm />
		</div>
	);
};

export default ListServices;
