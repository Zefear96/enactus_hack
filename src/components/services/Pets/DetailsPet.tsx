import React, { useState } from "react";
import {
	Card,
	Group,
	Text,
	Menu,
	ActionIcon,
	rem,
	Accordion,
	useMantineTheme,
	createStyles,
	TextInput,
	Loader,
} from "@mantine/core";
import {
	IconDots,
	IconAdjustments,
	IconTrash,
	IconFlag,
	IconMessage,
	IconSend,
	IconHeart,
} from "@tabler/icons-react";
import { Dialog, Transition } from "@headlessui/react";

import { Pet } from "@/utils/types";
import { useDeletePet } from "@/services/pets/deletePet";
import { useFetchUser } from "@/services/user/fetchUser";
import { useRouter } from "next/router";
import Link from "next/link";
import { useCreateComment } from "@/services/pets/comments/createComment";
import CommentItem from "./Comments/CommentItem";
import { useFetchCategories } from "@/services/pets/fetchCategories";
import { toggleFav } from "@/store/slices/fav.slice";
import { useAppDispatch, useIsInFav } from "@/store/hooks";

import Image from "next/image";
import phone_blue from "../../../../public/phone_blue.png";
import address_blue from "../../../../public/address_blue.png";
import arrow_back from "../../../../public/arrow_back.png";
import styles from "./styles/DetailsPet.module.css";

type Props = {
	pet: Pet;
};

type OneComment = {
	body: string;
	post: number;
};

const useStyles = createStyles((theme) => ({
	body: {
		paddingLeft: rem(54),
		paddingTop: theme.spacing.sm,
		fontSize: theme.fontSizes.sm,
	},
	comment: {
		padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
	},
}));

