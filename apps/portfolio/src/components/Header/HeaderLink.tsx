// biome-ignore-all lint/style/useNamingConvention: Icon names match Lucide exports

import { cn } from "@repo/tailwind";
import { buttonVariants } from "@repo/ui/Button";
import { Briefcase, Code, FolderGit, GraduationCap, Home, type LucideIcon, User } from "@repo/ui/icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "@repo/ui/Tooltip";
import { useEffect, useState } from "react";

const iconMap: Record<string, LucideIcon> = {
    Home,
    User,
    Code,
    Briefcase,
    GraduationCap,
    FolderGit,
};

interface Props {
    item: {
        name: string;
        href: string;
        icon: string;
    };
    isActive?: boolean;
}

const HeaderLink = ({ item: { name, href, icon }, isActive }: Props) => {
    const Icon = iconMap[icon];
    const [isMobile, setIsMobile] = useState(false);

    const MD_BREAKPOINT = 768;

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < MD_BREAKPOINT);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <Tooltip>
            <TooltipTrigger
                render={
                    <a
                        href={href}
                        className={cn(
                            buttonVariants({
                                variant: "ghost",
                                size: "icon",
                            }),
                            isActive
                                ? "bg-sky-800 dark:bg-primary text-primary-foreground hover:bg-sky-800 dark:hover:bg-primary"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                        aria-label={name}
                    >
                        <Icon className="size-5.5" />
                    </a>
                }
            />
            <TooltipContent side={isMobile ? "top" : "right"}>
                <p>{name}</p>
            </TooltipContent>
        </Tooltip>
    );
};
export default HeaderLink;
