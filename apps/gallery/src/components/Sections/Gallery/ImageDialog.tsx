import { Dialog, DialogContent } from "@repo/ui/Dialog";
import { useEffect, useState } from "react";

const ImageDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [imgSrc, setImgSrc] = useState("");

    useEffect(() => {
        const handleOpen = (e: CustomEvent<{ src: string; href: string }>) => {
            setImgSrc(e.detail.src);
            setIsOpen(true);

            window.history.pushState({ isLightbox: true }, "", e.detail.href);
        };

        const handlePopState = () => {
            setIsOpen(false);
        };

        window.addEventListener("open-lightbox", handleOpen as EventListener);
        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("open-lightbox", handleOpen as EventListener);
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            window.history.back();
        }
        setIsOpen(open);
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent
                className="max-w-5xl p-0 border-none bg-transparent shadow-none overflow-hidden"
                showCloseButton={true}
            >
                {imgSrc && (
                    <img
                        src={imgSrc}
                        alt="High resolution gallery view"
                        className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};

export { ImageDialog };
