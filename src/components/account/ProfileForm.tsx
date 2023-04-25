import React, { useState } from 'react';
import z from 'zod';
import { useForm, zodResolver } from "@mantine/form";
import { FocusTrap, FileInput, TextInput, Group, Button, Text, Title, Avatar } from "@mantine/core";
import { IconPencil } from '@tabler/icons-react';
import { useFetchUser } from "@/services/user/fetchUser";
import styles from './styles/editProfileStyles.module.css'

type Props = {
    onSubmit(values: ProfileFormValues): void;
    defaultValues?: Partial<ProfileFormValues>;
}

const profileFormSchema = z.object({
    name: z.string().nonempty('Это поле не может быть пустым'),
    phone_number: z.string().nonempty("Это поле не может быть пустым"),
    email: z.string().nonempty("Это поле не может быть пустым!").email(),
    profile_image: z.union([
        z.string().url().optional(),
        (typeof window !== "undefined" ? z.instanceof(File) : z.any())
            .refine((file) => {
                if (!file) {
                    // If no file is uploaded, skip validation
                    return true;
                }
                const validTypes = ["image/jpeg", "image/png", "image/gif"];
                if (!validTypes.includes(file.type)) {
                    throw new Error(
                        "Неверный формат файла! Пожалуйста, загрузите файл в формате JPEG, PNG или GIF."
                    );
                }
                const maxSize = 15000000; // 15mb
                if (file.size > maxSize) {
                    throw new Error(
                        "Максимальный размер файла 15 MB. Пожалуйста, загрузите файл меньшего размера."
                    );
                }
                return true;
            })
            .nullable()
            .optional(),
    ]).optional(),
})

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

const ProfileForm = ({ onSubmit, defaultValues = {} }: Props) => {
    const form = useForm<ProfileFormValues>({
        initialValues: {
            name: "",
            phone_number: "",
            email: "",
            profile_image: null,
            ...defaultValues
        },
        validate: zodResolver(profileFormSchema),
        transformValues: (values) => profileFormSchema.parse(values),
    });

    const handleSubmit = (values: ProfileFormValues) => {
        console.log(values);
        typeof values.profile_image === 'string' ? values.profile_image = null : null

        console.log('editform worked');

        onSubmit(values);
        form.reset();
    };
    const [fileOpen, setFileOpen] = useState(false);

    return (
        <FocusTrap active>
            <form onSubmit={form.onSubmit(handleSubmit)} className="m-auto w-11/12">
                <Title ta="center" fw={700} my="40px" fz='30px' className={styles.title}>Изменить данные</Title>
                <div className="flex items-end justify-center my-10">
                    {/* <img
                        src={
                            form.values.profile_image ? form.values.profile_image : null
                        }
                        alt={form.values.name?.slice(0, 1)}
                        className="w-20 h-20 rounded-full" style={{ borderRadius: '50%', border: '1px solid #4526FF' }}
                    />
                    <IconPencil color='rgba(0, 0, 0, 0.6)' className='-ml-3' onClick={() => setFileOpen(true)} /> */}
                    {form.values.profile_image ?
                        <><Avatar src={form.values.profile_image} style={{ borderRadius: '50%', border: '1px solid #4526FF' }} size="xl" />   <IconPencil color='rgba(0, 0, 0, 0.6)' className='-ml-3' onClick={() => setFileOpen(true)} /></>
                        : form.values.name ?
                            <><Avatar src={null} color="primary" alt={form.values.name} style={{ borderRadius: '50%', border: '1px solid #4526FF' }} size="xl" /> <IconPencil color='rgba(0, 0, 0, 0.6)' className='-ml-3' onClick={() => setFileOpen(true)} /></>
                            : <><Avatar size="xl" style={{ borderRadius: '50%', border: '1px solid #4526FF' }} />  <IconPencil color='rgba(0, 0, 0, 0.6)' className='-ml-3' onClick={() => setFileOpen(true)} /></>}
                    {/* <Avatar size="xl" style={{ borderRadius: '50%', border: '1px solid #4526FF' }} /> */}
                </div>
                {fileOpen ? <FileInput
                    withAsterisk
                    {...form.getInputProps("profile_image")}
                    label="Выберите файл"
                    variant="filled"
                    my='lg'
                    size="md"
                    radius="md"
                /> : null}

                <TextInput
                    label="Имя"
                    {...form.getInputProps('name')}
                    variant="filled"
                    my='lg'
                    size="md"
                    radius="md"
                    rightSection={<IconPencil color='#4526FF' />}
                />
                <TextInput
                    label="Номер телефона"
                    {...form.getInputProps('phone_number')}
                    variant="filled"
                    my='lg'
                    size="md"
                    radius="md"
                    rightSection={<IconPencil color='#4526FF' />}
                />
                <TextInput
                    label="Эл. почта"
                    {...form.getInputProps('email')}
                    variant="filled"
                    my='lg'
                    size="md"
                    radius="md"
                    rightSection={<IconPencil color='#4526FF' />}
                />
                <Group position="right" mt="md">
                    <button type="submit" className=' bg-yellowlogin w-1/2 mx-auto max-sm:w-full h-12 rounded-lg my-1 text-bluelogin'>
                        Сохранить изменения
                    </button>
                </Group>
            </form>
        </FocusTrap>
    )
}

export default ProfileForm

//ToDo Запомнить меня