const DetailsPet = ({ pet }: Props) => {
	const [deletePet] = useDeletePet();
	const [currentUser] = useFetchUser();
	const [categories] = useFetchCategories();
	const [loading, setLoading] = useState(true);

	const isInFav = useIsInFav(pet.id);

	const router = useRouter();
	const dispatch = useAppDispatch();

	const [oneComment, setOneComment] = useState<OneComment>({
		body: "",
		post: pet.id,
	});
	console.log(pet);

	const [createComment] = useCreateComment();

	let [isOpen, setIsOpen] = useState(false);
	const theme = useMantineTheme();
	const getColor = (color: string) =>
		theme.colors[color][theme.colorScheme === "dark" ? 5 : 7];
	const { classes } = useStyles();

	function addTofavList() {
		dispatch(toggleFav(pet));
	}

	const sendComment = () => {
		console.log(oneComment);

		createComment(oneComment);
		setOneComment({
			...oneComment,
			body: "",
		});
	};

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.currentTarget.value);
		setOneComment({
			...oneComment,
			body: e.currentTarget.value,
		});
	};
	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			// 👇 Get input value
			sendComment();
		}
	};

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	function handleDelete() {
		deletePet(pet);
		closeModal();
		router.push("/account/collection");
	}

	// console.log(item.comments);

	return (
		<div className="flex max-w-screen-xl mx-auto my-14 flex-wrap max-sm:w-11/12">
			<button className=" mx-5" onClick={() => router.back()}>
				<Image src={arrow_back} alt="error" />
			</button>
			<div className="flex max-w-screen-xl mx-auto my-10 flex-wrap justify-center max-sm:flex-col">
				<div className=" relative" style={{ width: "40%" }}>
					{loading && (
						<Loader
							color="violet"
							variant="dots"
							style={{ height: "300px", margin: "auto", scale: "1.5" }}
						/>
					)}

					<div className={styles.block_image_pet}>
						<Image
							src={pet.image}
							height={1000}
							width={1000}
							alt="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz2K5q7DJQGNgm-poDK57z2nK0jZJR-r1KYw&usqp=CAU"
							className={` ${styles.image_pet} shadow-neon border rounded-lg`}
							onLoad={() => setLoading(false)}
						/>
					</div>
				</div>
				<Card radius="md" className=" mx-10 w-1/2 max-sm:w-full max-sm:mx-0">
					<Card.Section withBorder inheritPadding py="xs">
						<Group position="apart">
							<Text weight={500}>
								<span
									style={{ color: "rgba(69, 38, 255, 1)", fontWeight: "bold" }}
								>
									{pet.title}
								</span>
							</Text>
							<Menu withinPortal position="bottom-end" shadow="sm">
								<div className=" flex">
									<ActionIcon onClick={addTofavList}>
										{isInFav ? (
											<IconHeart
												fill="#4526FF"
												className=" cursor-pointer"
												size={rem(30)}
											/>
										) : (
											<IconHeart
												className=" cursor-pointer"
												size={rem(30)}
												color="#4526FF"
											/>
										)}
									</ActionIcon>
									<Menu.Target>
										<ActionIcon className="mx-5">
											<IconDots size="2rem" />
										</ActionIcon>
									</Menu.Target>
								</div>

								<Menu.Dropdown>
									{currentUser?.email === pet.owner ? (
										<>
											<Link href={`/services/pets/edit/${pet.id}`}>
												<Menu.Item icon={<IconAdjustments size={rem(14)} />}>
													Редактировать
												</Menu.Item>
											</Link>

											<Menu.Item
												icon={<IconTrash size={rem(14)} />}
												color="red"
												onClick={openModal}
											>
												Удалить
											</Menu.Item>
										</>
									) : (
										<Menu.Item icon={<IconFlag size={rem(14)} />} color="red">
											Подать жалобу
										</Menu.Item>
									)}
								</Menu.Dropdown>
							</Menu>
						</Group>
					</Card.Section>

					<Text size="md" mt="md" c="black">
						<span style={{ color: "rgba(69, 38, 255, 1)", fontWeight: "bold" }}>
							Возраст:{" "}
						</span>
						{pet.age}
					</Text>
					<Text mt="md" color="dimmed" size="md" c="black">
						<span style={{ color: "rgba(69, 38, 255, 1)", fontWeight: "bold" }}>
							Категория животных:{" "}
						</span>
						{categories?.map((cat) =>
							cat.id === pet.category ? cat.title : "",
						)}
					</Text>
					<Text mt="md" color="dimmed" size="md" c="black">
						<span style={{ color: "rgba(69, 38, 255, 1)", fontWeight: "bold" }}>
							Порода:{" "}
						</span>
						{pet.breed}
					</Text>
					<Text mt="md" color="dimmed" size="md" c="black">
						<span style={{ color: "rgba(69, 38, 255, 1)", fontWeight: "bold" }}>
							Кличка:{" "}
						</span>
						{pet.pet_name}
					</Text>
					<Text mt="md" color="dimmed" size="md" c="black">
						<span style={{ color: "rgba(69, 38, 255, 1)", fontWeight: "bold" }}>
							Описание:{" "}
						</span>
						{pet.description}
					</Text>

					<Text
						mt="md"
						color="dimmed"
						size="md"
						className="flex items-center"
						c="black"
					>
						<Image src={address_blue} alt="error" className=" me-3 h-full" />
						{pet.address}
					</Text>
					<Text
						mt="md"
						color="dimmed"
						size="md"
						className="flex items-center"
						c="black"
					>
						<Image src={phone_blue} alt="error" className=" me-3 h-full" />
						{pet.contact}
					</Text>

					<Card.Section mt="sm"></Card.Section>
					<Accordion variant="contained" mt="md">
						<Accordion.Item value="comments">
							<Accordion.Control
								icon={
									<IconMessage size={rem(20)} color="rgba(69, 38, 255, 1)" />
								}
								style={{
									backgroundColor: "rgba(255, 212, 55, 1)",
									color: "rgba(69, 38, 255, 1)",
								}}
							>
								Оставить коментарии
							</Accordion.Control>
							<Accordion.Panel>
								{pet.comments.map((elem) => (
									<CommentItem key={elem.id} item={elem} />
								))}
								<div className="flex justify-between mt-3">
									<div className="w-11/12">
										<TextInput
											withAsterisk
											placeholder="Оставьте свой комментарий"
											onChange={handleOnChange}
											onKeyDown={handleKeyDown}
											value={oneComment.body}
											required
										/>
									</div>
									<ActionIcon onClick={sendComment}>
										<IconSend size={rem(20)} color="#988CE1" />
									</ActionIcon>
								</div>
							</Accordion.Panel>
						</Accordion.Item>
					</Accordion>
				</Card>

				{/* Modal */}
				<Transition appear show={isOpen}>
					<Dialog as="div" className="relative z-10" onClose={closeModal}>
						<Transition.Child
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="fixed inset-0 bg-black bg-opacity-25" />
						</Transition.Child>

						<div className="fixed inset-0 overflow-y-auto">
							<div className="flex min-h-full items-center justify-center p-4 text-center">
								<Transition.Child
									enter="ease-out duration-300"
									enterFrom="opacity-0 scale-95"
									enterTo="opacity-100 scale-100"
									leave="ease-in duration-200"
									leaveFrom="opacity-100 scale-100"
									leaveTo="opacity-0 scale-95"
								>
									<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
										<Dialog.Title
											as="h3"
											className="text-lg font-medium leading-6 text-gray-900"
										>
											Вы точно хотите удалить объявление?
										</Dialog.Title>

										<div className="mt-4 flex justify-around">
											<button
												type="button"
												className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 w-1/3"
												onClick={closeModal}
											>
												Нет
											</button>
											<button
												type="button"
												className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 w-1/3"
												onClick={handleDelete}
											>
												Да
											</button>
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</Dialog>
				</Transition>
			</div>
		</div>
	);
};

export default DetailsPet;
