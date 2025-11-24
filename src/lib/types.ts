import type { ImageMetadata } from "astro";

export interface Skill {
    name: string;
    icon: ImageMetadata;
    link?: string;
}

export interface TimelineItem {
    date?: string;
    title: string;
    subtitle?: string;
    logo?: ImageMetadata;
    description?: string;
    link?: string;
}

export interface Project {
    name: string;
    description: string;
    tags: string[];
    image?: ImageMetadata;
    link?: string;
    repo?: string;
}
