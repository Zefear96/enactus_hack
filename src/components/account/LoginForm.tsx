import React from 'react';
import z from 'zod';
import { useForm, zodResolver } from "@mantine/form";
import { FocusTrap, TextInput, Group, Button, Text } from "@mantine/core";

type Props = {
    onSubmit(values: LoginFormValues): void;
    defaultValues?: Partial<LoginFormValues>;
}

const loginFormSchema = z.object({
    phone_number: z.string().min(1, "Это поле не может быть пустым"),
    password: z.string().min(1, "Это поле не может быть пустым!"),
})

export type LoginFormValues = z.infer<typeof loginFormSchema>;

const LoginForm = ({ onSubmit, defaultValues = {} }: Props) => {
    const form = useForm<LoginFormValues>({
        initialValues: {
            phone_number: "",
            password: "",
            ...defaultValues
        },
        validate: zodResolver(loginFormSchema)
    });

    const handleSubmit = (values: LoginFormValues) => {
        onSubmit(values);
        form.reset();
    };

    return (
        <FocusTrap active>
            <form onSubmit={form.onSubmit(handleSubmit)}>
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
                <Group position="right" mt="md">
                    <Button type="submit">Отправить</Button>
                </Group>
                <Group>
                    <Text>Нет еще аккаунта? </Text>
                    <Button variant="subtle">Создать аккаунт</Button>
                </Group>
            </form>
        </FocusTrap>
    )
}

export default LoginForm

//ToDo Запомнить меня