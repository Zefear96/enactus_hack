import React from "react";
import z from "zod";
import { useForm, zodResolver } from "@mantine/form";
import {
	FocusTrap,
	TextInput,
	Group,
	Button,
	Text,
	Select,
} from "@mantine/core";

const AddServicesForm = () => {
	// const [registerUser] = useRegisterUser();
	// const handleSubmit = (data: RegistrationFormValues) => {
	// 	console.log(data);

	// 	registerUser(data);
	// };

	// const form = useForm<RegistrationFormValues>({
	// 	initialValues: {
	// 		email: "",
	// 		phone_number: "",
	// 		password: "",
	// 		password2: "",
	// 		...defaultValues,
	// 	},
	// 	validate: zodResolver(registrationFormSchema),
	// });

	// const handleSubmit = (values: RegistrationFormValues) => {
	// 	console.log(values);

	// 	onSubmit(values);
	// 	form.reset();
	// };

	return (
		<div>
			AddServicesForm
			<FocusTrap active>
				<form>
					<Select
						withAsterisk
						label="Категория : собака / кошка "
						placeholder="Выберите категорию"
						data={[
							{ value: "react", label: "React" },
							{ value: "ng", label: "Angular" },
							{ value: "svelte", label: "Svelte" },
							{ value: "vue", label: "Vue" },
						]}
					/>
					<TextInput
						withAsterisk
						placeholder="Порода"
						// {...form.getInputProps("phone_number")}
						label="Порода"
					/>
					<TextInput
						withAsterisk
						placeholder="Возраст"
						// {...form.getInputProps("phone_number")}
						label="Возраст"
					/>
					<TextInput
						withAsterisk
						placeholder="Фото/видео"
						// {...form.getInputProps("phone_number")}
						label="Фото/видео"
					/>
					<TextInput
						withAsterisk
						placeholder="Особые приметы"
						// {...form.getInputProps("phone_number")}
						label="Особые приметы"
					/>
					<TextInput
						withAsterisk
						placeholder="Характер"
						// {...form.getInputProps("phone_number")}
						label="Характер"
					/>
					<TextInput
						withAsterisk
						placeholder="Цена"
						// {...form.getInputProps("phone_number")}
						label="Цена"
					/>

					<TextInput
						withAsterisk
						placeholder="Контактные данные"
						// {...form.getInputProps("phone_number")}
						label="Контактные данные"
					/>

					<Group position="right" mt="md">
						<Button type="submit">Отправить</Button>
					</Group>
				</form>
			</FocusTrap>
		</div>
	);
};

export default AddServicesForm;
