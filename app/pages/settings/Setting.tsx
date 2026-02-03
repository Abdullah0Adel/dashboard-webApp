"use client";
import { useTheme } from "@/app/hooks/themeHooks";

const Setting = () => {
    const { theme, toggle } = useTheme();

    return (
        <section>
            <button onClick={toggle}>
                Current theme: {theme}
            </button>
        </section>
    );
};

export default Setting;
