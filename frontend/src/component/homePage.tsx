import Header from './header';
import UseCase from './ui/useCase';
import { useNavigate } from 'react-router-dom';
import Lenis from "@studio-freight/lenis";
import { useEffect, useState } from 'react';
import Login from './login';
import { motion } from "framer-motion";
import CollaborationSection from './ui/codeImage';
import Footer from './ui/footer';

function Home() {
  const [checkUserAuth, setCheckUserAuth] = useState(false);
  const [login, setLogin] = useState(false);

  useEffect(() =>{
        window.scrollTo(0,0)
    },[])

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


  useEffect(() => {
    const token = localStorage.getItem('token');
    setCheckUserAuth(!!token);
  }, []);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <div className="fixed top-0 left-0 z-50 px-2 lg:px-56 w-full">
        <Header setLogin={setLogin} login={login} />
      </div>

      {login && (
        <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-opacity-50">
          <Login setLogin={setLogin} />
        </div>
      )}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 px-5 flex flex-col items-center gap-4 mx-2 lg:mx-56 mt-32 rounded-xl pb-8 bg-gradient-to-b from-neutral-900 to-neutral-800"
      >
        <motion.div
          variants={fadeInUp}
          className="bg-gradient-to-br from-[#0f0f0f] via-[#0b1b33] border-1 border-neutral-800 to-[#000000] animate-gradient text-sm rounded-2xl px-5 py-1 mt-16"
        >
          Currently in beta v1.0
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="max-w-4xl text-center text-3xl md:text-6xl"
        >
          Store & collaborate on code snippets✨in real time
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className='text-neutral-400 text-center'
        >
          Create. Share. Collaborate. Code, simplified.
        </motion.div>

        <motion.button
          variants={fadeInUp}
          onClick={() => {
            checkUserAuth ? navigate('/snippet') : setLogin(true);
          }}
          className="bg-white px-4 py-2 cursor-pointer rounded-xl text-black hover:bg-neutral-200"
        >
          Let's Code
        </motion.button>

        <div className='mt-2 mx-2 '>
          <motion.div
            variants={fadeInUp}
            className='text-3xl md:text-5xl text-center my-10 text-neutral-600'
          >
            Workflow of codeIt
          </motion.div>
          <motion.video
            variants={fadeInUp}
            src="v2.mp4"
            loop
            autoPlay
            muted
            playsInline
            preload='auto'
          />
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.3 }}
        className="items-center gap-4 mt-20 mx-2 lg:mx-56"
      >
        <motion.div
          variants={fadeInUp}
          className="lg:flex justify-between w-full"
        >
          <motion.div
            variants={fadeInUp}
            className="text-5xl max-w-sm text-neutral-500 flex justify-center items-center bg-white/10 backdrop-blur-md rounded-xl p-4"
          >
            Real Time Collaboration
          </motion.div>
          <motion.div variants={fadeInUp}>
            <UseCase
              title="Store Snippets Easily"
              content="Store your valuable code snippets securely in one place, making it easier to access them whenever you need. Organize them by project or programming language, so you can find the right snippet with just a few clicks. Never worry about losing a useful piece of code again."
            />
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="lg:flex justify-between w-full my-10 mt-7"
        >
          <motion.div variants={fadeInUp}>
            <UseCase
              title="Real-Time Collaboration"
              content="Work on code together with your teammates in real-time, making collaboration seamless and efficient. Any changes made by collaborators are instantly visible, enabling faster iteration and problem-solving. Real-time editing brings a new level of productivity to your team."
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <UseCase
              title="Multi-Language Support"
              content="Our platform supports multiple programming languages, ensuring that you can write, edit, and preview code in the language of your choice. Whether youre working on Python, JavaScript, or any other language, youll get instant feedback on your code. It’s a unified environment for all your coding needs."
            />
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="lg:flex justify-between w-full"
        >
          <motion.div variants={fadeInUp}>
            <UseCase
              title="Share with Control"
              content="Share your snippets with colleagues, friends, or the community while retaining control over who can view or edit your code. With customizable permissions, you can collaborate securely and confidently. Keep your code safe while sharing your knowledge and expertise."
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <img
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY25xMDgwNXZoM2tlNHN0NmdmdThlcmg5cmp5cTJxYXMzMmc4b3k3biZlcD12MV9naWZzX3NlYXJjaCZjdD1n/aQwvKKi4Lv3t63nZl9/giphy.gif"
              alt="collaboration gif"
            />
            <p className="text-center text-orange-300 font-bold italic">
              Thank You for Visiting us!
            </p>
          </motion.div>
        </motion.div>
      </motion.div>


      <CollaborationSection/>

      <Footer/>
    </div>
  );
}

export default Home;
