import React from "react";
import z, { object } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import {
    FocusTrap,
    TextInput,
    Group,
    Title,
    Textarea,

} from "@mantine/core";


type Props = {
    onSubmit(values: ReviewFormValues): void;
    defaultValues?: Partial<ReviewFormValues>;
};

const reviewFormSchema = z.object({
    name: z.string().nonempty("Это поле не может быть пустым!"),
    contact: z.string().nonempty("Это поле не может быть пустым"),
    theme: z.string().nonempty("Это поле не может быть пустым"),
    message: z.string().nonempty("Это поле не может быть пустым"),

})

export type ReviewFormValues = z.infer<typeof reviewFormSchema>;

const AddReviewForm = ({ onSubmit, defaultValues = {} }: Props) => {
    const form = useForm<ReviewFormValues>({
        initialValues: {
            name: '',
            contact: '',
            theme: '',
            message: '',
            ...defaultValues
        },
        validate: zodResolver(reviewFormSchema),
    });

    const handleSubmit = (values: ReviewFormValues) => {
        console.log(values);
        onSubmit(values);

        form.reset();
    };

    return (
        <div className="w-full">
            <FocusTrap active>
                <form onSubmit={form.onSubmit(handleSubmit)} >
                    <Title ta="center" fw={700} my="30px">Обратная связь</Title>
                    <TextInput
                        withAsterisk
                        {...form.getInputProps("name")}
                        label="Имя"
                        variant="filled"
                        my='sm'
                    />
                    <TextInput
                        withAsterisk
                        {...form.getInputProps("contact")}
                        label="Эл. почта или номер телефона"
                        variant="filled"
                        my='sm'
                    />
                    <TextInput
                        withAsterisk
                        {...form.getInputProps("theme")}
                        label="Тема"
                        variant="filled"
                        my='sm'
                    />
                    <Textarea
                        withAsterisk
                        {...form.getInputProps("message")}
                        label="Сообщение"
                        variant="filled"
                        my='sm'
                        minRows={4}
                        maxRows={6}
                    />

                    <Group position="right" mt="md">
                        <button type="submit" className=' bg-yellowlogin w-full h-14 rounded-lg my-1'>Отправить</button>
                    </Group>
                </form>
            </FocusTrap>
        </div>
    );
};

export default AddReviewForm;
