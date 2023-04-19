import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { loadFromLocalStorage } from "./slices/auth.slice";

export const useInitStore = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadFromLocalStorage());
    }, []);
}

export const InitStore = () => {
    useInitStore();

    return null;
}