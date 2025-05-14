import { useNavigate } from "react-router-dom";
import Hamburger from 'hamburger-react'
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setLogin } from '../store/slice/globalSlice';
import type { RootState } from '../store';
import { setCollab } from "../store/slice/collabSlice";

function Header() {
    const navigate = useNavigate();
    const [isOpen, setOpen] = useState(false)
    const [isUser, setIsUser] = useState(false)
    const dispatch = useDispatch();
    const isLogin = useSelector((state: RootState) => state.global.isLogin);


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
        <div className="flex justify-between mt-10 border border-neutral-800 px-2  md:px-5 py-2 rounded-2xl bg-neutral-900/80 backdrop-blur-sm">
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
                <p
                    onClick={() => {
                        navigate('/')
                    }}
                    className="cursor-pointer font-bold bg-orange-300 hover:bg-orange-500 transition-all duration-300 ease-in-out text-black rounded-2xl text-sm p-1 hidden md:block">We are Hiring!</p>
                <p

                    onClick={() => {
                        navigate('/docs')
                    }}
                    className="cursor-pointer hover:text-neutral-300 hidden md:block">Docs</p>

                {isUser && (
                    <p
                        onClick={() => {
                            { isLogin ? setLogin(true) : navigate('/allSnippets') }
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

        </div>
    );
}

export default Header;