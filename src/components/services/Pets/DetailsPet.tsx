import React, { useState } from "react";
import {
	Card,
	Group,
	Text,
	Menu,
	ActionIcon,
	Image,
	SimpleGrid,
	rem,
} from "@mantine/core";
import {
	IconDots,
	IconAdjustments,
	IconTrash,
	IconFlag,
} from "@tabler/icons-react";
import { Dialog, Transition } from "@headlessui/react";

import { Pet } from "@/utils/types";
import { useDeletePet } from "@/services/pets/deletePet";
import { useFetchUser } from "@/services/user/fetchUser";
import { useRouter } from "next/router";
import Link from "next/link";
import { GetServerSideProps } from "next";


type Props = {
	item: Pet;
};

const DetailsPet = ({ item }: Props) => {
	const [deletePet] = useDeletePet();
	const [currentUser] = useFetchUser();
	const router = useRouter();

	let [isOpen, setIsOpen] = useState(false);

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	function handleDelete() {
		deletePet(item);
		closeModal();
		router.push("/services/pets");
	}

	return (
		<>
			<Card withBorder shadow="sm" radius="md" className=" mx-auto my-8 w-1/2">
				<Card.Section withBorder inheritPadding py="xs">
					<Group position="apart">
						<Text weight={500}>{item.title}</Text>
						<Menu withinPortal position="bottom-end" shadow="sm">
							<Menu.Target>
								<ActionIcon>
									<IconDots size="1rem" />
								</ActionIcon>
							</Menu.Target>

							<Menu.Dropdown>
								{currentUser?.email === item.owner ? (
									<>
										<Link href={`/services/pets/edit/${item.id}`}>
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

				<Text mt="sm" color="dimmed" size="sm">
					Порода: {item.breed ? item.breed : ""}
				</Text>

				<Text mt="sm" color="dimmed" size="sm">
					{item.description ? item.description : ""}
				</Text>

				<Card.Section mt="sm">
					<Image
						src={
							item.image
								? item.image
								: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz2K5q7DJQGNgm-poDK57z2nK0jZJR-r1KYw&usqp=CAU"
						}
						height={350}
						alt="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz2K5q7DJQGNgm-poDK57z2nK0jZJR-r1KYw&usqp=CAU"
					/>
				</Card.Section>
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
		</>
	);
};

export default DetailsPet;


