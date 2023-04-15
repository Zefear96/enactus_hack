import React from 'react';
import { useFetchCommercials } from '@/services/commercials/fetchCommercials';
import ItemCommercial from './ItemCommercial';
import Image from "next/image";
import Link from "next/link";
import yourad from '../../../../public/yourad.png';
import textad from '../../../../public/textad.png';

const ListCommercials = () => {
    const [data] = useFetchCommercials();
    console.log(data);

    return (
        <div>
            <div className=" grid grid-cols-2 gap-10 w-3/4 mx-auto">
                {data.map((item) => (
                    <ItemCommercial item={item} key={item.id} />
                ))}
            </div>
            <div style={{
                backgroundImage: "url(" + "https://i.ibb.co/W30Mqf7/yourad.png" + ")", width: '100%', height: '500px', margin: 'auto', display: 'flex', alignItems: 'center', flexDirection: 'column',
                backgroundSize: 'auto',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundColor: 'rgb(240, 123, 194)'
            }}>
                <Image src={textad} alt="error :(" />
                <button className="bg-bluelogin text-yellowlogin w-60 mb-4 rounded-3xl h-10 relative z-[1] hover:bg-yellowlogin hover:text-bluelogin"
                    onMouseOver={(e) => {
                        e.currentTarget.style.boxShadow = "10px 10px 0px 4px #988CE1";
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.boxShadow = "none";
                    }}>Подать рекламу</button>
            </div>
        </div>
    )
}

export default ListCommercials