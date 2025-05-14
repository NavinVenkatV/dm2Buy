import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom'
function Footer() {
    const naviagate = useNavigate();
    return (
        <motion.div
        initial={{y:50}}
        whileInView={{y:0}}
        transition={{duration:0.4, ease:'easeInOut'}}
         className=" py-7 px-2 text-white bg-gradient-to-br from-yellow-400 via-orange-500 via-red-600 to-purple-800 animate-pulse-slow mx-2 md:mx-10 rounded-2xl mt-10">
            <div className='flex justify-between'>
                <div>
                    <p className='text-5xl md:text-9xl'>CodeIt</p>
                    <ul className='font-bold text-neutral-400'>
                        <li
                        onClick={() =>{
                            naviagate('/docs')
                        }}
                         className='cursor-pointer hover:text-neutral-500 '>Docs</li>
                        <li>Terms and Condition</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
            </div>
        </motion.div>
    )
}

export default Footer
