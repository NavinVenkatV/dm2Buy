import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Optional if using react-router

function Footer() {
    return (
        <motion.footer
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-gradient-to-br from-[#1a1c40] via-[#3f2b96] to-[#a8c0ff]
jsx
Copy
Edit
 text-white py-10 px-4 md:px-20 mt-16 rounded-t-3xl"
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                <div className="flex items-center gap-4">
                    <img src="logo.png" alt="Logo" width={60} height={60} className="rounded-md" />
                    <div>
                        <h2 className="text-2xl font-bold">CodeIt</h2>
                        <p className="text-sm text-gray-400">Empowering developers to build faster.</p>
                    </div>
                </div>

                {/* Links */}
                <div className="flex flex-col md:flex-row gap-8 text-sm">
                    <div className="flex flex-col gap-2">
                        <span className="font-semibold text-gray-300">Product</span>
                        <Link to="/" className="hover:underline text-gray-400">Features</Link>
                        <Link to="/" className="hover:underline text-gray-400">Documentation</Link>
                        <Link to="/" className="hover:underline text-gray-400">Pricing</Link>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="font-semibold text-gray-300">Company</span>
                        <Link to="/" className="hover:underline text-gray-400">About Us</Link>
                        <Link to="/" className="hover:underline text-gray-400">Terms</Link>
                        <Link to="/" className="hover:underline text-gray-400">Privacy</Link>
                    </div>
                </div>
            </div>

            {/* Divider and Copyright */}
            <div className="border-t border-gray-800 mt-10 pt-6 text-center text-black text-sm">
                © {new Date().getFullYear()} CodeIt. Built by Navin Venkat.
            </div>
        </motion.footer>
    );
}

export default Footer;
