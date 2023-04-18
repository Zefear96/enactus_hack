import React from 'react';
import z from 'zod';
import { useForm, zodResolver } from "@mantine/form";
import { FocusTrap, TextInput, Group, Button, Text, Title, Avatar } from "@mantine/core";
import { IconPencil } from '@tabler/icons-react';

type Props = {
    onSubmit(values: ProfileFormValues): void;
    defaultValues?: Partial<ProfileFormValues>;
}

const profileFormSchema = z.object({
    name: z.string().nonempty('Это поле не может быть пустым'),
    phone_number: z.string().nonempty("Это поле не может быть пустым"),
    email: z.string().nonempty("Это поле не может быть пустым!").email(),
})

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

const ProfileForm = ({ onSubmit, defaultValues = {} }: Props) => {
    const form = useForm<ProfileFormValues>({
        initialValues: {
            name: "",
            phone_number: "",
            email: "",
            ...defaultValues
        },
        validate: zodResolver(profileFormSchema)
    });

    const handleSubmit = (values: ProfileFormValues) => {
        console.log('editform worked');

        onSubmit(values);
        form.reset();
    };

    return (
        <FocusTrap active>
            <form onSubmit={form.onSubmit(handleSubmit)} className="m-auto w-11/12">
                <Title ta="center" fw={700} my="40px" fz='30px'>Изменить данные</Title>
                <div className="flex items-end justify-center my-10">
                    {/* {currentUser.profile_image ? <Avatar src={currentUser.profile_image} style={{ borderRadius: '50%', border: '1px solid #4526FF' }} size="xl" /> : currentUser.name ? <Avatar src={null} color="primary" alt={currentUser.name} style={{ borderRadius: '50%', border: '1px solid #4526FF' }} size="xl" /> : <Avatar size="xl" style={{ borderRadius: '50%', border: '1px solid #4526FF' }} />} */}
                    <Avatar size="xl" style={{ borderRadius: '50%', border: '1px solid #4526FF' }} />
                    <IconPencil color='rgba(0, 0, 0, 0.6)' className='-ml-3' />
                </div>

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
                    <button type="submit" className=' bg-yellowlogin w-1/2 mx-auto h-12 rounded-lg my-1 text-bluelogin'>
                        Сохранить изменения
                    </button>
                </Group>
            </form>
        </FocusTrap>
    )
}

export default ProfileForm

//ToDo Запомнить меня