import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./header";
import { Editor } from "@monaco-editor/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface SnippetType {
  title: string;
  language: string;
  code: string;
  _id: string;
}

function AllSnippets() {
  const navigate = useNavigate();
  const [snippets, setSnippets] = useState<SnippetType[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [codeMap, setCodeMap] = useState<{ [key: string]: string }>({});

  const fetchSnippets = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:3000/api/snippet/getSnippet`, {
        headers: {
          Authorization: token,
        },
      });
      setSnippets(res.data);
    } catch (e) {
      console.error("Error fetching snippets", e);
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, []);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!deleteId) return;

      await axios.delete(
        `http://localhost:3000/api/snippet/deleteSnippet/${deleteId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setDeleteId(null);
      fetchSnippets(); // Refresh list
    } catch (e) {
      alert(e);
      setDeleteId(null);
    }
  };

  const handleUpdate = async (_id: string) => {
    try {
      const token = localStorage.getItem("token");
      const updatedCode = codeMap[_id];

      await axios.put(
        `http://localhost:3000/api/snippet/updateSnippet/${_id}`,
        { code: updatedCode },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Snippet updated!");
    } catch (e) {
      alert("Error updating snippet");
      console.error(e);
    }
  };

  return (
    <div className="w-full min-h-screen">
      <div className="fixed top-0 left-0 z-50 px-2 lg:px-56 w-full">
        <Header />
      </div>
      <div className="mt-32 min-h-[500px] rounded-2xl p-2 mx-2 lg:mx-56 bg-gradient-to-b from-neutral-900 to-neutral-800">
        <div className="text-transparent text-6xl text-center bg-clip-text bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 my-10">
          Your Snippets
        </div>
        {snippets.map((detail, ind) => (
          <div key={ind} className="mb-10">
            <div className="w-full rounded-xl flex justify-between items-center p-2 border border-neutral-700">
              <div className="text-neutral-500">Title: {detail.title}</div>
              <div className="flex gap-4">
                <p
                  className="text-neutral-500 cursor-pointer"
                  onClick={() => handleUpdate(detail._id)}
                >
                  Update
                </p>
                <p
                  onClick={() => setDeleteId(detail._id)}
                  className="text-red-500 cursor-pointer hover:text-red-700"
                >
                  Delete
                </p>
                <p
                  onClick={() => navigate(`/collaborate?id=${detail._id}`)}
                  className="text-neutral-500 cursor-pointer hover:text-neutral-700"
                >
                  Collaborate
                </p>
              </div>
            </div>
            <Editor
              height="400px"
              language={detail.language}
              defaultValue={detail.code}
              onChange={(value) =>
                setCodeMap((prev) => ({ ...prev, [detail._id]: value || "" }))
              }
              theme="vs-dark"
              className="rounded-2xl mt-7"
            />
          </div>
        ))}

        {deleteId && (
          <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-opacity-50">
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex flex-col gap-2 items-center mt-2 bg-neutral-700 p-10 rounded-2xl"
            >
              <p className="text-sm mt-2 font-bold">
                Are you sure you want to delete?
              </p>
              <div className="flex gap-10 mt-5">
                <button
                  onClick={handleDelete}
                  className="text-black bg-white p-2 hover:bg-neutral-300 cursor-pointer w-[100px] rounded-2xl"
                >
                  Yes
                </button>
                <button
                  onClick={() => setDeleteId(null)}
                  className="text-black bg-white p-2 w-[100px] hover:bg-neutral-300 cursor-pointer rounded-2xl"
                >
                  No
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      <div className="py-7 px-2 text-white bg-gradient-to-br from-yellow-400 via-orange-500 via-red-600 to-purple-800 animate-pulse-slow mx-2 md:mx-10 rounded-2xl mt-10">
        <div className="flex justify-between">
          <div className="text-9xl">
            codeIt
            <div className="flex justify-between w-full">
              <p className="text-sm ml-2 mt-2 text-neutral-200">
                2025 @all rights reserved
              </p>
              <p className="text-sm ml-2 mt-2 text-neutral-200">
                Made with 🤍 by Navin Venkat
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllSnippets;
