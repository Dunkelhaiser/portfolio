// biome-ignore-all lint/style/useNamingConvention: Icon names match Lucide exports
import { Briefcase, Code, FolderGit, GraduationCap, Home, type LucideIcon, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/Tooltip";
import { buttonVariants } from "./ui/Button";

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
}

const HeaderLink = ({ item: { name, href, icon } }: Props) => {
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
            <TooltipTrigger asChild>
                <a
                    href={href}
                    className={buttonVariants({
                        variant: "ghost",
                        size: "icon",
                    })}
                    aria-label={name}
                >
                    <Icon className="size-5.5" />
                </a>
            </TooltipTrigger>
            <TooltipContent side={isMobile ? "top" : "right"}>
                <p>{name}</p>
            </TooltipContent>
        </Tooltip>
    );
};
export default HeaderLink;
