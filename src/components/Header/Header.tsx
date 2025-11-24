// biome-ignore-all lint/style/useNamingConvention: Icon names match Lucide exports
import { useEffect, useState } from "react";
import HeaderLink from "./HeaderLink";
import ThemeToggle from "./ThemeToggle";

const navItems = [
    {
        name: "Home",
        href: "#hero",
        icon: "Home",
    },
    {
        name: "About",
        href: "#about",
        icon: "User",
    },
    {
        name: "Skills",
        href: "#skills",
        icon: "Code",
    },
    {
        name: "Experience",
        href: "#experience",
        icon: "Briefcase",
    },
    {
        name: "Education",
        href: "#education",
        icon: "GraduationCap",
    },
    {
        name: "Projects",
        href: "#projects",
        icon: "FolderGit",
    },
];

const Header = () => {
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                }
            },
            {
                rootMargin: "-100px 0px -60% 0px",
            }
        );

        const sections = document.querySelectorAll("section[id]");
        for (const section of sections) {
            observer.observe(section);
        }

        return () => {
            for (const section of sections) {
                observer.unobserve(section);
            }
        };
    }, []);

    return (
        <header className="fixed z-50 p-1.5 bg-background/80 dark:bg-card backdrop-blur-md border border-border shadow-lg rounded-lg flex gap-2 bottom-6 left-1/2 -translate-x-1/2 flex-row md:right-6 md:top-1/2 md:-translate-y-1/2 md:flex-col md:bottom-auto md:left-auto md:translate-x-0">
            <nav className="flex md:flex-col gap-2">
                {navItems.map((item) => (
                    <HeaderLink key={item.name} item={item} isActive={activeSection === item.href.substring(1)} />
                ))}
                <div className="w-px h-6 bg-border md:w-6 md:h-px mx-auto my-auto" />
                <ThemeToggle />
            </nav>
        </header>
    );
};

export default Header;
