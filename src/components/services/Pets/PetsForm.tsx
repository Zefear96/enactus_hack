import React from "react";
import z, { object } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import {
	FocusTrap,
	TextInput,
	Group,
	Button,
	Text,
	Select,
	NumberInput,
	FileInput,
} from "@mantine/core";
import { useCreatePet } from "@/services/pets/createPet";
import { Pet } from "@/utils/types";

type Props = {
	onSubmit(values: PetsFormValues): void;
	defaultValues?: Partial<PetsFormValues>;
	// imageUrl?: string;
};

const createPetFormSchema = z.object({
	title: z.string().nonempty("Это поле не может быть пустым!"),
	breed: z.string(),
	image: (typeof window !== "undefined" ? z.instanceof(File) : z.any())
		.refine((file) => {
			if (!file || !(file instanceof File)) {
				// If no file is uploaded, skip validation
				return true;
			}
			const validTypes = ["image/jpeg", "image/png", "image/gif"];
			if (!validTypes.includes(file.type)) {
				throw new Error(
					"Неверный формат файла! Пожалуйста, загрузите файл в формате JPEG, PNG или GIF.",
				);
			}
			const maxSize = 500000; // 500 KB
			if (file.size > maxSize) {
				throw new Error(
					"Максимальный размер файла 500 KB. Пожалуйста, загрузите файл меньшего размера.",
				);
			}
			return true;
		})
		.nullable()
		.optional(),
	description: z.string(),
	price: z.number(),
	category: z.preprocess((val) => {
		if (typeof val === "number") return val;
		if (typeof val === "string") return parseInt(val);
		return null;
	}, z.number().finite()),
});

export type PetsFormValues = z.infer<typeof createPetFormSchema>;

const PetsForm = ({ onSubmit, defaultValues = {} }: Props) => {
	const [createPet] = useCreatePet();

	const form = useForm<PetsFormValues>({
		initialValues: {
			title: "",
			breed: "",
			image: null,
			description: "",
			price: 0,
			category: 0,
			...defaultValues,
		},

		validate: zodResolver(createPetFormSchema),
		transformValues: (values) => createPetFormSchema.parse(values),
	});

	const handleSubmit = (values: PetsFormValues) => {
		// console.log(values);
		onSubmit(values);
		form.reset();
	};

	return (
		<div className=" my-10">
			<FocusTrap active>
				<form className=" w-1/4 mx-auto" onSubmit={form.onSubmit(handleSubmit)}>
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
						className="my-5"
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
					<img src={form.values.image} alt="error:(" width='100px' />
					<FileInput
						withAsterisk
						placeholder="Выберите файл"
						{...form.getInputProps("image")}
						label="Выберите файл"
						required
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
						<Button
							type="submit"
							style={{
								width: "100%",
								background: "#FFD437",
								color: "black",
								height: "50px",
							}}
						>
							Отправить
						</Button>
					</Group>
				</form>
			</FocusTrap>
		</div>
	);
};

export default PetsForm;
