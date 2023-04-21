import React, { useState } from 'react';
import { useDeleteComment } from "@/services/pets/comments/deleteComment";
import { useEditComment } from "@/services/pets/comments/editComment";
import { useFetchUser } from "@/services/user/fetchUser";

import { Paper, Group, Avatar, Text, ActionIcon, TextInput, createStyles, rem } from "@mantine/core";
import {
    IconPencil,
    IconTrash,
    IconSend,

} from "@tabler/icons-react";

type Props = {
    id: number;
    owner: string;
    body: string;
    created_at: string;
    updated_at: string;
    post: number;
    profile_image: string | null
}

type EditedComment = {
    id: number;
    body: string;
    post: number
}

const useStyles = createStyles((theme) => ({
    body: {
        paddingLeft: rem(54),
        paddingTop: theme.spacing.sm,
        fontSize: theme.fontSizes.sm,
    },
    comment: {
        padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
    },
}));

const CommentItem = ({ item }: { item: Props }) => {

    const [editedComment, setEditedComment] = useState<EditedComment>({
        id: item.id,
        body: item.body, post: item.post,
    });

    const [deleteComment] = useDeleteComment();
    const [editComment] = useEditComment();
    const [currentUser] = useFetchUser();

    const [editInput, setEditInput] = useState(false);
    const { classes } = useStyles();

    const sendEditedComment = () => {
        console.log(editedComment);

        editComment(editedComment);
        setEditedComment({
            ...editedComment,
            body: ''
        })
        setEditInput(false)

    }

    const handleKeyDownEdit = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            // 👇 Get input value
            sendEditedComment()
        }
    };

    const handleOnChangeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value);
        setEditedComment({
            ...editedComment,
            body: e.currentTarget.value
        });
    };

    return (
        <div key={item.id}>
            <Paper withBorder radius="md" shadow="xs" my="sm" className={classes.comment} >
                <div className="flex justify-between">
                    <Group>
                        <Avatar src={item.profile_image} alt={item.owner} radius="xl" />
                        <div>
                            <Text size="sm">{item.owner}</Text>
                            <Text size="xs" color="dimmed">
                                {item.created_at}
                            </Text>
                        </div>
                    </Group>
                    {currentUser?.email === item.owner ?
                        <div className='flex'>
                            <ActionIcon>
                                <IconPencil size={rem(20)} color='#988CE1' onClick={() => { setEditInput(true); setEditedComment({ ...editedComment, body: item.body }) }} />
                            </ActionIcon>
                            <ActionIcon onClick={() => deleteComment({ id: item.id })}>
                                <IconTrash size={rem(20)} color='#988CE1' />
                            </ActionIcon>
                        </div> : null}
                </div>
                <Text className={classes.body} size="sm">
                    {item.body}
                </Text>
            </Paper>
            {editInput ? <div className="flex justify-between mt-3">
                <div className='w-11/12'>
                    <TextInput
                        withAsterisk
                        placeholder="Измените свой комментарий"
                        onChange={handleOnChangeEdit}
                        onKeyDown={handleKeyDownEdit}
                        value={editedComment.body}
                    />
                </div>
                <ActionIcon onClick={sendEditedComment}>
                    <IconSend size={rem(20)} color='#988CE1' />
                </ActionIcon>
            </div> : null}
        </div>
    )
}

export default CommentItem