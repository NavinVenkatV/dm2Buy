import { Editor } from '@monaco-editor/react';
import Header from './header';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './ui/footer';
import { motion } from "framer-motion";
import { useSelector} from "react-redux"
import type { RootState } from '../store';
// import { useNavigate } from 'react-router-dom';
// import { setLogin } from '../store/slice/globalSlice';

function Snippet() {
    // const dispatch = useDispatch();
    const isLogin = useSelector((state: RootState) => state.global.isLogin);
    const [language, setLanguage] = useState("javascript");
    const [code, setCode] = useState('')
    const [title, setTitle] = useState('')

    useEffect(() =>{
        window.scrollTo(0,0)
    },[])

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

    const handleSubmit = async () => {
        try {
            if (code === '') {
                alert("Snippet is empty")
                return;
            }
            const token = localStorage.getItem('token')
            console.log("ttttttttttttttttttttttttttt", token)
            await axios.post('https://dm2buy.onrender.com/api/snippet/createSnippet', {
                language,
                code,
                title
            }, {
                headers: {
                    Authorization: token
                }
            });

            alert("submitted successfully")
        } catch (e) {
            alert(e);
            console.log("error submitting snippet")
        }
    }

    return (
        <div>
            <div className="fixed top-0 left-0  z-50 px-2 lg:px-56  w-full">
                <Header />
            </div>
            <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
             className='mt-32 mx-2  lg:mx-56'>
                <motion.div
                    variants={fadeInUp} 
                    className="mt-10">
                    <motion.h2
                    variants={fadeInUp}
                     className="text-2xl font-semibold  mb-4">⚡ How to Use CodeIt</motion.h2>
                    <p className=" mb-4">
                        Getting started with <span className="font-bold">CodeIt</span> is simple and intuitive. Just follow the steps below to write and save your code effortlessly:
                    </p>
                    <ul className="list-decimal list-inside space-y-2">
                        <li><span className="font-medium">Choose a Programming Language</span>: Select your preferred language from the dropdown (e.g., JavaScript, Python, C++, etc.).</li>
                        <li><span className="font-medium">Start Coding</span>: Begin typing your code in the real-time collaborative editor with syntax highlighting.</li>
                        <li><span className="font-medium">Give It a Title</span>: Add a meaningful title to your snippet so it's easier to identify later.</li>
                        <li><span className="font-medium">Click Save</span>: Save your code securely with one click. Your snippet will be stored and accessible anytime.</li>
                    </ul>
                    <p className=" mt-4">
                        Whether you're experimenting, collaborating, or storing reusable code — <span className="font-bold">CodeIt</span> makes it seamless and productive.
                    </p>
                </motion.div>


                <motion.div
                variants={fadeInUp}
                 className="flex justify-between items-center text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 via-orange-500 via-red-600 to-purple-800 my-10">
                    <div className='text-xl md:text-2xl'>Store & collaborate on code snippets</div>
                    <div className='flex gap-4'>
                        <select
                            id="language_selector"
                            className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:outline-none cursor-pointer w-full p-2.5"
                            onChange={(e) => setLanguage(e.target.value)}
                            value={language}
                        >
                            <option value="javascript">JavaScript</option>
                            <option value="cpp">C++</option>
                            <option value="python">Python</option>
                            <option value="java">Java</option>
                            <option value="jsx">Jsx</option>
                        </select>
                    </div>
                </motion.div>
                <Editor
                    height="500px"
                    language={language}
                    defaultValue="//const taskInput = document.getElementById('taskInput');
//const addButton = document.getElementById('addButton');
//const taskList = document.getElementById('taskList');

// Event listener for adding tasks
//addButton.addEventListener('click', addTask);

// Function to add a new task
//function addTask() {
  //const taskText = taskInput.value.trim();
  //if (taskText !== '') {
    //const listItem = document.createElement('li');
    //listItem.textContent = taskText;
    //taskList.appendChild(listItem);
    //taskInput.value = '';
  //}
//}"
                    theme="vs-dark"
                    className="rounded-2xl"
                    onChange={(e) => {
                        setCode(e || '')
                    }}
                />
                <motion.div variants={fadeInUp} className='mt-7 flex justify-between'>
                    <input
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                        type="text" placeholder='Todo App*'
                        className='focus:outline-none border border-neutral-700 px-2 rounded-xl w-[50vw]' />
                    <button
                        onClick={() => {
                            handleSubmit()
                        }}
                        className={`bg-white px-4 py-2 ${isLogin ? 'cursor-pointer' : 'cursor-not-allowed'} rounded-xl text-black hover:bg-neutral-200`}>
                        Save
                    </button>
                </motion.div>
            </motion.div>

            <Footer />
        </div>
    );
}

export default Snippet;
