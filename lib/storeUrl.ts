"use server";
import getCollection, { URL_COLLECTION } from "@/db";
import { ShortenedUrlProps } from "@/types";

export default async function storeUrl(url: string, alias: string): Promise<ShortenedUrlProps | string> {
    console.log("Storing new URL");
    // checking url is valid format
    if (/\s/.test(url)) { //using regex to check for any whitespace in the url
        return "Error: Invalid URL, format incorrect";
    }
    try { //testing if url is valid (this doesn't check for whitespace so previous check is needed)
        new URL(url);
    } catch (e) {
        console.log("Error: ", e);
        return "Error: Invalid URL, format incorrect";
    }
    //checking url is reachable by checking returned status code
    const urlRes = await fetch(url, { method: "HEAD" })
        .then((res) => {
            // console.log("Response: ", res.status);
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
    //inserting into database
    const shortUrl = {
        alias: alias,
        url: url,
    };
    const urlCollection = await getCollection(URL_COLLECTION);
    const existingUrl = await urlCollection.findOne({ alias: shortUrl.alias });
    // console.log("Existing URL: ", existingUrl);
    if (existingUrl) {
        return "Error: Alias already exists";
    }
    const res = await urlCollection.insertOne({...shortUrl});
    if (!res.acknowledged) {
        return "Error: Failed to store URL";
    }
    return {...shortUrl};
}