import React from 'react';
import { GetServerSideProps } from "next";
import DetailsCommercial from '@/components/services/commercial/DetailsCommercial';
import { useFetchOneCommercial } from '@/services/commercials/fetchOneCommercial';

type Props = {
    commercialId: number;
};

const CommercialDetailsPage = ({ commercialId }: Props) => {
    const [data] = useFetchOneCommercial({ id: commercialId });
    if (!data) return <h1>Not Found!!</h1>;

    return (
        <div>
            <DetailsCommercial item={data} />
        </div>
    )
}

export default CommercialDetailsPage

export const getServerSideProps: GetServerSideProps<Props, { commercialId: string }> =
    async (context) => {
        const commercialId = context.params?.commercialId ? parseInt(context.params?.commercialId) : null;

        if (!commercialId) {
            return {
                notFound: true
            }
        };

        return {
            props: {
                commercialId
            }
        }
    }
