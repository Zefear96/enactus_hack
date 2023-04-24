import React from 'react';
import { useForm, zodResolver } from "@mantine/form";
import z from 'zod';
import { Title, TextInput, FocusTrap, Loader, PasswordInput } from "@mantine/core";
import { useResetPassComplete } from '@/services/user/resetPassComplete';
import { IconLock } from '@tabler/icons-react';
import styles from './styles/resetPassStyles.module.css';

type Props = {
    defaultValues?: Partial<ResetPassCompleteFormValues>;
}

const resetPassComplFormSchema = z.object({
    password: z.string().nonempty("Это поле не может быть пустым").min(8, "Длина пароля не менее 8 символов"),
    password_confirm: z.string().nonempty("Это поле не может быть пустым"),
    code: z.string().nonempty("Это поле не может быть пустым")
});

export type ResetPassCompleteFormValues = z.infer<typeof resetPassComplFormSchema>

const ResetPassComplete = ({ defaultValues = {} }: Props) => {

    const form = useForm<ResetPassCompleteFormValues>(
        {
            initialValues: {
                password: '',
                password_confirm: '',
                code: '',
                ...defaultValues
            },
            validate: zodResolver(resetPassComplFormSchema)
        }
    );

    const [resetPassComplete, { isLoading, isError }] = useResetPassComplete();

    const handleSubmit = (values: ResetPassCompleteFormValues) => {
        console.log(values, 'passcomplete');
        resetPassComplete(values);
        form.reset();
    }


    if (isLoading) return <Loader color="violet" />;
    if (isError) return <h1>Something wrong!!</h1>;
    if (!resetPassComplete) return <h1 style={{ textAlign: 'center' }}>Not found!</h1>

    return (
        <div className='flex justify-center items-center m-auto my-10'>
            <div className={`${styles.main} bg-greybase w-2/5 rounded-3xl`} style={{ boxShadow: 'inset -4px 0px 4px rgba(117, 117, 117, 0.1), inset 4px 0px 4px rgba(117, 117, 117, 0.1), inset 0px -4px 4px rgba(117, 117, 117, 0.1), inset 0px 4px 4px rgba(117, 117, 117, 0.1)' }}>
                <FocusTrap active>
                    <form onSubmit={form.onSubmit(handleSubmit)}>

                        <div className="w-4/5 mx-auto my-5">
                            <Title ta="center" fw={700} my="40px" className={styles.title}>Новый пароль</Title>
                            <TextInput
                                className="border-b"
                                variant="unstyled"
                                size="lg"
                                my="10px"
                                withAsterisk
                                placeholder="Код"
                                {...form.getInputProps('code')}
                            />
                            <PasswordInput
                                className=" placeholder-blackplaceholder border-b"
                                variant="unstyled"
                                size="lg"
                                my="10px"
                                withAsterisk
                                placeholder="Новый пароль"
                                {...form.getInputProps('password')}
                                icon={<IconLock size={16} />}
                            />
                            <PasswordInput
                                className="border-b placeholder-blackplaceholder"
                                variant="unstyled"
                                size="lg"
                                my="10px"
                                withAsterisk
                                placeholder="Подтвердите новый пароль"
                                {...form.getInputProps('password_confirm')}
                                icon={<IconLock size={16} />}

                            />
                            <button type="submit" className=' bg-yellowlogin w-full h-14 rounded-3xl my-10'
                            >Создать пароль</button>
                        </div>
                    </form>
                </FocusTrap>
            </div>
        </div>
    )
}

export default ResetPassComplete