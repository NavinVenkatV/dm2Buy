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
                    <ul className=' text-white'>
                        <li
                        onClick={() =>{
                            naviagate('/docs')
                        }}
                         className='cursor-pointer  '>Docs</li>
                        <li>Terms and Condition</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
            </div>
            <div className='text-center  text-black'>2025 - Navin Venkat</div>
        </motion.div>
    )
}

export default Footer
