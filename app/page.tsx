"use client";
import { useState } from "react";
import createNewUrl from "@/lib/storeUrl";
export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [alias, setAlias] = useState<string>("");
  const [result, setResult] = useState<string>("");
  
  async function handleClick(event: React.FormEvent) {
    event.preventDefault();
    if (url === "" || alias === "") {
      console.log("Please enter a url");
      return;
    }
    const res = await createNewUrl(url, alias);
    setResult(res);
    console.log(res);
  };
  
  return (
    <div>
      <form onSubmit={handleClick} className="flex flex-col rounded-3xl w-[40vw] my-[15vh] px-[2vw] py-[5vh] justify-self-center bg-[#31363F] shadow-lg">
        <h1 className="text-[calc(3px+2vw)] w-full text-center">URL Shortener</h1>
        <div className="flex flex-col w-full">
          <label htmlFor="url-input" className="mt-[2vh]">URL</label> 
          <input 
            id="url-input"
            type="text"
            value={url}
            placeholder="https://example.com/url"
            onChange={(e) => setUrl(e.target.value)}
            className="border-2 border-gray-500 rounded-md p-[0.5vw] my-[2vh] w-full text-[calc(5px+1vw)] text-gray-100"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="alias-input" className="mt-[1vh]">Alias</label> 
          <div className="flex flex-row items-center pb-[1vw]">
            <p className="text-gray-100">http://localhost:3001/</p>
            <input 
              id="alias-input"
              type="text"
              value={alias}
              placeholder="example"
              onChange={(e) => setAlias(e.target.value)}
              className="border-2 border-gray-500 rounded-md p-[0.5vw] ml-[1vw] w-full text-gray-400"
            />
          </div>
        </div>
        <button type="submit" className="text-[calc(8px+1vw)] w-full bg-[#76ABAE] p-[1vw] rounded-2xl hover:bg-gray-500 hover:cursor-pointer active:bg-gray-600">Shorten</button>
        {result != "Success" ? 
          <p className="text-red-300 text-center mt-[2vh]">{result}</p> 
          : 
          <div className="p-[1vw] my-[2vh] bg-[#383d47]">
            <p className="text-green-300 text-center">Success!</p>
            <p className="text-green-300 text-center">http://localhost:3001/{alias}</p>
          </div>
        }
      </form>
    </div>
  );
}
