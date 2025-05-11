import { useEffect, useState } from "react";
import Header from "./header";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Editor } from "@monaco-editor/react";
import io from "socket.io-client";
const socket = io("http://localhost:3000");

interface SnippetType {
    title: string;
    language: string;
    code: string;
    _id: string;
}


function Collaborate() {
    const location = useLocation();
    const queryParam = new URLSearchParams(location.search)
    const id = queryParam.get('id')
    const [snippet, setSnippet] = useState<SnippetType | null>(null);
    const [code, setCode] = useState('');

    // Fetch snippet
    useEffect(() => {
        const getCollaborateSnippet = async () => {
            const res = await axios.get(`http://localhost:3000/api/snippet/getUniqueSnippet?id=${id}`);
            setSnippet(res.data);
            setCode(res.data.code);
        };
        getCollaborateSnippet();
    }, [id]);

    // Join room + handle incoming code
    useEffect(() => {
        if (!id) return;

        socket.emit("join-room", id);

        socket.on("receive-code", (incomingCode) => {
            setCode(incomingCode);
        });

        return () => {
            socket.disconnect();
        };
    }, [id]);

    // Handle code change and broadcast it
    const handleEditorChange = (value: string | undefined) => {
        setCode(value || '');
        socket.emit("code-change", { roomId: id, code: value });
    };

    return (
        <div className='w-full min-h-screen'>
            <div className="fixed top-0 left-0 z-50 px-10 md:px-56 w-full">
                <Header />
            </div>

            <div className='mt-32 min-h-[500px] rounded-2xl p-2 mx-56 bg-gradient-to-b from-neutral-900 to-neutral-800'>
                {snippet && (
                    <div className='mb-10'>
                        <div className='w-full rounded-xl flex justify-between items-center p-2 border border-neutral-700'>
                            <div className="text-neutral-500">Title: {snippet.title}</div>
                            <div className="text-neutral-500">{snippet.language}</div>
                        </div>
                        <Editor
                            height="400px"
                            language={snippet.language}
                            value={code}
                            onChange={handleEditorChange}
                            theme="vs-dark"
                            className="rounded-2xl mt-7"
                        />
                    </div>
                )}
            </div>

            <div className="py-7 px-2 text-white bg-gradient-to-br from-yellow-400 via-orange-500 via-red-600 to-purple-800 animate-pulse-slow mx-10 rounded-2xl mt-10">
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


export default Collaborate;
