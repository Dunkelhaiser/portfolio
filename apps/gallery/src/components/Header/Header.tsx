// biome-ignore-all lint/style/useNamingConvention: Icon names match Lucide exports
import ThemeToggle from "./ThemeToggle";

const Header = () => {
    return (
        <header className="fixed z-50 p-1.5 bg-background/80 dark:bg-card backdrop-blur-md border border-border shadow-lg rounded-lg flex gap-2 bottom-6 left-1/2 -translate-x-1/2 flex-row md:right-6 md:top-1/2 md:-translate-y-1/2 md:flex-col md:bottom-auto md:left-auto md:translate-x-0">
            <nav className="flex md:flex-col gap-2">
                {/* <div className="w-px h-6 bg-border md:w-6 md:h-px mx-auto my-auto" /> */}
                <ThemeToggle />
            </nav>
        </header>
    );
};

export default Header;
