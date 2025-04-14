"use server";
import getCollection, { URL_COLLECTION } from "@/db";
import { ShortenedUrlProps } from "@/types";

export default async function storeUrl(url: string, alias: string): Promise<string> {
    console.log("Storing new URL");
    try {
        new URL(url);
    } catch (e) {
        return "Error: Invalid URL";
    }
    const shortUrl = {
        alias: alias,
        url: url,
    };
    const urlCollection = await getCollection(URL_COLLECTION);
    const existingUrl = await urlCollection.findOne({ alias: shortUrl.alias });
    if (existingUrl) {
        alert("Alias already exists");
        return "Error: Alias already exists";
    }
    const res = await urlCollection.insertOne({...shortUrl});
    if (!res.acknowledged) {
        return "Error: Failed to store URL";
    }
    return "Success";
}