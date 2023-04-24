import React from 'react';
import { Group, Text, Title, TextInput, FocusTrap, Loader } from "@mantine/core";
import Link from 'next/link';
import { emailsend, useResetPassword } from '@/services/user/resetPass';
import z from 'zod';
import { useForm, zodResolver } from "@mantine/form";
import styles from './styles/resetPassStyles.module.css';

type Props = {
    defaultValues?: Partial<ResetPassFormValues>;
}

const resetPassFormSchema = z.object({
    email: z.string().nonempty("Это поле не может быть пустым!").email(),
})

export type ResetPassFormValues = z.infer<typeof resetPassFormSchema>;

const ResetPassword = ({ defaultValues = {} }: Props) => {
    const form = useForm<ResetPassFormValues>(
        {
            initialValues: {
                email: "",
                ...defaultValues
            },
            validate: zodResolver(resetPassFormSchema)
        }

    );

    const [resetPassword, { isLoading, isError }] = useResetPassword();

    const handleSubmit = (values: ResetPassFormValues) => {

        console.log(values);
        resetPassword(values);
        // form.reset();
    };

    if (isLoading) return <Loader color="violet" />;;
    if (isError) return <h1>Something wrong!!</h1>;
    if (!resetPassword) return <h1 style={{ textAlign: 'center' }}>Not found!</h1>

    return (
        <div className='flex justify-center items-center m-auto my-10'>
            <div className={`${styles.main} bg-greybase w-2/5 rounded-3xl`} style={{ boxShadow: 'inset -4px 0px 4px rgba(117, 117, 117, 0.1), inset 4px 0px 4px rgba(117, 117, 117, 0.1), inset 0px -4px 4px rgba(117, 117, 117, 0.1), inset 0px 4px 4px rgba(117, 117, 117, 0.1)' }}>
                <FocusTrap active>
                    <form onSubmit={form.onSubmit(handleSubmit)}>

                        <div className="w-4/5 mx-auto my-5">
                            <Title ta="center" fw={700} my="40px" className={styles.title}>Сброс пароля</Title>
                            <Text ta="center" fw={500} fz="lg" my="50px" className={styles.text}>Введите вашу электронную почту,
                                и мы вам отправим инструкцию по
                                восстановлению пароля.</Text>
                            <TextInput
                                className="border-b"
                                variant="unstyled"
                                size="lg"
                                my="10px"
                                withAsterisk
                                placeholder="Эл. почта"
                                {...form.getInputProps('email')}
                            />
                            {emailsend ?
                                <div className='border-r border-l border-red-400 h-20 flex justify-center items-center '>
                                    <Text c="dimmed" ta='center'>На вашу почту было отправлено письмо
                                        с инструкцией.
                                        Перейдите, чтобы ввести код <Link href="/account/resetpassComplete/" className=' text-blue-500'>по этой ссылке</Link></Text>
                                </div>

                                : <button type="submit" className=' bg-yellowlogin w-full h-14 rounded-3xl my-10'
                                >Сбросить пароль</button>}

                            <Group position="center" mb="40px">
                                <Text c="dimmed" fz="lg">Вспомнили пароль? <Link href="/account/login/" className=' text-blue-500' >Войти</Link> </Text>
                            </Group>
                        </div>
                    </form>
                </FocusTrap>

            </div>
        </div>
    )
}

export default ResetPassword