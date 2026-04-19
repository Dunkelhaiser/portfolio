/** biome-ignore-all lint/style/useNamingConvention: cloudinary convention */
import { v2 as cloudinary } from "cloudinary";

export const PREVIEW_WIDTH = 1280;
export const HIGH_RES_WIDTH = 1920;

export const getSignedUrl = (publicId: string, width: number) =>
    cloudinary.url(publicId, {
        type: "authenticated",
        secure: true,
        sign_url: true,
        format: "webp",
        transformation: [
            { fetch_format: "auto", quality: "auto" },
            { flags: "keep_attribution" },
            { crop: "scale", width },
        ],
    });
