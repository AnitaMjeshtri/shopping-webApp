/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
const animationConfiguration = {
  initial: {
    opacity: 0,
    height: 0,
  },
  animate: {
    opacity: 1,
    height: "100vh",
  },
  exit: {
    opacity: 0,
    height: 0,
  },
};

const Transitions = ({children}) => {
  return (
    <div className="absolute inset-0 bg-gray-800"
    style={{ background: 'rgba(0, 0, 0, 0.1)' }}>
    <motion.div
      className="relative z-50 w-full bg-white"
      variants={animationConfiguration}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{duration: .3}}
    >
      {children}
    </motion.div>
    </div>
  );
};

export default Transitions;