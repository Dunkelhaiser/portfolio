import { Badge } from "@repo/ui/Badge";
import { Dialog, DialogContent } from "@repo/ui/Dialog";
import { Calendar, Camera, MapPin } from "@repo/ui/icons";
import { useEffect, useState } from "react";
import type { CloudinaryImage } from "@/lib/types";
import { unixToDate, unixToISODate } from "@/lib/utils";

const ImageDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [imgSrc, setImgSrc] = useState("");
    const [photoInfo, setPhotoInfo] = useState<CloudinaryImage | null>(null);

    const tags = photoInfo?.tags;
    const title = photoInfo?.context?.caption;
    const description = photoInfo?.context?.alt;
    const location = photoInfo?.metadata?.location;
    const camera = photoInfo?.metadata?.camera;
    const takenAt = photoInfo?.metadata?.takenAt;

    const date = takenAt ? unixToDate(takenAt) : null;
    const isoDate = takenAt ? unixToISODate(takenAt) : null;

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
                <div className="lg:max-w-[75%] w-full grid place-items-center p-4">
                    <img
                        src={imgSrc}
                        alt={description}
                        className="flex-1 h-auto max-h-[85vh] object-contain drop-shadow-2xl"
                    />
                </div>

                <div className="w-full lg:w-[25%] p-6 flex flex-col gap-6 bg-card border-l border-border overflow-y-auto">
                    <div>
                        <h2 className="text-2xl font-bold font-heading text-foreground mb-2">{title || "Untitled"}</h2>
                        {description && <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>}
                    </div>

                    <div className="flex flex-col gap-3 py-4 border-y border-border">
                        {camera && (
                            <div className="flex items-center gap-3 text-sm text-foreground">
                                <Camera className="size-4 text-muted-foreground" />
                                <span className="font-mono">{camera}</span>
                            </div>
                        )}
                        {location && (
                            <div className="flex items-center gap-3 text-sm text-foreground">
                                <MapPin className="size-4 text-muted-foreground" />
                                <span className="font-mono">{location}</span>
                            </div>
                        )}
                        {isoDate && (
                            <div className="flex items-center gap-3 text-sm text-foreground">
                                <Calendar className="size-4 text-muted-foreground" />
                                <time dateTime={isoDate} className="font-mono">
                                    {date}
                                </time>
                            </div>
                        )}
                    </div>

                    {tags && tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <Badge key={tag} variant="secondary">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export { ImageDialog };
