import { motion } from 'framer-motion';

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const loadingCircleVariants = {
  start: {
    y: '0%',
  },
  end: {
    y: '100%',
  },
};

const loadingCircleTransition = {
  duration: 0.5,
  yoyo: Infinity,
  ease: 'easeInOut',
};

const Loader = () => {
  return (
    <motion.div
      className='w-32 h-32 flex justify-around'
      variants={loadingContainerVariants}
      initial='start'
      animate='end'
    >
      <motion.span
        className='block w-10 h-10 bg-gray-700 rounded-full'
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <motion.span
        className='block w-10 h-10 bg-gray-700 rounded-full'
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <motion.span
        className='block w-10 h-10 bg-gray-700 rounded-full'
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
    </motion.div>
  );
};

export default Loader;
