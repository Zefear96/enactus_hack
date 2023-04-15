import React from 'react';
import { useFetchCommercials } from '@/services/commercials/fetchCommercials';
import ItemCommercial from './ItemCommercial';

const ListCommercials = () => {
    const [data] = useFetchCommercials();
    console.log(data);


    return (
        <div className=" grid grid-cols-3 gap-10 w-3/4 mx-auto">
            {data.map((item) => (
                <ItemCommercial item={item} key={item.id} />
            ))}
        </div>
    )
}

export default ListCommercials