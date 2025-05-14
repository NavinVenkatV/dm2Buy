import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./header";
import { Editor } from "@monaco-editor/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "./ui/footer";

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
        <div className="my-5">
          <h2 className="text-2xl font-bold  mb-4"> Your Snippets</h2>
          <p className=" mb-2">
            Here you'll find all your saved code snippets. Whether you're organizing reusable code or reviewing previous work, everything is just a scroll away.
          </p>
          <ul className="list-disc list-inside  space-y-2">
            <li><span className="font-medium">View</span>: Scroll through your existing code snippets with ease.</li>
            <li><span className="font-medium">Update</span>: Click the <span className="text-neutral-500 font-semibold">Update</span> button to modify and enhance your code.</li>
            <li><span className="font-medium">Delete</span>: Remove outdated or unwanted snippets by pressing the <span className="text-red-500 font-semibold">Delete</span> button.</li>
            <li><span className="font-medium">Collaborate</span>: Share your snippet and work in real-time with others by hitting the <span className="text-neutral-500 font-semibold">Collaborate</span> button.</li>
          </ul>
          <p className=" mt-4">
            Manage your code effortlessly and stay organized with <span className="font-bold">CodeIt</span>.
          </p>
        </div>

        {snippets.map((detail, ind) => (
          <div key={ind} className="mb-10">
            <div className="w-full rounded-xl flex justify-between items-center p-2 border border-neutral-700">
              <div className="text-neutral-500">Title: {detail.title}</div>
              <div className="flex gap-4 items-center">
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
                  onClick={() => {
                    navigate(`/collaborate?id=${detail._id}`)
                  }}
                  className="cursor-pointer bg-orange-300 hover:bg-orange-500 font-bold transition-all duration-300 ease-in-out text-black rounded-2xl text-sm p-1 hidden md:block">Collaborate!</p>
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
      <Footer />
    </div>
  );
}

export default AllSnippets;
