import React from "react";
import z, { object } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import {
	FocusTrap,
	TextInput,
	Group,
	Button,
	Select,
	FileInput,
	Title

} from "@mantine/core";

type Props = {
	onSubmit(values: CommercialFormValues): void;
	defaultValues?: Partial<CommercialFormValues>;
};

const commercialFormSchema = z.object({
	title: z.string().nonempty("Это поле не может быть пустым!"),
	category: z.string().nonempty("Это поле не может быть пустым"),
	description: z.string().nonempty("Это поле не может быть пустым"),
	address: z.string().nonempty("Это поле не может быть пустым"),
	contact: z.string().nonempty("Это поле не может быть пустым"),
	social_net: z.string().nonempty("Это поле не может быть пустым"),
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

})

export type CommercialFormValues = z.infer<typeof commercialFormSchema>;

const AddCommercialForm = ({ onSubmit, defaultValues = {} }: Props) => {
	const form = useForm<CommercialFormValues>({
		initialValues: {
			title: "",
			category: "",
			description: "",
			address: "",
			contact: "",
			social_net: "",
			image: null,
			...defaultValues
		},
		validate: zodResolver(commercialFormSchema),
		transformValues: (values) => commercialFormSchema.parse(values),

	});

	const handleSubmit = (values: CommercialFormValues) => {
		console.log(values);

		onSubmit(values);
		form.reset();
	};

	return (
		<div>
			<FocusTrap active>
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<Title ta="center" fw={700} my="30px">Подать рекламу</Title>
					<TextInput
						withAsterisk
						placeholder="Имя, Фамилия или название компании"
						{...form.getInputProps("title")}
						label="Имя, Фамилия или название компании"
					/>
					<TextInput
						withAsterisk
						placeholder="Категория"
						{...form.getInputProps("category")}
						label="Категория"
					/>
					<TextInput
						withAsterisk
						placeholder="Эл. почта или номер телефона"
						{...form.getInputProps("contact")}
						label="Эл. почта или номер телефона"
					/>
					<TextInput
						withAsterisk
						placeholder="Адрес"
						{...form.getInputProps("address")}
						label="Адрес"
					/>
					<TextInput
						withAsterisk
						placeholder="Содержание рекламы"
						{...form.getInputProps("description")}
						label="Содержание рекламы"
					/>
					<TextInput
						withAsterisk
						placeholder="Ссылка на сайт"
						{...form.getInputProps("social_net")}
						label="Ссылка на сайт"
					/>
					<FileInput
						withAsterisk
						placeholder="Выберите файл"
						{...form.getInputProps("image")}
						label="Выберите файл"
						required
					/>
					<Select
						withAsterisk
						label="Способ оплаты"
						placeholder="Способ оплаты"
						data={[
							{ value: "Элсом", label: "Элсом" },
							{ value: "О! Деньги", label: "О! Деньги" },
							{ value: "МБанк", label: "МБанк" },
							{ value: "Оптима", label: "Оптима" },
							{ value: "Balance", label: "Beeline Balance" },
						]}
					/>

					<Group position="right" mt="md">
						<Button type="submit">Отправить</Button>
					</Group>
				</form>
			</FocusTrap>
		</div>
	);
};

export default AddCommercialForm;
