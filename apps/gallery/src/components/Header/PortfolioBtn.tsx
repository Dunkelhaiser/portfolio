// biome-ignore-all lint/style/useNamingConvention: Icon names match Lucide exports

import { cn } from "@repo/tailwind";
import { buttonVariants } from "@repo/ui/Button";
import { UserRound } from "@repo/ui/icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "@repo/ui/Tooltip";
import { useEffect, useState } from "react";

const PortfolioBtn = () => {
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
                    href="https://www.kyrylotymchyshyn.com/"
                    target="_blank"
                    className={cn(
                        buttonVariants({
                            variant: "ghost",
                            size: "icon",
                        }),
                        "text-muted-foreground"
                    )}
                    aria-label="Portfolio"
                    rel="noopener"
                >
                    <UserRound className="size-5.5" />
                </a>
            </TooltipTrigger>
            <TooltipContent side={isMobile ? "top" : "right"}>
                <p>Portfolio</p>
            </TooltipContent>
        </Tooltip>
    );
};
export default PortfolioBtn;
