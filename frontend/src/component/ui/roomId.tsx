import { useDispatch } from "react-redux"
import { setCollab } from "../../store/slice/collabSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"

function RoomId() {


    const fadeInGlass = {
        hidden: {
            opacity: 0.4,
            filter: "blur(10px)",
            scale: 0.95,
        },
        show: {
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut",
            },
        },
    };

    const navigate = useNavigate()
    const [id, setId] = useState('')
    const dispatch = useDispatch();
    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInGlass}
            className="fixed  inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-opacity-50">
            <div
                className="flex bg-gradient-to-br from-[#1a1c40] via-[#3f2b96] to-[#a8c0ff]
 max-w-lg mx-3   flex-col gap items-center mt-2 bg-neutral-700 p-4 rounded-2xl"
            >
                <p className="text-center text-neutral-300 mb-4">
                    Have a <span className="font-semibold text-white">Room ID</span>?  Paste it below and jump right into your shared coding space.
                </p>
                <input
                    onChange={(e) => {
                        setId(e.target.value)
                    }}
                    type="text" placeholder="123958740800" className="bg-neutral-900 rounded-xl p-2 focus:outline-none" />
                <button
                    onClick={() => {
                        dispatch(setCollab(false))
                        { id && navigate(`/collaborate?id=${id}`) }
                    }}
                    className="mt-2 text-neutral-300 hover:text-neutral-400 cursor-pointer ">Enter</button>
                    <button className="mt-2 text-neutral-300 cursor-pointer hover:text-neutral-400 " onClick={() =>{
                        dispatch(setCollab(false))
                    }}>Close</button>
            </div>
        </motion.div>
    )
}

export default RoomId
