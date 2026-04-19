/** biome-ignore-all lint/style/useNamingConvention: cloudinary convention */

interface CloudinaryContext {
    alt?: string;
    caption?: string;
    group?: string;
}

interface CloudinaryMetadata {
    takenAt: number;
    camera: string;
    daypart: string;
    location: string;
}

export interface CloudinaryImage {
    id: string;
    previewSrc: string;
    highResSrc: string;
    tags: string[];
    context: CloudinaryContext;
    metadata: CloudinaryMetadata;
}

export interface CloudinaryResource {
    public_id: string;
    created_at: string;
    tags?: string[];
    context?: CloudinaryContext;
    metadata?: CloudinaryMetadata;
}

export interface CloudinaryResourceById {
    created_at: string;
    tags?: string[];
    context?: {
        custom: CloudinaryContext;
    };
    metadata?: CloudinaryMetadata;
}
