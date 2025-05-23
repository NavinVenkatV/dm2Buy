import { useEffect, useState } from "react";
import Header from "./header";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Editor } from "@monaco-editor/react";
import io from "socket.io-client";
import { motion } from "framer-motion";
import Footer from "./ui/footer";


const socket = io( import.meta.env.DEV ? "http://localhost:3000" : "https://dm2buy.onrender.com",{
    transports : ['websocket'],
    withCredentials : true
});

interface SnippetType {
    title: string;
    language: string;
    code: string;
    _id: string;
}

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.3,
        },
    },
};

const fadeInUp = {
    hidden: {
        opacity: 0,
        y: 20,
        filter: "blur(8px)",
    },
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.6,
            ease: "easeInOut",
        },
    },
};

function Collaborate() {
    const location = useLocation();
    const queryParam = new URLSearchParams(location.search);
    const id = queryParam.get("id");
    const [snippet, setSnippet] = useState<SnippetType[]>([]);
    const [code, setCode] = useState("");
    const [copied, setCopied] = useState(false);
    // const [snippetId, setSnippetId] = useState()
    const [isOwner, setIsOwner] = useState(false)


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if (id) {
            socket.emit("join-room", id);
            socket.on("receive-code", (data) => {
                setCode(data);
            });
        }

        return () => {
            socket.off("receive-code");
        };
    }, [id]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const getCollaborateSnippet = async () => {
            const res = await axios.get(`https://dm2buy.onrender.com/api/snippet/getUniqueSnippet?id=${id}`);
            setSnippet(res.data);
            res.data.map((val: any) => {
                setCode(val.code);
                if(val.userId === token){
                    setIsOwner(true)
                }
            });
        };
        if (id) getCollaborateSnippet();
    }, [id]);

    return (
        <div className="w-full min-h-screen">
            <div className="fixed top-0 left-0 z-50 px-2 lg:px-56 w-full">
                <Header />
            </div>

            <motion.div
                className="mt-32 min-h-[500px] rounded-2xl p-2 mx-2 lg:mx-56 bg-gradient-to-b from-neutral-900 to-neutral-800"
                variants={container}
                initial="hidden"
                animate="show"
            >
                <motion.div
                    variants={fadeInUp}
                    className="bg-gradient-to-br from-[#1a1c40] via-[#3f2b96] to-[#a8c0ff] shadow-sm rounded-2xl p-6 mb-6"
                >
                    <h2 className="text-2xl font-bold mb-4">Collaborate in Real Time</h2>
                    <p className="  leading-relaxed mb-4">
                        This is a live collaborative coding space. You can invite your friends, classmates,
                        or team members to work together in real-time. Simply copy the Room ID below and share
                        it with them. Everyone with the same Room ID can join, edit, and view code simultaneously.
                    </p>
                    <div className="md:flex text-center items-center gap-3">
                        <span className="bg-neutral-800 rounded-xl px-4 py-2  font-mono text-sm">{id}</span>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(id!);
                                setCopied(true);
                                setTimeout(() => {
                                    setCopied(false);
                                }, 5000);
                            }}
                            className="bg-orange-300 mt-5 md:mt-0 text-black cursor-pointer px-4 py-2 hover:bg-orange-400 font-bold rounded-2xl transition"
                        >
                            {copied ? "Copied!" : "Invite"}
                        </button>
                    </div>
                </motion.div>

                {snippet.length > 0 ?
                    snippet.map((val, index) => (
                        <motion.div key={index} className="mb-10" variants={fadeInUp}>
                            <div className="w-full rounded-xl flex justify-between items-center p-2 border border-neutral-700">
                                <div className="text-neutral-500">Title: {val.title}</div>
                                <p className={`text-red-500  hover:text-red-700 ${isOwner ? 'cursor-pointer' : 'cursor-not-allowed'}`}>Update</p>
                            </div>
                            <Editor
                                height="400px"
                                language={val.language}
                                value={code}
                                theme="vs-dark"
                                className="rounded-2xl mt-7"
                                onChange={(value) => {
                                    setCode(value || "");
                                    socket.emit("code-change", { roomId: id, code: value });
                                }}
                            />
                        </motion.div>
                    )) : (
                        <div className="text-center items-center  flex flex-col justify-center">
                            <h1>No snippet available, Kindly please enter the correct invite code and try again!</h1>
                            <img 
                            className="rounded-full text-center w-[300px] h-[300px] mt-3"
                            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnp3bzNnMHZoMG5meHA4dGxwMWZqc3g5eDMwaGFtZ3dnYzkxdDM5dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hPPx8yk3Bmqys/giphy.gif" alt="NO Snippet available" />
                        </div>
                    )}
            </motion.div>
            <Footer />
        </div>
    );
}

export default Collaborate;
