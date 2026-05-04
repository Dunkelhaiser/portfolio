/** biome-ignore-all lint/style/useNamingConvention: cloudinary convention */
import { Cloudinary } from "@cloudinary/url-gen";
import { format, quality } from "@cloudinary/url-gen/actions/delivery";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { auto } from "@cloudinary/url-gen/qualifiers/format";
import { auto as autoQuality } from "@cloudinary/url-gen/qualifiers/quality";
import type { CloudinaryResourceById } from "./types";

export const PREVIEW_WIDTH = 1280;
export const HIGH_RES_WIDTH = 2560;

export const getSignedUrl = async (publicId: string, width: number, cloudName: string, apiSecret: string) => {
    const cld = new Cloudinary({ cloud: { cloudName } });
    const img = cld
        .image(publicId)
        .setDeliveryType("authenticated")
        .delivery(format(auto()))
        .delivery(quality(autoQuality()))
        .addFlag("keep_attribution")
        .resize(scale().width(width));

    const url = img.toURL();
    const parts = url.split("/image/authenticated/");
    const toSign = parts[1].split("?")[0];

    const encoder = new TextEncoder();
    const data = encoder.encode(toSign + apiSecret);
    const hashBuffer = await crypto.subtle.digest("SHA-1", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const base64 = btoa(String.fromCharCode(...hashArray));
    // biome-ignore lint/style/noMagicNumbers: Cloudinary signature convention
    const signature = base64.substring(0, 8).replace(/\+/g, "-").replace(/\//g, "_");

    return `${parts[0]}/image/authenticated/s--${signature}--/${parts[1]}`;
};

export const searchImages = async (
    expression: string,
    maxResults: number,
    cloudName: string,
    apiKey: string,
    apiSecret: string,
    sortByDir: "asc" | "desc" = "desc"
) => {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/resources/search`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${btoa(`${apiKey}:${apiSecret}`)}`,
        },
        body: JSON.stringify({
            expression,
            with_field: ["tags", "context", "metadata"],
            sort_by: [{ "metadata.takenAt": sortByDir }],
            max_results: maxResults,
        }),
    });
    if (!res.ok) {
        throw new Error(`Cloudinary search failed: ${await res.text()}`);
    }
    return res.json();
};

export const getResource = async (
    publicId: string,
    cloudName: string,
    apiKey: string,
    apiSecret: string
): Promise<CloudinaryResourceById | null> => {
    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/authenticated/${publicId}?tags=true&context=true&metadata=true`,
        {
            method: "GET",
            headers: {
                Authorization: `Basic ${btoa(`${apiKey}:${apiSecret}`)}`,
            },
        }
    );
    if (!res.ok) {
        const NOT_FOUND = 404;
        if (res.status === NOT_FOUND) return null;
        throw new Error(`Cloudinary get resource failed: ${await res.text()}`);
    }
    return res.json();
};
