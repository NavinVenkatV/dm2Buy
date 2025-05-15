"use client"
import { useState } from 'react'
// import { signIn } from 'next-auth/react';
import { motion } from "framer-motion";
import axios from 'axios';
import {  useDispatch } from 'react-redux';
import {  setLogin } from '../store/slice/globalSlice';
// import type { RootState } from '../store';

function Login() {
    // const isLogin = useSelector((state: RootState) => state.global.isLogin);
    const [newUser, setNewUser] = useState(false)
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [pass, setPass] = useState('');
    // const [load, setLoad] = useState(false);
    // const [msg, setMsg] = useState("Submit")
    const [error, setError] = useState('');
    const dispatch = useDispatch();


    const handleNewSubmit = async () => {
        try {
            // setLoad(true)
            if (!name || !mail || !pass) {
                alert("Every inputs needed")
                return;
            }
            const res = await axios.post('https://dm2buy.onrender.com/api/user/register', {
                userName: name,
                email: mail,
                password: pass
            })
            if (res) {
                // setMsg("Registered! Login To continue!")
                // setLoad(false)
            }
        } catch (e: any) {
            const message = e.response?.data?.message || "Something went wrong";
            setError(message);
            console.log(e)
        }
    }

    const handleOldSubmit = async () => {
        try {
            // setLoad(true)
            if (!mail || !pass) {
                alert("all inputs needed")
                return;
            }
            const res = await axios.post('https://dm2buy.onrender.com/api/user/login', {
                email: mail,
                password: pass
            })
            if (res) {
                const token = res.data.token;
                localStorage.setItem('token', `Bearer ${token}`);
                dispatch(setLogin(false))
                // setLoad(false)
            }
        } catch (e: any) {
            const message = e.response?.data?.message || "Something went wrong";
            setError(message);
            console.log(e)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className='bg-gradient-to-b from-[#0a0a0a] via-[#1e1e2e] to-[#000000]
 rounded-2xl w-[350px] md:w-[600px] h-[400px] text-white flex justify-center'>
            <div className='flex flex-col justify-center'>
                <div className='text-center'>
                    <div className='text-3xl md:text-4xl'>Welcome Back!</div>
                    {error && (
                        <div className='text-center text-red-900 font-bold'>{error}</div>
                    )}
                    {newUser ?
                        <motion.div
                            initial={{ y: -10 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                            className='flex flex-col gap-2 items-center mt-2'>
                            <p className='text-sm mt-2 font-bold'>Sign In to continue your journey</p>
                            <input
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}
                                type="text" placeholder='Enter Username' className='focus:outline-none w-full border-neutral-600 border p-2 rounded-xl' />
                            <input
                                onChange={(e) => {
                                    setMail(e.target.value)
                                }}
                                type="text" placeholder='Enter email' className='focus:outline-none w-full border-neutral-600 border p-2 rounded-xl' />
                            <input
                                onChange={(e) => {
                                    setPass(e.target.value)
                                }}
                                type="password" placeholder='Enter password' className='focus:outline-none w-full border-neutral-600 border p-2 rounded-xl' />
                            <p
                                onClick={() => {
                                    setName('')
                                    setMail('')
                                    setPass('')
                                    setNewUser(prev => !prev)
                                }}
                                className='text-center underline mt-2 cursor-pointer'>Login?</p>
                            <p
                                onClick={() => { handleNewSubmit() }}
                                className='mt-1 hover:font-bold hover:text-white text-neutral-400
                        transition-all duration-300 ease-in-out cursor-pointer'>Submit</p>
                            <p
                                onClick={() => {
                                    dispatch(setLogin(false))
                                }}
                                className='text-center text-neutral-600 hover:text-neutral-400 cursor-pointer'>Close</p>
                        </motion.div> :
                        <motion.div
                            initial={{ y: -10 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                            className='flex flex-col gap-2 items-center mt-2'>
                            <p className='text-sm mt-2 font-bold'>Log In to continue your journey</p>
                            <input
                                onChange={(e) => {
                                    setMail(e.target.value)
                                }}
                                type="text" placeholder='Enter email' className='focus:outline-none w-full border-neutral-600 border p-2 rounded-xl' />
                            <input
                                onChange={(e) => {
                                    setPass(e.target.value)
                                }}
                                type="password" placeholder='Enter password' className='focus:outline-none w-full border-neutral-600 border p-2 rounded-xl' />
                            <p
                                onClick={() => {
                                    setName('')
                                    setMail('')
                                    setPass('')
                                    setNewUser(prev => !prev)
                                }}
                                className='text-center underline mt-2 cursor-pointer'>New User?</p>
                            <p
                                onClick={() => { handleOldSubmit() }}
                                className='mt-1 hover:font-bold hover:text-white text-neutral-400
                        transition-all duration-300 ease-in-out cursor-pointer'>Submit</p>
                            <p
                                onClick={() => {
                                    dispatch(setLogin(false))
                                }}
                                className='text-center text-neutral-600 hover:text-neutral-400 cursor-pointer'>Close</p>
                        </motion.div>}
                </div>
            </div>
        </motion.div>
    )
}

export default Login