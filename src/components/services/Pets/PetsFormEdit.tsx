import React from "react";
import z from "zod";
import { useForm, zodResolver } from "@mantine/form";
import {
	FocusTrap,
	TextInput,
	Group,
	Button,
	Select,
	FileInput,
} from "@mantine/core";
import Image from "next/image";

type Props = {
	onSubmit(values: PetsFormValues): void;
	defaultValues?: Partial<PetsFormValues>;
	// imageUrl?: string;
};

const createPetFormSchema = z.object({
	title: z.string().nonempty("Это поле не может быть пустым!"),
	breed: z.string(),
	image: z
		.union([
			z.string().url().optional(),
			(typeof window !== "undefined" ? z.instanceof(File) : z.any())
				.refine((file) => {
					if (!file) {
						// If no file is uploaded, skip validation
						return true;
					}
					const validTypes = ["image/jpeg", "image/png", "image/gif"];
					if (!validTypes.includes(file.type)) {
						throw new Error(
							"Неверный формат файла! Пожалуйста, загрузите файл в формате JPEG, PNG или GIF.",
						);
					}
					const maxSize = 15000000; // 15mb
					if (file.size > maxSize) {
						throw new Error(
							"Максимальный размер файла 15 MB. Пожалуйста, загрузите файл меньшего размера.",
						);
					}
					return true;
				})
				.nullable()
				.optional(),
		])
		.optional(),
	description: z.string(),
	category: z.preprocess((val) => {
		if (typeof val === "number") return val;
		if (typeof val === "string") return parseInt(val);
		return null;
	}, z.number().finite()),
});

export type PetsFormValues = z.infer<typeof createPetFormSchema>;

const PetsFormEdit = ({ onSubmit, defaultValues = {} }: Props) => {
	const form = useForm<PetsFormValues>({
		initialValues: {
			title: "",
			breed: "",
			image: null,
			description: "",
			category: 0,
			...defaultValues,
		},

		validate: zodResolver(createPetFormSchema),
		transformValues: (values) => createPetFormSchema.parse(values),
	});

	const handleSubmit = (values: PetsFormValues) => {
		typeof values.image === "string" ? (values.image = null) : null;

		console.log(values, "worked editpetform");
		onSubmit(values);
		form.reset();
	};

	return (
		<div className=" my-10">
			<FocusTrap active>
				<form className=" w-1/3 mx-auto" onSubmit={form.onSubmit(handleSubmit)}>
					<Select
						withAsterisk
						label="Категория : собака / кошка "
						placeholder="Выберите категорию"
						data={[
							{ value: "1", label: "Птицы" },
							{ value: "2", label: "Собаки" },
							{ value: "3", label: "Кошки" },
							{ value: "4", label: "Рыбки" },
							{ value: "5", label: "Насекомые" },
							{ value: "6", label: "Рептилии" },
						]}
						{...form.getInputProps("category")}
					/>
					<TextInput
						withAsterisk
						placeholder="Заголовок"
						{...form.getInputProps("title")}
						label="Заголовок"
					/>
					<TextInput
						placeholder="Порода"
						{...form.getInputProps("breed")}
						label="Порода"
					/>
					<Image
						src={form.values.image}
						alt="error:("
						width={200}
						height={200}
						className=" mx-auto"
					/>

					<FileInput
						// withAsterisk
						placeholder="Выберите файл"
						{...form.getInputProps("image")}
						label="Выберите файл"
						// required
					/>
					<TextInput
						placeholder="Описание"
						{...form.getInputProps("description")}
						label="Описание"
					/>
					{/* <NumberInput
						withAsterisk
						placeholder="Цена"
						{...form.getInputProps("price")}
						label="Цена"
						type="number"
					/> */}

					<Group position="right" mt="md">
						<button
							type="submit"
							className=" bg-yellowlogin rounded-lg w-full h-10 text-bluelogin"
						>
							Отправить
						</button>
					</Group>
				</form>
			</FocusTrap>
		</div>
	);
};

export default PetsFormEdit;
