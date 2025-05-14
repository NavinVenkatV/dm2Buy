import {motion} from 'framer-motion'
function Footer() {
    return (
        <motion.div
        initial={{y:50}}
        whileInView={{y:0}}
        transition={{duration:0.4, ease:'easeInOut'}}
         className=" py-7 px-2 text-white bg-gradient-to-br from-yellow-400 via-orange-500 via-red-600 to-purple-800 animate-pulse-slow mx-2 md:mx-10 rounded-2xl mt-10">
            <div className='flex justify-between'>
                <div className='text-5xl md:text-9xl'>
                    codeIt
                    <div className='flex justify-between w-full'>
                        <p className='text-sm ml-2 mt-2 text-neutral-200'>
                            Made with 🤍 by Navin Venkat
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Footer
