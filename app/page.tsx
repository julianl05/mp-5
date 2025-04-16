"use client";
import { useState } from "react";
import createNewUrl from "@/lib/storeUrl";
import { ShortenedUrlProps } from "@/types";
export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [alias, setAlias] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<ShortenedUrlProps>();
  async function handleClick(event: React.FormEvent) {
    event.preventDefault();
    if (url === "" || alias === "") {
      // console.log("Please enter a url");
      setError("Please enter a url and alias");
      setResult(undefined);
      return;
    }
    const res = await createNewUrl(url, alias);
    if (typeof res === "string") {
      setError(res);
      setResult(undefined);
    } else {
      setError("");
      setResult(res);
    }
    return;
  };
  
  return (
    <div>
      <form onSubmit={handleClick} className="flex flex-col rounded-3xl w-[60vw] my-[15vh] px-[2vw] py-[5vh] justify-self-center bg-[#31363F] shadow-lg">
        <h1 className="text-[calc(3px+2vw)] w-full text-center">URL Shortener</h1>
        <div className="flex flex-col w-full">
          <label htmlFor="url-input" className="mt-[2vh]">URL</label> 
          <input 
            id="url-input"
            type="text"
            value={url}
            placeholder="https://example.com/url"
            onChange={(e) => setUrl(e.target.value)}
            required
            className="border-2 border-gray-500 rounded-md p-[0.5vw] my-[2vh] w-full text-[calc(5px+1vw)] text-gray-100"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="alias-input" className="mt-[1vw]">Alias</label> 
          <div className="flex flex-row items-center pb-[1vw] flex-wrap"> 
            <p className="text-gray-100">https://mp-5-gules.vercel.app/</p>
            <input 
              id="alias-input"
              type="text"
              value={alias}
              placeholder="example"
              onChange={(e) => setAlias(e.target.value)}
              required
              className="flex-shrink flex-1 border-2 border-gray-500 rounded-md p-[0.5vw] ml-[1vw] text-gray-400" //flex-shrink should let input width shrink if there is less room and flex-1 should let it grow if there is more room
            />
          </div>
        </div>
        <button type="submit" className="text-[calc(3px+1.5vw)] w-full bg-[#76ABAE] p-[1vw] rounded-2xl hover:bg-gray-500 hover:cursor-pointer active:bg-gray-600">Shorten</button>
        {error ? (
            <p className="text-red-300 text-center mt-[2vw]">{error}</p> 
          ) : result ? (
            <div className="p-[1vw] my-[2vh] bg-[#383d47]">
              <p className="text-green-300 text-center">Success!</p>
              <p className="text-green-300 text-center">https://mp-5-gules.vercel.app/{result?.alias}</p>
            </div>
          ): null
        }
      </form>
    </div>
  );
}
