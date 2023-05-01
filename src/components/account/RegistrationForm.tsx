import React from "react";
import z from "zod";
import { useForm, zodResolver } from "@mantine/form";
import {
	FocusTrap,
	TextInput,
	Group,
	Text,
	Title,
	PasswordInput,
} from "@mantine/core";
import Link from "next/link";
import { IconLock } from "@tabler/icons-react";
import styles from "./styles/regStyles.module.css";
import { useRouter } from "next/router";

export const kg = {
	title: "Каттоо",
	email: "Эл. почта",
	phone: "Телефон номуру",
	pass: "Сырсөз",
	pass2: "Подтвердите пароль",
	send: "Отправить",
	account: "У вас есть аккаунт?",
	login: "Войти",
};

export const ru = {
	title: "Регистрация",
	email: "Эл. почта",
	phone: "Номер телефона",
	pass: "Пароль",
	pass2: "Подтвердите пароль",
	send: "Отправить",
	account: "У вас есть аккаунт?",
	login: "Войти",
};

type Props = {
	onSubmit(values: RegistrationFormValues): void;
	defaultValues?: Partial<RegistrationFormValues>;
};

const registrationFormSchema = z
	.object({
		email: z
			.string()
			.nonempty("Это поле не может быть пустым!")
			.email("Неверный формат почты"),
		phone_number: z.string().nonempty("Это поле не может быть пустым"),
		password: z
			.string()
			.nonempty("Это поле не может быть пустым")
			.min(8, "Длина пароля не менее 8 символов"),
		password2: z.string().nonempty("Это поле не может быть пустым"),
	})
	.refine((val) => val.password === val.password2, {
		message: "Пароли не совпадают!",
		path: ["password2"],
	});

export type RegistrationFormValues = z.infer<typeof registrationFormSchema>;

const RegistrationForm = ({ onSubmit, defaultValues = {} }: Props) => {
	const form = useForm<RegistrationFormValues>({
		initialValues: {
			email: "",
			phone_number: "",
			password: "",
			password2: "",
			...defaultValues,
		},
		validate: zodResolver(registrationFormSchema),
	});

	const handleSubmit = (values: RegistrationFormValues) => {
		// console.log(values);

		onSubmit(values);
		form.reset();
	};

	return (
		<FocusTrap active>
			<div
				className={`${styles.main} bg-greybase rounded-3xl max-lg:w-3/4 max-xl:w-1/2 w-1/3`}
				style={{
					boxShadow:
						"inset -4px 0px 4px rgba(117, 117, 117, 0.1), inset 4px 0px 4px rgba(117, 117, 117, 0.1), inset 0px -4px 4px rgba(117, 117, 117, 0.1), inset 0px 4px 4px rgba(117, 117, 117, 0.1)",
				}}
			>
				<form
					onSubmit={form.onSubmit(handleSubmit)}
					className="w-4/5 mx-auto my-5 "
				>
					<Title ta="center" fw={700} my="40px" className={styles.title}>
						Регистрация
					</Title>
					<TextInput
						className={`${styles.inputs} border-b`}
						variant="unstyled"
						size="lg"
						my="10px"
						withAsterisk
						placeholder="Эл. почта"
						{...form.getInputProps("email")}
					/>
					<TextInput
						className={`${styles.inputs} border-b`}
						variant="unstyled"
						size="lg"
						my="10px"
						withAsterisk
						placeholder="Номер телефона"
						{...form.getInputProps("phone_number")}
					/>
					<PasswordInput
						className={`${styles.inputs} border-b placeholder-blackplaceholder`}
						variant="unstyled"
						size="lg"
						my="10px"
						withAsterisk
						placeholder="Пароль"
						{...form.getInputProps("password")}
						icon={<IconLock size={16} />}
					/>
					<PasswordInput
						className={`${styles.inputs} border-b placeholder-blackplaceholder`}
						variant="unstyled"
						size="lg"
						my="10px"
						withAsterisk
						placeholder="Подтвердите пароль"
						{...form.getInputProps("password2")}
						icon={<IconLock size={16} />}
					/>
					{/* <input type="text" className="border-b placeholder-red-500" placeholder='TEST' /> */}
					<button
						type="submit"
						className=" bg-yellowlogin w-full h-14 rounded-3xl my-10"
					>
						Отправить
					</button>
					<Group position="center" mb="40px">
						<Text c="dimmed" fz="lg">
							У вас есть аккаунт?{" "}
							<Link href="/account/login/" className=" text-blue-500">
								Войти
							</Link>
						</Text>
						{/* <Button variant="subtle" p="0">Войти</Button> */}
					</Group>
				</form>
			</div>
		</FocusTrap>
	);
};

export default RegistrationForm;
