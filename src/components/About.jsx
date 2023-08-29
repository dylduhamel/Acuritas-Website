import React from 'react'
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { services } from '../constants';
import { fadeIn, textVariant } from '../utils/motion'
import { SectionWrapper } from '../hoc';

const ServiceCard = ({ index, title, info }) => {
  return (
    <Tilt className="xs:w-[250px] w-full">
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)} 
        className='w-full bg-gradient-to-b from-indigo-500 p-[3px] rounded-[20px] shadow-card' 
      >
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450
          }}
          className='bg-[#151030] rounded-[20px] py-8 px-2 min-h-[350px] flex justify-evenly items-center flex-col'
        >
          <h3 className='text-white text-[22px] font-bold text-center mb-4'>{title}</h3>
          <div className='text-white tracking-wider text-[14px]'>
            {info.split("-").map((phrase, idx) => (
              <div 
                key={idx} 
                style={{
                  paddingLeft: '1em',
                  textIndent: '-1em',
                  marginBottom: '0.5em'
                }}
              >
                • {phrase}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Tilt>
  )  
}

const About = () => {
  return (
   <>
    <motion.div variants={textVariant()}>
      <p className={styles.sectionSubText}>About</p>
      <h2 className={styles.sectionHeadText}>Our Services</h2>
    </motion.div>
    
    <motion.p
      variants={fadeIn("", "", 0.1, 1)}
      className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
    >
      Acuritas AI is your full-cycle AI development partner, from concept to production and beyond. We're not just machine learning specialists, we're the team that helps startups and enterprises create cutting-edge AI products that optimize efficiency and accelerate growth. Led by founder Liam Ottley, we guide you through the entire process and shape your ideas into ready-to-go solutions. With our expertise across multiple industries, we'll help you build an innovative product that fosters your company's success.
    </motion.p>

    <div className='mt-20 flex flex-wrap gap-40 justify-center items-center'>
      {services.map((service, index) => (
        <ServiceCard key={service.title} index={index} {...service} />
      ))}
    </div>
   </>
  )
}

export default SectionWrapper(About, "about")