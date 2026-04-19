import type { CloudinaryImage, CloudinaryImageFlat, CloudinaryResourceById } from "@/lib/types";

export const flattenImageMetadata = (source: CloudinaryImage | CloudinaryResourceById): CloudinaryImageFlat => {
    const isResourceById = (s: CloudinaryImage | CloudinaryResourceById): s is CloudinaryResourceById =>
        "context" in s && s.context !== undefined && "custom" in (s.context as Record<string, unknown>);

    if (isResourceById(source)) {
        return {
            title: source.context?.custom?.caption,
            description: source.context?.custom?.alt,
            camera: source.metadata?.camera,
            location: source.metadata?.location,
            takenAt: source.metadata?.takenAt,
            tags: source.tags,
        };
    }

    return {
        title: source.context?.caption,
        description: source.context?.alt,
        camera: source.metadata?.camera,
        location: source.metadata?.location,
        takenAt: source.metadata?.takenAt,
        tags: source.tags,
    };
};
