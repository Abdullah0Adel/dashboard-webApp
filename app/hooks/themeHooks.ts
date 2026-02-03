"use client";
import { useAppDispatch, useAppSelector } from "../store";
import { toggleTheme } from "../store/features/theme/themeSlice";

export function useTheme() {
    const dispatch = useAppDispatch();
    const theme = useAppSelector(s => s.theme.value);


    return {
        theme,
        toggle: () => dispatch(toggleTheme())
    };
}
