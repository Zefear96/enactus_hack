import React from "react";
import { useFetchUser } from "@/services/user/fetchUser";
import Link from "next/link";
import { Avatar, Text, Group } from "@mantine/core";
import Image from "next/image";
import person_black from "../../../public/person_black.png";
import person_white from "../../../public/person_white.png";
import border_black from "../../../public/border_black.png";
import border_white from "../../../public/border_white.png";
import logout_black from "../../../public/logout_black.png";
import { IconPencil } from "@tabler/icons-react";
import { IconLock } from "@tabler/icons-react";
//нужен logout white

const Profile = () => {
	const [currentUser, { isLoading, isError }] = useFetchUser();

	if (isLoading) return <h1>Loading ...</h1>;
	if (isError) return <h1>Something wrong!!</h1>;
	if (!currentUser) return <h1>Not Found</h1>; //чтобы тайпскрипт знал, что нужно остановиться и null не будет

	return (
		<div className="flex m-10 w-1/4">
			<div className="flex justify-center items-center flex-col w-full py-5 border-primary border-r">
				{/* bg-yellowlogin */}
				<div className="flex flex-col items-center my-10">
					{currentUser.profile_image ? (
						<Avatar
							src={currentUser.profile_image}
							style={{ borderRadius: "50%", border: "1px solid #4526FF" }}
							size="xl"
						/>
					) : currentUser.name ? (
						<Avatar
							src={null}
							color="primary"
							alt={currentUser.name}
							style={{ borderRadius: "50%", border: "1px solid #4526FF" }}
							size="xl"
						/>
					) : (
						<Avatar
							size="xl"
							style={{ borderRadius: "50%", border: "1px solid #4526FF" }}
						/>
					)}

					{currentUser.name ? <Text mt="xs">{currentUser.name}</Text> : null}
					{currentUser.name ? (
						<Text c="dimmed">{currentUser.email}</Text>
					) : (
						<Text c="dimmed" mt="xs">
							{currentUser.email}
						</Text>
					)}
					<Text c="dimmed">{currentUser.phone_number}</Text>
				</div>
				<div className="w-4/5 m-auto flex justify-center items-start flex-col">
					<button className="flex items-center text-xl py-3 my-2 w-10/12 rounded-md mx-auto hover:bg-primary  hover:text-white">
						{/* <IconPencil /> */}
						<Image src={person_black} alt="error:(" className="mx-2" />
						<a href="account/edit">Профиль</a>
					</button>
					<button className="flex items-center text-xl py-3 my-2 w-10/12 rounded-md mx-auto hover:bg-primary  hover:text-white">
						{/* <IconPencil /> */}
						<Image src={person_black} alt="error:(" className="mx-2" />
						<a href="account/edit">Изменить данные</a>
					</button>
					<button className="flex items-center text-xl py-3 my-2 rounded-md w-10/12 mx-auto hover:bg-primary  hover:text-white">
						<Image src={person_black} alt="error:(" className="mx-2" />
						<a href="account/change_password">Изменить пароль</a>
					</button>
					<button className="flex items-center text-xl py-3  my-2 w-10/12 rounded-md mx-auto hover:bg-primary  hover:text-white">
						<Image src={border_black} alt="error:(" className="mx-2" />
						<a href="/">Мои публикации</a>
					</button>
					{/* Надо будет поменять путь на его публикации */}

					<button className="flex items-center text-xl  py-3 my-3 w-10/12 rounded-md mx-auto hover:bg-primary  hover:text-white">
						{/* hover:bg-bluelogin */}
						<Image src={logout_black} alt="error:(" className="mx-2" />
						Выйти
					</button>

					<button className="flex items-center text-xl py-3 my-2 w-10/12 rounded-md mx-auto hover:bg-primary hover:text-white">
						<Image
							src={border_black}
							alt="error:("
							className="mx-2 opacity-100 transition-opacity duration-300 hover:opacity-0"
						/>
						<a href="/">Мои публикации</a>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Profile;
