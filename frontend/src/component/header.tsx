import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between mt-10 border border-neutral-800 px-10  md:px-5 py-2 rounded-2xl bg-neutral-900/80 backdrop-blur-sm">
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
                    className="cursor-pointer hover:text-neutral-300">Home</p>
                <p className="cursor-pointer hover:text-neutral-300">Docs</p>
                <p
                    onClick={() => {
                        navigate('/allSnippets')
                    }}
                    className="cursor-pointer hover:text-neutral-300">Snippets</p>
            </div>
            <div className="flex gap-4 items-center">
                <button className="text-neutral-300 hover:text-white">Log In</button>
                <button className="bg-white px-4 py-2 rounded-xl text-black hover:bg-neutral-200">
                    Sign In
                </button>
            </div>
        </div>
    );
}

export default Header;