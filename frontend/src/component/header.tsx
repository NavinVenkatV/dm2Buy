import { useNavigate } from "react-router-dom";
import Hamburger from 'hamburger-react'
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setLogin } from '../store/slice/globalSlice';
import type { RootState } from '../store';
import { setCollab } from "../store/slice/collabSlice";
import {motion} from 'framer-motion'

function Header() {
    const navigate = useNavigate();
    const [isOpen, setOpen] = useState(false)
    const [isUser, setIsUser] = useState(false)
    const dispatch = useDispatch();
    const isLogin = useSelector((state: RootState) => state.global.isLogin);

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

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setIsUser(true)
        }
    }, [isLogin])

    const handleLogOut = async () => {
        localStorage.removeItem('token')
        setIsUser(false)
    }

    return (
        <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className=" mt-10 border border-neutral-800 px-2  md:px-5 py-2 rounded-2xl bg-neutral-900/80 backdrop-blur-sm">
            <motion.div variants={fadeInUp} className="flex justify-between">
                <div className="flex gap-4 items-center">
                    <span
                        onClick={() => {
                            navigate('/')
                        }}
                        className="font-bold cursor-pointer">codeIt</span>
                    <p
                        onClick={() => {
                            navigate('/')
                        }}
                        className="cursor-pointer hover:text-neutral-300 hidden md:block">Home</p>
                    <a href="/navinvenkat.xyz"
                    
                        className="cursor-pointer font-bold bg-orange-300 hover:bg-orange-500 transition-all duration-300 ease-in-out text-black rounded-2xl text-sm p-1 hidden md:block">We are Hiring!</a>
                    <p

                        onClick={() => {
                            navigate('/docs')
                        }}
                        className="cursor-pointer hover:text-neutral-300 hidden md:block">Docs</p>

                    {isUser && (
                        <p
                            onClick={() => {
                                navigate('/allSnippets')
                            }}
                            className="cursor-pointer hover:text-neutral-300 hidden md:block">Snippets</p>
                    )}
                    <button
                        onClick={() => {
                            dispatch(setCollab(true))
                        }}
                        className="bg-gradient-to-br  rounded-xl px-2  border border-neutral-700 cursor-pointer from-black via-purple-900 via-blue-950 to-black ">Collaborate</button>

                </div>
                {isUser ?
                    <button
                        onClick={() => {
                            handleLogOut()
                        }}
                        className="bg-white cursor-pointer px-4 py-2 rounded-xl text-black hover:bg-neutral-200 hidden md:block">
                        Log Out
                    </button>
                    : <div className="gap-4 items-center hidden md:flex">
                        {/* <button className="text-neutral-300 hover:text-white hidden md:block">Log In</button> */}
                        <button
                            onClick={() => {
                                dispatch(setLogin(true))
                            }}
                            className="bg-white cursor-pointer px-4 py-2 rounded-xl text-black hover:bg-neutral-200 hidden md:block">
                            Get Started
                        </button>
                    </div>}
                <div className="md:hidden">
                    <Hamburger toggled={isOpen} toggle={setOpen} size={20} />
                </div>
            </motion.div>
            {isOpen && (
                <motion.div variants={container} initial="hidden" animate="show" className=" bg-black p-2 rounded-2xl flex flex-col gap-3">
                    <motion.p variants={fadeInUp}
                        onClick={() => {
                            navigate('/')
                        }}
                        className="cursor-pointer hover:text-neutral-300 ">Home</motion.p>
                    <motion.a href="/navinvenkat.xyz" variants={fadeInUp}
                        // onClick={() => {
                        //     navigate('/')
                        // }}
                        className="cursor-pointer font-bold  transition-all duration-300 ease-in-out rounded-2xl   ">We are Hiring!</motion.a>
                    <motion.p variants={fadeInUp}
                    

                        onClick={() => {
                            navigate('/docs')
                        }}
                        className="cursor-pointer hover:text-neutral-300 ">Docs</motion.p>

                    {isUser ? (
                        <div className="flex flex-col gap-4">
                            <motion.p variants={fadeInUp}
                                onClick={() => {
                                    navigate('/allSnippets')
                                }}
                                className="cursor-pointer hover:text-neutral-300 ">Snippets</motion.p>
                            <motion.button variants={fadeInUp}
                                onClick={() => {
                                    handleLogOut()
                                }}
                                className="cursor-pointer  rounded-xl text-white">
                                Log Out
                            </motion.button>
                        </div>
                    ) : (
                        <motion.div variants={fadeInUp}>
                            <button
                                onClick={() => {
                                    dispatch(setLogin(true))
                                }}
                                className=" cursor-pointer rounded-xl text-orange-300 ">
                                Get Started
                            </button>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </motion.div>
    );
}

export default Header;