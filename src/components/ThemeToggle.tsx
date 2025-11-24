import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/Tooltip";
import { Button } from "./ui/Button";

const ThemeToggle = () => {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [isMobile, setIsMobile] = useState(false);

    const mdBreakpoint = 768;

    useEffect(() => {
        const isDark = document.documentElement.classList.contains("dark");
        setTheme(isDark ? "dark" : "light");

        const checkMobile = () => setIsMobile(window.innerWidth < mdBreakpoint);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        document.documentElement.classList[theme === "dark" ? "add" : "remove"]("dark");
        localStorage.setItem("theme", theme);
    }, [
        theme,
    ]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                    className="text-muted-foreground"
                >
                    {theme === "light" ? <Sun className="size-5.5" /> : <Moon className="size-5.5" />}
                </Button>
            </TooltipTrigger>
            <TooltipContent side={isMobile ? "top" : "right"}>
                <p>Toggle theme</p>
            </TooltipContent>
        </Tooltip>
    );
};

export default ThemeToggle;
