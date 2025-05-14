import { useDispatch } from "react-redux"
import { setCollab } from "../../store/slice/collabSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RoomId() {

    const navigate = useNavigate()
    const [id, setId] = useState('')
    const dispatch = useDispatch();
    return (
        <div className="fixed  inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-opacity-50">
            <div
                className="flex bg-gradient-to-br max-w-xl from-black via-purple-900 via-blue-950 to-black  flex-col gap items-center mt-2 bg-neutral-700 p-10 rounded-2xl"
            >
                <p className="text-center text-lg text-neutral-300 mb-4">
                    Have a <span className="font-semibold text-white">Room ID</span>?  Paste it below and jump right into your shared coding space.
                    Collaborate with friends, teammates, or classmates — live and in sync.
                </p>
                <input
                    onChange={(e) => {
                        setId(e.target.value)
                    }}
                    type="text" placeholder="123958740800" className="bg-neutral-900 rounded-xl p-2 focus:outline-none" />
                <button
                    onClick={() => {
                        dispatch(setCollab(false))
                        {id && navigate(`/collaborate?id=${id}`)}
                    }}
                    className="mt-2 text-neutral-500 hover:text-neutral-400 cursor-pointer ">Enter</button>
            </div>
        </div>
    )
}

export default RoomId
