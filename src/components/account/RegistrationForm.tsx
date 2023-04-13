import React from 'react';
import z from 'zod';
import { useForm, zodResolver } from "@mantine/form";
import { FocusTrap, TextInput, Group, Button, Text } from "@mantine/core";

type Props = {
    onSubmit(values: RegistrationFormValues): void;
    defaultValues?: Partial<RegistrationFormValues>;
}

const registrationFormSchema = z.object({
    email: z.string().min(1, "Это поле не может быть пустым!"),
    phone_number: z.string().min(1, "Это поле не может быть пустым"),
    password: z.string().min(1, "Это поле не может быть пустым!"),
    password2: z.string().min(1, "Это поле не может быть пустым!")
})
    .refine(val => val.password === val.password2, {
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
            ...defaultValues
        },
        validate: zodResolver(registrationFormSchema)
    });

    const handleSubmit = (values: RegistrationFormValues) => {
        onSubmit(values);
        form.reset();
    };

    return (
        <FocusTrap active>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    withAsterisk
                    placeholder="Эл. почта"
                    {...form.getInputProps('email')}
                />
                <TextInput
                    withAsterisk
                    placeholder="Номер телефона"
                    {...form.getInputProps('phoneNumber')}
                />
                <TextInput
                    withAsterisk
                    placeholder="Пароль"
                    {...form.getInputProps('password')}
                />
                <TextInput
                    withAsterisk
                    placeholder="Подтверждение пароля"
                    {...form.getInputProps('password2')}
                />
                <Group position="right" mt="md">
                    <Button type="submit">Отправить</Button>
                </Group>
                <Group>
                    <Text>У вас есть аккаунт? </Text>
                    <Button variant="subtle">Войти</Button>
                </Group>
            </form>
        </FocusTrap>
    )
}

export default RegistrationForm