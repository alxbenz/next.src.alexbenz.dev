import { useEffect, useLayoutEffect, useState } from "react";

type Theme = "dark" | "light" | "system";;

const defaultTheme = "light";

function useTheme() {
    const [theme, setTheme] = useState<Theme>();

    useEffect(() => {
        try {
            const currentTheme = localStorage.getItem("theme");

            setTheme(currentTheme ? (currentTheme as Theme) : defaultTheme);
        } catch (err) {
            setTheme(defaultTheme);
        }
    }, []);

    useEffect(() => {
        if (!theme) return;

        let currentTheme = theme;

        if (currentTheme === "system") {
            currentTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }

        const root = window.document.documentElement;

        root.classList.remove("dark", "light", "system");
        root.classList.add(currentTheme);

        try {
            localStorage.setItem("theme", theme);
        } catch (err) {
            // intenional: do nothing
        }
    }, [theme]);

    return [theme, setTheme] as const;
}

export default useTheme;
