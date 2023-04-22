import React from 'react';
import { useAppSelector } from "@/store/hooks";
import { cleanMyFav } from "@/store/slices/fav.slice";
import { useAppDispatch } from "@/store/hooks";

const FavList = () => {
    // const favList = useSelector((state: RootState) => state.fav.data); // получение значения счетчика из состояния

    // console.log(favList);
    const favList = useAppSelector(state => state.fav.data);
    console.log(favList);

    const dispatch = useAppDispatch();

    const cleanMyFavList = () => {
        console.log('clean');
        dispatch(cleanMyFav())
    }

    return (
        <div>
            <ul>
                {favList.map(item => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>

            <button onClick={cleanMyFavList}>Очистить мое избранное</button>
        </div>

    )
}

export default FavList