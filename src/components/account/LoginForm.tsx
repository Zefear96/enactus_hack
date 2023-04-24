import React from 'react';
import z from 'zod';
import { useForm, zodResolver } from "@mantine/form";
import { FocusTrap, TextInput, Group, Text, PasswordInput, Title } from "@mantine/core";
import { IconLock } from '@tabler/icons-react';
import Link from 'next/link';
import styles from './styles/logStyles.module.css'

type Props = {
    onSubmit(values: LoginFormValues): void;
    defaultValues?: Partial<LoginFormValues>;
}

const loginFormSchema = z.object({
    phone_number: z.string().nonempty("Это поле не может быть пустым"),
    password: z.string().nonempty("Это поле не может быть пустым!").min(8, "Длина пароля не менее 8 символов"),
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
            <div className={`${styles.main} bg-greybase w-2/5 rounded-3xl`} style={{ boxShadow: 'inset -4px 0px 4px rgba(117, 117, 117, 0.1), inset 4px 0px 4px rgba(117, 117, 117, 0.1), inset 0px -4px 4px rgba(117, 117, 117, 0.1), inset 0px 4px 4px rgba(117, 117, 117, 0.1)' }}>
                <form onSubmit={form.onSubmit(handleSubmit)} className="w-4/5 mx-auto my-5">
                    <Title ta="center" fw={700} my="40px">Войти</Title>
                    <TextInput
                        className="border-b"
                        variant="unstyled"
                        size="lg"
                        my="10px"
                        withAsterisk
                        placeholder="Номер телефона"
                        {...form.getInputProps('phone_number')}
                    />
                    <PasswordInput
                        className=" placeholder-blackplaceholder border-b"
                        variant="unstyled"
                        size="lg"
                        my="10px"
                        withAsterisk
                        placeholder="Пароль"
                        {...form.getInputProps('password')}
                        icon={<IconLock size={16} />}
                    />
                    <button type="submit" className=' bg-yellowlogin w-full h-14 rounded-3xl my-10'>Войти</button>
                    <Group position="center" mb="40px">
                        <Text c="dimmed" fz="lg" className={styles.texts}>Нет еще аккаунта? <Link href="/account/registration/" className=' text-blue-500' >Создать аккаунт</Link> </Text>
                        <Link href="/account/resetpassword/" className=' text-blue-500' >Забыли пароль?</Link>
                    </Group>
                </form>
            </div>
        </FocusTrap>
    )
}

export default LoginForm

//ToDo Запомнить меня