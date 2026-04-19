import { Dialog, DialogContent } from "@repo/ui/Dialog";
import { useEffect, useState } from "react";
import { ImageArea } from "@/components/Image/ImageArea";
import { ImageMetadata } from "@/components/Image/ImageMetadata";
import { flattenImageMetadata } from "@/lib/metadata";
import type { CloudinaryImage } from "@/lib/types";

const ImageDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [imgSrc, setImgSrc] = useState("");
    const [photoInfo, setPhotoInfo] = useState<CloudinaryImage | null>(null);

    const metadata = photoInfo ? flattenImageMetadata(photoInfo) : {};

    useEffect(() => {
        const handleOpen = (e: CustomEvent<{ src: string; href: string; info: CloudinaryImage }>) => {
            setImgSrc(e.detail.src);
            setPhotoInfo(e.detail.info);
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
                className="min-w-[90vw] p-0 overflow-hidden flex flex-col lg:flex-row gap-0 bg-background"
                showCloseButton={true}
            >
                <ImageArea src={imgSrc} alt={metadata.description} className="p-4" />
                <ImageMetadata metadata={metadata} className="bg-card" />
            </DialogContent>
        </Dialog>
    );
};

export { ImageDialog };
