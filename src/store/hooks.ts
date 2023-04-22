import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export const useIsInFav = (id: number) => {
    const isInFav = useAppSelector(state => !!state.fav.data.find(item => item.id === id));
    return isInFav;
}
