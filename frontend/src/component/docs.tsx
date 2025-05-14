import Header from './header'
import Footer from './ui/footer'
import { motion } from "framer-motion"

function Docs() {
    const container = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const fadeInUp = {
        hidden: {
            opacity: 0,
            y: 20,
            filter: "blur(8px)",
        },
        show: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 0.6,
                ease: "easeInOut",
            },
        },
    };
    return (
        <div>
            <div className="fixed top-0 left-0  z-50 px-2 lg:px-56  w-full">
                <Header />
            </div>
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className='mt-32 mx-2  lg:mx-56'>
                <div className="p-6 text-white font-bold">
                    <motion.h1
                        variants={fadeInUp}
                        className="text-3xl text-orange-300 font-bold mb-4">CodeIt - Overview</motion.h1>

                    <motion.div
                        variants={fadeInUp}                    >
                        <p className="mb-4">
                            <strong>CodeIt</strong> is a real-time code collaboration platform that enables developers to write, manage, and share code snippets effortlessly. The goal is to provide a seamless, interactive environment for both solo developers and teams to work together on code with real-time updates and persistent storage. The platform is designed to be responsive, intuitive, and secure.
                        </p>

                        <p className="mb-4">
                            Built with a modern tech stack including <strong>Next.js</strong>, <strong>Tailwind CSS</strong>, <strong>Prisma ORM</strong>, and <strong>PostgreSQL</strong>, CodeIt ensures both frontend performance and backend reliability. For authentication, we use <strong>Clerk</strong> (or optionally <strong>NextAuth</strong>), and UI animations are powered by <strong>Framer Motion</strong> to enhance user interaction with smooth, glass-like transitions.
                        </p>

                        <p className="mb-4">
                            Below are the core features of CodeIt:
                        </p>

                        <ul className="list-disc list-inside space-y-2 mb-4">
                            <li><strong>Real-Time Collaboration:</strong> Collaborate on code with multiple users simultaneously, with instant updates across sessions.</li>
                            <li><strong>Code Snippet Storage:</strong> Securely save, edit, and organize code snippets by language or project for easy access.</li>
                            <li><strong>Multi-Language Support:</strong> Write and preview code in multiple programming languages with syntax highlighting.</li>
                            <li><strong>Sharing with Control:</strong> Share snippets publicly or privately, with access control to manage editing/viewing rights.</li>
                            <li><strong>Clean & Responsive UI:</strong> Built with Tailwind CSS, ensuring fast and elegant rendering on all screen sizes.</li>
                            <li><strong>Glassmorphism Animations:</strong> Enhanced UI/UX using Framer Motion to display animated glass-like overlays and smooth entry effects.</li>
                            <li><strong>Authentication:</strong> Secure login and user management using Clerk or NextAuth, depending on your setup.</li>
                            <li><strong>Scalable Backend:</strong> PostgreSQL with Prisma offers a robust foundation for scaling and querying code-related data.</li>
                        </ul>

                        <p className="mb-4">
                            CodeIt is perfect for developers, teams, educators, or anyone who needs a secure and collaborative way to store and share code snippets in real-time.
                        </p>

                        <div className="mt-2">
                            <h2 className="text-2xl font-bold text-orange-300  mb-4">Ongoing Development & Future Improvements</h2>
                            <p className=" mb-4">
                                We are constantly working to enhance <span className="font-bold">CodeIt</span> into a powerful, seamless platform for developers and learners alike.
                                Our mission is to create an intuitive space where real-time code collaboration feels natural, efficient, and accessible to everyone.
                            </p>
                            <p className="mb-4">
                                Here’s what we’re actively working on and planning to release soon:
                            </p>
                            <ul className="list-disc list-inside  space-y-2">
                                <li><span className="font-medium">Live Cursor Syncing</span>: See exactly where your collaborators are editing in real-time.</li>
                                <li><span className="font-medium">Version History</span>: Automatically save and access previous versions of your code.</li>
                                <li><span className="font-medium">Commenting System</span>: Leave notes, questions, or suggestions right inside the code editor.</li>
                                <li><span className="font-medium">Improved UI/UX</span>: Smoother transitions, better responsiveness, and updated visual polish.</li>
                                <li><span className="font-medium">AI Code Assistant</span>: Integrated AI for autocomplete, explanations, and bug detection.</li>
                                <li><span className="font-medium">Private Workspace</span>: Secure, personal spaces for solo work and draft storage.</li>
                                <li><span className="font-medium">Mobile Support</span>: A responsive mobile-friendly version of the platform.</li>
                                <li><span className="font-medium">Snippet Marketplace</span>: Share and explore useful code snippets from the community.</li>
                            </ul>
                            <p className=" mt-4">
                                We're excited for what's coming and appreciate your support and feedback as we continue to grow <span className="font-bold">CodeIt</span>. Stay tuned!
                            </p>
                        </div>


                        <p className="italic text-sm text-gray-500 mt-3">
                            Created by Navin Venkat • 2025
                        </p>
                    </motion.div>
                </div>

            </motion.div>


            <Footer />
        </div>

    )
}

export default Docs
