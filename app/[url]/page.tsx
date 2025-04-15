import {redirect} from "next/navigation";
import getUrl from "@/lib/getUrl";
export default async function Url({params}: { params: { url: string } }) {
    let destination: string;
    const {url} =  await params; // next.js docs say to do await for params as it is now a promise in v15 and above
    try {
        destination = await getUrl(url);
    } catch (e) {
        console.log(e);
        destination = "/";
    }
    return redirect(destination)

}