export interface Skill {
    name: string;
    icon: string;
    link?: string;
}

export interface TimelineItem {
    date?: string;
    title: string;
    subtitle?: string;
    logo?: string;
    description?: string;
    link?: string;
}

export interface Project {
    name: string;
    description: string;
    tags: string[];
    image?: string;
    link?: string;
    repo?: string;
}
