import React from 'react'
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion'
import { SectionWrapper } from '../hoc';


const About = () => {
  return (
   <>
    <motion.div variants={textVariant()}>
      <p className={styles.sectionSubText}>About</p>
      <h2 className={styles.sectionHeadText}>Who We Are</h2>
    </motion.div>
    
    <motion.p
      variants={fadeIn("", "", 0.1, 1)}
      className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
    >
    Acuritas AI stands as your comprehensive AI development ally, guiding you from the initial idea to its full-fledged execution and even further. More than just experts in machine learning, we're the dedicated crew that assists both budding startups and established enterprises in crafting state-of-the-art AI tools that enhance productivity and drive expansion. With a blend of technical acumen, financial expertise, and a deep grasp of operational workflows, we provide bespoke solutions like cutting-edge chatbots, content generation systems, and AI-powered automation tools to boost your operational efficiency. Navigating you through every phase, we're committed to helping you forge a groundbreaking product that propels your business to new heights.
    </motion.p>
   </>
  )
}

export default SectionWrapper(About, "about")