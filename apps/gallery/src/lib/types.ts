/** biome-ignore-all lint/style/useNamingConvention: cloudinary convention */

import type { CollectionEntry } from "astro:content";

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
    width?: number;
    height?: number;
}

export interface CloudinaryResource {
    public_id: string;
    created_at: string;
    tags?: string[];
    context?: CloudinaryContext;
    metadata?: CloudinaryMetadata;
    width?: number;
    height?: number;
}

export interface CloudinaryResourceById {
    created_at: string;
    tags?: string[];
    context?: {
        custom: CloudinaryContext;
    };
    metadata?: CloudinaryMetadata;
}

export interface CloudinaryImageFlat {
    title?: string;
    description?: string;
    camera?: string;
    location?: string;
    takenAt?: number;
    tags?: string[];
}

export interface Group {
    id: string;
    previewSrc: string;
    tags: string[];
    data?: CollectionEntry<"groups">["data"];
}
