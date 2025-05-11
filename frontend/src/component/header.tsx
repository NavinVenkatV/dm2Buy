import { useNavigate } from "react-router-dom";
import Hamburger from 'hamburger-react'
import { useEffect, useState } from "react";

function Header({ setLogin, login }: {
    setLogin?: any,
    login?: any
}) {
    const navigate = useNavigate();
    const [isOpen, setOpen] = useState(false)
    const [isUser, setIsUser] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setIsUser(true)
        }
    },[isUser])

    const handleLogOut = async () =>{
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
                <p className="cursor-pointer hover:text-neutral-300 hidden md:block">Docs</p>
                <p
                    onClick={() => {
                        { login ? setLogin(true) : navigate('/allSnippets') }
                    }}
                    className="cursor-pointer hover:text-neutral-300 hidden md:block">Snippets</p>
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
                        setLogin(true)
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