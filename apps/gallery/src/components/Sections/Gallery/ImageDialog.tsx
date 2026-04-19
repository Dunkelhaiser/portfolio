import { Dialog, DialogContent } from "@repo/ui/Dialog"; // Adjust import path to your Dialog.tsx
import { useEffect, useState } from "react";

const ImageDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [imgSrc, setImgSrc] = useState("");

    useEffect(() => {
        const handleOpen = (e: CustomEvent<{ src: string }>) => {
            setImgSrc(e.detail.src);
            setIsOpen(true);
        };

        window.addEventListener("open-lightbox", handleOpen as EventListener);
        return () => window.removeEventListener("open-lightbox", handleOpen as EventListener);
    }, []);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
