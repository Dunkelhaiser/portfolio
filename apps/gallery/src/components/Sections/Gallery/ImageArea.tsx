import { cn } from "@repo/tailwind";

interface Props {
    src: string;
    alt?: string;
    className?: string;
}

const ImageArea = ({ src, alt, className }: Props) => {
    return (
        <div className={cn("lg:max-w-[75%] w-full grid place-items-center", className)}>
            <img src={src} alt={alt} className="flex-1 h-auto max-h-[85vh] object-contain drop-shadow-2xl" />
        </div>
    );
};

export { ImageArea };
