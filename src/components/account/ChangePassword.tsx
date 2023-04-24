import React from 'react';
import { useForm, zodResolver } from "@mantine/form";
import z from 'zod';
import { Title, TextInput, FocusTrap, Loader, PasswordInput, Group, } from "@mantine/core";
import { IconLock } from '@tabler/icons-react';
import { useChangePassword } from '@/services/user/changePass';
import { useRouter } from "next/router";
import Link from 'next/link';
import styles from './styles/changePassStyles.module.css';

type Props = {
    defaultValues?: Partial<ChangePassFormValues>
};

const changePassFormSchema = z.object({
    old_password: z.string().nonempty("Это поле не может быть пустым!"),
    new_password: z.string().nonempty("Это поле не может быть пустым!").min(8, 'Длина пароля не менее 8 символов')
});

export type ChangePassFormValues = z.infer<typeof changePassFormSchema>

const ChangePassword = ({ defaultValues = {} }: Props) => {
    const router = useRouter();

    const form = useForm<ChangePassFormValues>(
        {
            initialValues: {
                old_password: '',
                new_password: '',
                ...defaultValues
            },
            validate: zodResolver(changePassFormSchema)
        }
    );

    const [changePassword, { isLoading, isError, isSuccess }] = useChangePassword();

    const handleSubmit = (values: ChangePassFormValues) => {
        console.log(values, 'changepass');
        changePassword(values);
        form.reset()
    };

    if (isLoading) return <Loader color="violet" />;
    if (isError) return <h1>Something wrong!!</h1>;
    if (!changePassword) return <h1 style={{ textAlign: 'center' }}>Not found!</h1>
    if (isSuccess) {
        router.push('/account/')
    }

    return (
        <div className='flex justify-center items-center m-auto my-10'>
            <div className={`${styles.main} bg-greybase w-2/5 rounded-3xl`} style={{ boxShadow: 'inset -4px 0px 4px rgba(117, 117, 117, 0.1), inset 4px 0px 4px rgba(117, 117, 117, 0.1), inset 0px -4px 4px rgba(117, 117, 117, 0.1), inset 0px 4px 4px rgba(117, 117, 117, 0.1)' }}>
                <FocusTrap active>
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <div className="w-4/5 mx-auto my-5">
                            <Title ta="center" fw={700} my="40px">Изменить пароль</Title>
                            <PasswordInput
                                className=" placeholder-blackplaceholder border-b"
                                variant="unstyled"
                                size="lg"
                                my="10px"
                                withAsterisk
                                placeholder="Старый пароль"
                                {...form.getInputProps('old_password')}
                                icon={<IconLock size={16} />}
                            />
                            <PasswordInput
                                className="border-b placeholder-blackplaceholder"
                                variant="unstyled"
                                size="lg"
                                my="10px"
                                withAsterisk
                                placeholder="Новый пароль"
                                {...form.getInputProps('new_password')}
                                icon={<IconLock size={16} />}

                            />
                            <button type="submit" className=' bg-yellowlogin w-full h-14 rounded-3xl my-10'
                            >Изменить</button>
                            <Group position="center" mb="40px">
                                <Link href="/account/resetpassword/" className=' text-blue-500' >Забыли пароль?</Link>
                            </Group>
                        </div>
                    </form>
                </FocusTrap>
            </div>
        </div>
    )
}

export default ChangePassword