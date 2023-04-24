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
import elsom from '../../../../public/elsom.png';
import odengi from '../../../../public/odengi.png';
import mbank from '../../../../public/mbank.png';
import optima from '../../../../public/optima.png';
import balance from '../../../../public/balance.png';
import Image from "next/image";
import styles from './styles/addCommStyles.module.css';

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
		<div className="w-full">
			<FocusTrap active>
				<form onSubmit={form.onSubmit(handleSubmit)} >
					<Title ta="center" fw={700} my="30px">Подать рекламу</Title>
					<TextInput
						withAsterisk
						{...form.getInputProps("title")}
						label="Имя, Фамилия или название компании"
						variant="filled"
						my='sm'
					/>
					<TextInput
						withAsterisk
						{...form.getInputProps("category")}
						label="Категория"
						variant="filled"
						my='sm'
					/>
					<TextInput
						withAsterisk
						{...form.getInputProps("contact")}
						label="Контактный номер"
						variant="filled"
						my='sm'
					/>
					<TextInput
						withAsterisk
						{...form.getInputProps("address")}
						label="Адрес"
						variant="filled"
						my='sm'
					/>
					<TextInput
						withAsterisk
						{...form.getInputProps("description")}
						label="Содержание рекламы"
						variant="filled"
						my='sm'
					/>
					<TextInput
						withAsterisk
						{...form.getInputProps("social_net")}
						label="Ссылка на сайт или соцсеть"
						variant="filled"
						my='sm'

					/>
					<FileInput
						withAsterisk
						{...form.getInputProps("image")}
						label="Выберите файл"
						required
						variant="filled"
						my='sm'
					/>
					<Select
						withAsterisk
						label="Способ оплаты"
						data={[
							{ value: "Элсом", label: "Элсом" },
							{ value: "О! Деньги", label: "О! Деньги" },
							{ value: "МБанк", label: "МБанк" },
							{ value: "Оптима", label: "Оптима" },
							{ value: "Balance", label: "Beeline Balance" },
						]}
						variant="filled"
						my='sm'
					/>
					<div className="flex justify-center items-center my-5" style={{ backgroundColor: '#F1F3F5' }}>
						<Group position="apart" my="md" w='90%'>
							<Image src={elsom} alt='error :(' style={{ width: '70px' }} />
							<Image src={odengi} alt='error :(' style={{ width: '70px' }} />
							<Image src={mbank} alt='error :(' style={{ width: '60px' }} />
							<Image src={optima} alt='error :(' style={{ width: '70px' }} />
							<Image src={balance} alt='error :(' style={{ width: '70px' }} />
						</Group>
					</div>
					<Group position="right" mt="md">
						<button type="submit" className=' bg-yellowlogin w-full h-14 rounded-lg my-1'>Отправить</button>
					</Group>
				</form>
			</FocusTrap>
		</div>
	);
};

export default AddCommercialForm;
