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

const AddCommercialForm = () => {
	return (
		<div>
			AddCommercialForm
			<FocusTrap active>
				<form>
					<TextInput
						withAsterisk
						placeholder="Имя Фамилия или название компании"
						// {...form.getInputProps("phone_number")}
						label="Имя Фамилия или название компании"
					/>
					<TextInput
						withAsterisk
						placeholder="Эл. почта или номер телефона"
						// {...form.getInputProps("phone_number")}
						label="Эл. почта или номер телефона"
					/>
					<TextInput
						withAsterisk
						placeholder="Адрес"
						// {...form.getInputProps("phone_number")}
						label="Адрес"
					/>
					<TextInput
						withAsterisk
						placeholder="Содержание рекламы"
						// {...form.getInputProps("phone_number")}
						label="Содержание рекламы"
					/>
					<Select
						withAsterisk
						label="Способ оплаты"
						placeholder="Способ оплаты"
						data={[
							{ value: "react", label: "React" },
							{ value: "ng", label: "Angular" },
							{ value: "svelte", label: "Svelte" },
							{ value: "vue", label: "Vue" },
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
