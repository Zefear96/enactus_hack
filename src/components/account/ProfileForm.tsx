import React from 'react';
import z from 'zod';
import { useForm, zodResolver } from "@mantine/form";
import { FocusTrap, TextInput, Group, Button, Text } from "@mantine/core";

type Props = {
    onSubmit(values: ProfileFormValues): void;
    defaultValues?: Partial<ProfileFormValues>;
}

const profileFormSchema = z.object({
    phone_number: z.string().nonempty("Это поле не может быть пустым"),
    email: z.string().nonempty("Это поле не может быть пустым!").email(),
})

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

const ProfileForm = ({ onSubmit, defaultValues = {} }: Props) => {
    const form = useForm<ProfileFormValues>({
        initialValues: {
            phone_number: "",
            email: "",
            ...defaultValues
        },
        validate: zodResolver(profileFormSchema)
    });

    const handleSubmit = (values: ProfileFormValues) => {
        onSubmit(values);
        form.reset();
    };

    return (
        <FocusTrap active>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    withAsterisk
                    placeholder="Номер телефона"
                    {...form.getInputProps('phone_number')}
                />
                <TextInput
                    withAsterisk
                    placeholder="Эл. почта"
                    {...form.getInputProps('email')}
                />
                <Group position="right" mt="md">
                    <Button type="submit">Отправить</Button>
                </Group>
            </form>
        </FocusTrap>
    )
}

export default ProfileForm

//ToDo Запомнить меня