import React, { useState } from "react";
import { useFetchUser } from "@/services/user/fetchUser";
import { useLogout } from "@/services/user/logout";
import Link from "next/link";
import { Avatar, Text, Group } from "@mantine/core";
import Image from "next/image";
import person_black from "../../../public/person_black.png";
import person_white from "../../../public/person_white.png";
import border_black from "../../../public/border_black.png";
import border_white from "../../../public/border_white.png";
import logout_black from "../../../public/logout_black.png";
import edit_white from "../../../public/edit_white.png";
import logout_white from "../../../public/logout_white.png";
import edit_black from "../../../public/edit_black.png";
import lock_black from "../../../public/lock_black.png";
import lock_white from "../../../public/lock_white.png";

const Profile = () => {
	const [currentUser, { isLoading, isError }] = useFetchUser();
	const logout = useLogout();

	const [hover, setHover] = useState(false);
	const [hover1, setHover1] = useState(false);
	const [hover2, setHover2] = useState(false);
	const [hover3, setHover3] = useState(false);
	const [hover4, setHover4] = useState(false);

	if (isLoading) return <h1>Loading ...</h1>;
	if (isError) return <h1>Something wrong!!</h1>;
	if (!currentUser) return <h1>Not Found</h1>; //чтобы тайпскрипт знал, что нужно остановиться и null не будет

	return (
		<div className="flex m-10 w-1/4">
			<div className="flex justify-start items-center flex-col w-full py-5 border-primary border-r">
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

				<div className="w-4/5 mx-auto flex justify-center items-start flex-col">
					<button
						className="flex items-center text-xl py-3 my-2 w-10/12 rounded-md mx-auto hover:bg-primary  hover:text-white"
						onMouseEnter={() => setHover(true)}
						onMouseLeave={() => setHover(false)}
					>
						{hover ? (
							<Image src={person_white} alt="error:(" className="mx-2" />
						) : (
							<Image src={person_black} alt="error:(" className="mx-2" />
						)}
						<Link href="/account">Профиль</Link>
					</button>
					<button
						className="flex items-center text-xl py-3 my-2 w-10/12 rounded-md mx-auto hover:bg-primary  hover:text-white"
						onMouseEnter={() => setHover1(true)}
						onMouseLeave={() => setHover1(false)}
					>
						{/* <IconPencil /> */}
						{hover1 ? (
							<Image src={edit_white} alt="error:(" className="mx-2" />
						) : (
							<Image src={edit_black} alt="error:(" className="mx-2" />
						)}
						<Link href="/account">Изменить данные</Link>
					</button>
					<button
						className="flex items-center text-xl py-3 my-2 rounded-md w-10/12 mx-auto hover:bg-primary  hover:text-white"
						onMouseEnter={() => setHover2(true)}
						onMouseLeave={() => setHover2(false)}
					>
						{hover2 ? (
							<Image src={lock_white} alt="error:(" className="mx-2" />
						) : (
							<Image src={lock_black} alt="error:(" className="mx-2" />
						)}
						<Link href="/account/change_password">Изменить пароль</Link>
					</button>
					<button
						className="flex items-center text-xl py-3  my-2 w-10/12 rounded-md mx-auto hover:bg-primary  hover:text-white"
						onMouseEnter={() => setHover3(true)}
						onMouseLeave={() => setHover3(false)}
					>
						{hover3 ? (
							<Image src={border_white} alt="error:(" className="mx-2" />
						) : (
							<Image src={border_black} alt="error:(" className="mx-2" />
						)}
						<Link href="/account/collection">Мои публикации</Link>
					</button>
					{/* Надо будет поменять путь на его публикации */}

					<button
						className="flex items-center text-xl  py-3 my-3 w-10/12 rounded-md mx-auto hover:bg-primary  hover:text-white"
						onMouseEnter={() => setHover4(true)}
						onMouseLeave={() => setHover4(false)}
						onClick={logout}
					>
						{hover4 ? (
							<Image src={logout_white} alt="error:(" className="mx-2" />
						) : (
							<Image src={logout_black} alt="error:(" className="mx-2" />
						)}
						Выйти
					</button>
				</div>
			</div>
		</div>
	);
};

export default Profile;
