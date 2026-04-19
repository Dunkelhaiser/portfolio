import { cn } from "@repo/tailwind";
import { useState } from "react";
import { FullscreenViewer } from "./FullscreenViewer";

interface Props {
    src: string;
    alt?: string;
    className?: string;
}

const ImageArea = ({ src, alt, className }: Props) => {
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    return (
        <>
            <div className={cn("lg:max-w-[75%] w-full grid place-items-center", className)}>
                <button
                    type="button"
                    onClick={() => setIsViewerOpen(true)}
                    className="cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg transition-opacity"
                >
                    <img src={src} alt={alt} className="flex-1 h-auto max-h-[85vh] object-contain drop-shadow-2xl" />
                </button>
            </div>

            <FullscreenViewer src={src} alt={alt} isOpen={isViewerOpen} onClose={() => setIsViewerOpen(false)} />
        </>
    );
};

export { ImageArea };
