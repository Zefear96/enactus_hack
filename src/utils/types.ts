//?asdas
//! asdasd
// TODO fix this

export type User = {
	id: number;
	last_login: string | null;
	is_superuser: boolean;
	first_name: string | null;
	is_staff: boolean;
	date_joined: string;
	email: string;
	password: string;
	name: string | null;
	last_name: string | null;
	date_birth: string | null;
	city: string | null;
	profile_image: string | null;
	phone_number: string;
	is_active: boolean;
	activation_code: string;
	groups: any[];
	user_permissions: any[];
};

export type Pet = {
	id: number;
	owner: string;
	breed: string;
	image: string | null;
	description: string;
	price: number;
	category: number;
	title: string;
	comments: any[]
};

export type Commercial = {
	id: number;
	title: string;
	category: string;
	description: string;
	address: string;
	contact: string;
	social_net: string;
	is_confirmed: boolean;
	image: string | null;
	ratings: {
		rating__avg: number | null
	};
}

export type Review = {
	id: number;
	name: string;
	contact: string;
	theme: string;
	message: string
}

export type Comment = {
	id: number;
	owner: string;
	body: string;
	created_at: string;
	updated_at: string;
	post: number
}