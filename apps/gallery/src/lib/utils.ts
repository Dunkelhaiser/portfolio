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
