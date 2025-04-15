"use server";
import getCollection, { URL_COLLECTION } from "@/db";
import { ShortenedUrlProps } from "@/types";

export default async function storeUrl(url: string, alias: string): Promise<ShortenedUrlProps | string> {
    console.log("Storing new URL");
    try {
        new URL(url);
    } catch (e) {
        console.log("Error: ", e);
        return "Error: Invalid URL, format incorrect";
    }
    const urlRes = await fetch(url, { method: "HEAD" })
        .then((res) => {
            console.log("Response: ", res.status);
            if (res.status < 200 || res.status > 500) {
                return "Error";
            }
        })
        .catch((e) => {
            console.log("Error: ", e);
            return "Error";
        })
    if (urlRes === "Error") {
        return "Error: URL not reachable";
    }
    const shortUrl = {
        alias: alias,
        url: url,
    };
    const urlCollection = await getCollection(URL_COLLECTION);
    const existingUrl = await urlCollection.findOne({ alias: shortUrl.alias });
    console.log("Existing URL: ", existingUrl);
    if (existingUrl) {
        return "Error: Alias already exists";
    }
    const res = await urlCollection.insertOne({...shortUrl});
    if (!res.acknowledged) {
        return "Error: Failed to store URL";
    }
    return {...shortUrl};
}