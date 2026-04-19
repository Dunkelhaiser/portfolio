import { cn } from "@repo/tailwind";
import { Badge } from "@repo/ui/Badge";
import { Calendar, Camera, MapPin } from "@repo/ui/icons";
import type { CloudinaryImageFlat } from "@/lib/types";
import { unixToDate, unixToISODate } from "@/lib/utils";

interface Props {
    metadata: CloudinaryImageFlat;
    className?: string;
}

const ImageMetadata = ({ metadata: { title, description, camera, location, takenAt, tags }, className }: Props) => {
    const date = takenAt ? unixToDate(takenAt, true) : null;
    const isoDate = takenAt ? unixToISODate(takenAt) : null;

    return (
        <div
            className={cn(
                "w-full lg:w-[25%] p-6 flex flex-col gap-6 border-l border-border overflow-y-auto",
                className
            )}
        >
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
    );
};

export { ImageMetadata };
