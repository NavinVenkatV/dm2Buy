import { motion } from "framer-motion";

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

export default function CollaborationSection() {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInGlass}
      className="mt-20 lg:mx-56 backdrop-blur-md rounded-2xl p-2 shadow-lg"
    >
      <div className="text-3xl md:text-5xl text-center my-10 text-neutral-600">
        Collaborate and learn
      </div>
      <img
        src="image.png"
        alt="code"
        className="rounded-xl object-cover w-full h-auto"
      />
    </motion.div>
  );
}
