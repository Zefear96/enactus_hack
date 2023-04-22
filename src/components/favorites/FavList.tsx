import React, { useState } from 'react';
import { useAppSelector } from "@/store/hooks";
import { cleanMyFav } from "@/store/slices/fav.slice";
import { useAppDispatch } from "@/store/hooks";
import ItemPet from '../services/Pets/ItemPet';
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from 'next/router';
import {
    Group,
    Pagination,
} from "@mantine/core";

import no_results_img from "../../../public/no_results_img.png";
import no_results_text from "../../../public/no_results_text.png";
import arrow_back from "../../../public/arrow_back.png";

const FavList = () => {

    const favList = useAppSelector(state => state.fav.data);
    console.log(favList);
    const [activePage, setActivePage] = useState(1);

    const router = useRouter();

    const dispatch = useAppDispatch();

    const cleanMyFavList = () => {
        console.log('clean');
        dispatch(cleanMyFav())
    }

    function currentData() {
        const begin = (activePage - 1) * 6;
        const end = begin + 6;
        return favList.slice(begin, end);
    }

    return (
        <>
            <button className=" mx-5" onClick={() => router.back()}>
                <Image src={arrow_back} alt="error" />
            </button>
            {favList.length !== 0 ? (
                <div className='flex justify-center flex-col'>
                    <div className=" grid grid-cols-3 gap-10 w-full mx-auto my-10">
                        {currentData().map(item => <ItemPet key={item.id} item={item} />)}
                    </div>
                    <button onClick={cleanMyFavList} className="bg-yellowlogin text-bluelogin w-60 mb-4 mx-auto rounded-3xl h-10 hover:bg-bluelogin hover:text-yellowlogin"
                        onMouseOver={(e) => {
                            e.currentTarget.style.boxShadow = "none";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.boxShadow = "10px 10px 0px 4px #988CE1";
                        }}>Очистить мое избранное</button>
                    <Group position="center" mt='sm'>
                        <Pagination
                            value={activePage} onChange={setActivePage}
                            siblings={2}
                            total={Math.ceil((favList?.length ?? 0) / 6)}

                        />
                    </Group>
                </div>
            ) : <div className=" flex items-center justify-center">
                <Image src={no_results_text} alt="error" />
                <Image src={no_results_img} alt="error" />
            </div>}
        </>
    )
}

export default FavList




