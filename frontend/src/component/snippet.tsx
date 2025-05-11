import { Editor } from '@monaco-editor/react';
import Header from './header';
import { useState } from 'react';
import axios from 'axios';

function Snippet() {
    const [language, setLanguage] = useState("javascript");
    const [code, setCode] = useState('')
    const [title, setTitle] = useState('')

    const handleSubmit = async () => {
        try {
            if(code === ''){
                alert("Snippet is empty")
                return;
            }
            // const token = localStorage.getItem('token')
            // const splitToken = token && token.split(' ')[1];
            await axios.post('http://localhost:3000/api/snippet/createSnippet', {
                code : code,
                language : language,
                title:  title,
                userId: '681fa69c2ace49539a5a1025'
            })
            alert("submitted successfully")
        }catch(e){
            alert (e);
            console.log("error submitting snippet")
        }
    }

    return (
        <div>
            <div className="fixed top-0 left-0 z-50 px-10  md:px-56 w-full">
                <Header />
            </div>

            <div className='mt-32 mx-10  md:mx-56'>
                <div className="flex justify-between items-center text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 via-orange-500 via-red-600 to-purple-800 my-10">
                    <div className='text-2xl'>Store & collaborate on code snippets</div>
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
                </div>
                <Editor
                    height="500px"
                    language={language}
                    defaultValue=""
                    theme="vs-dark"
                    className="rounded-2xl"
                    onChange={(e) =>{ 
                        setCode(e || '')
                    }}
                />
                <div className='mt-7 flex justify-between'>
                    <input
                    onChange={(e) =>{
                        setTitle(e.target.value)
                    }}
                     type="text" placeholder='Enter suitable title for the Code snippet *' 
                    className='focus:outline-none border border-neutral-700 px-2 rounded-xl w-[50vw]'/>
                     <button
                        onClick={() =>{
                            handleSubmit()
                        }}
                            className="bg-white px-4 py-2 cursor-pointer rounded-xl text-black hover:bg-neutral-200">
                            Save
                        </button>
                </div>
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

export default Snippet;
