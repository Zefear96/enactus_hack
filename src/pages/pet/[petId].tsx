// import { baseAxios } from '@/utils/baseAxios';
import { GetServerSideProps } from 'next'
import React from 'react'

type Props = {
    petId: number;
    // data: any;
}

const PetDetailsPage = ({
    petId,
}: Props) => {
    return (
        <div>PetDetailsPage</div>
    )
}

export default PetDetailsPage

export const getServerSideProps: GetServerSideProps<Props, { petId: string }> = async (context) => {
    const petId = context.params?.petId ? parseInt(context.params?.petId) : null;

    if (!petId) return {
        notFound: true,
    }

    // '/pet/:petId'

    // const { data } = await baseAxios.get(`/pets/${petId}`);

    return {
        props: {
            petId: petId,
            // data,
        }
    }
}