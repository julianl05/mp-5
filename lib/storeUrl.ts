"use server";
import getCollection, { URL_COLLECTION } from "@/db";
import { ShortenedUrlProps } from "@/types";

export default async function createNewUrl(url: string, alias: string): Promise<String> {
    console.log("Storing new URL");
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