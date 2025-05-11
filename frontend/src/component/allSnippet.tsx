import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./header";
import { Editor } from "@monaco-editor/react";
import { useNavigate } from "react-router-dom";

interface SnippetType {
  title: string;
  language: string;
  code: string;
  _id: string;
}

function AllSnippets() {
    const navigate = useNavigate();
  const [snippets, setSnippets] = useState<SnippetType[]>([]);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const userId = '681fa69c2ace49539a5a1025';
        const res = await axios.get(`http://localhost:3000/api/snippet/getSnippet?id=${userId}`);
        console.log(res.data);
        setSnippets(res.data); 
      } catch (e) {
        console.error("Error fetching snippets", e);
      }
    };
    fetchSnippets();
  }, []);

  useEffect(() => {
    const updateSnippet = async () => {
      try {
        const userId = '681fa69c2ace49539a5a1025';
        const res = await axios.get(`http://localhost:3000/api/snippet/getSnippet?id=${userId}`);
        console.log(res.data);
        setSnippets(res.data); 
      } catch (e) {
        console.error("Error fetching snippets", e);
      }
    };
    updateSnippet();
  }, []);

  return (
    <div className='w-full min-h-screen'>
      <div className="fixed top-0 left-0  z-50 px-2 md:px-56  w-full">
        <Header />
      </div>
      <div className='mt-32 min-h-[500px] rounded-2xl p-2 mx-2 md:mx-56 bg-gradient-to-b from-neutral-900 to-neutral-800'>
        <div className='text-transparent text-6xl text-center bg-clip-text bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 my-10'>
          Your Snippets
        </div>
        {snippets && snippets.map((detail, ind) => (
          <div key={ind} className='mb-10'>
            <div className='w-full rounded-xl flex justify-between items-center p-2 border border-neutral-700'>
              <div className="text-neutral-500">Title: {detail.title}</div>
              <div className='flex gap-4'>
                <p
                className="text-neutral-500"
                onClick={() =>{
                    // handleUpdate()
                }}
                >Update</p>
                <p
                onClick={() =>{
                    navigate(`/collaborate?id=${detail?._id}`)
                }} 
                className="text-red-500 cursor-pointer hover:text-red-700">Collaborate</p>
              </div>
            </div>
            <Editor
              height="400px"
              language={detail.language}
              defaultValue={detail.code}
              theme="vs-dark"
              className="rounded-2xl mt-7"
            />
          </div>
        ))}
      </div>

      <div className=" py-7 px-2 text-white bg-gradient-to-br from-yellow-400 via-orange-500 via-red-600 to-purple-800 animate-pulse-slow mx-2 md:mx-10 rounded-2xl mt-10">
                <div className='flex justify-between'>
                    <div className='text-9xl'>
                        codeIt
                        <div className='flex justify-between w-full'>
                            <p className='text-sm ml-2 mt-2 text-neutral-200'>2025 @all rights reserved</p>
                            <p className='text-sm ml-2 mt-2 text-neutral-200'>Made with 🤍 by Navin Venkat</p>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  );
}

export default AllSnippets;
