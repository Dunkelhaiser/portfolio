/** biome-ignore-all lint/style/noMagicNumbers: numbers are used for time conversions. */
const secondInMs = 1000;

export const unixToDate = (unixTime: number, time = false) => {
    const date = new Date(Number(unixTime) * secondInMs);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    if (time) {
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    return `${day}/${month}/${year}`;
};

export const unixToISODate = (unixTime: number) => {
    const date = new Date(unixTime * secondInMs);
    return date.toISOString();
};

export const formatCameraName = (camera: string) => {
    const mappings: Record<string, string> = {
        // biome-ignore lint/style/useNamingConvention: Cloudinary camera names are in snake_case
        canon_powershot_s3_is: "Canon PowerShot S3 IS",
        // biome-ignore lint/style/useNamingConvention: Cloudinary camera names are in snake_case
        nikon_d7000: "Nikon D7000",
        // biome-ignore lint/style/useNamingConvention: Cloudinary camera names are in snake_case
        oneplus_7t_pro: "OnePlus 7T Pro",
    };

    return (
        mappings[camera] ||
        camera
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
    );
};

export const getDaypart = (unixTime?: number): string | null => {
    if (!unixTime) return null;
    const date = new Date(unixTime * secondInMs);
    const hours = date.getHours();

    if (hours >= 5 && hours < 7) return "Dawn";
    if (hours >= 7 && hours < 12) return "Morning";
    if (hours >= 12 && hours < 17) return "Afternoon";
    if (hours >= 17 && hours < 19) return "Twilight";
    if (hours >= 19 && hours < 23) return "Evening";
    return "Night";
};

export const getSeason = (unixTime?: number): string | null => {
    if (!unixTime) return null;
    const date = new Date(unixTime * secondInMs);
    const month = date.getMonth();

    if (month === 11 || month === 0 || month === 1) return "Winter";
    if (month >= 2 && month <= 4) return "Spring";
    if (month >= 5 && month <= 7) return "Summer";
    return "Autumn";
};
