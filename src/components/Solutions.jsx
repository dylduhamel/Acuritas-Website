import React from 'react'
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { solutions } from '../constants';
import { fadeIn, textVariant } from '../utils/motion'
import { SectionWrapper } from '../hoc';

const SolutionCard = ({ index, title, info }) => {
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

const Solutions = () => {
    return (
     <>
        <motion.div variants={textVariant()}>
        <h2 className={styles.sectionHeadText}>Our Solutions</h2>
        </motion.div>
        
        <motion.div
            variants={fadeIn("", "", 0.1, 1)}
            className='mt-4 text-secondary text-[17px] leading-[30px] grid grid-cols-2 gap-8'
        >
            <div>
                <p className={styles.sectionMidText}>Bespoke AI Solutions, Tailored for Your Success</p>
                At Acuritas AI, we understand that every business is unique. That's why we don't just offer services—we offer solutions. Each AI tool and strategy we deploy is meticulously tailored to meet your specific business goals and challenges.
            </div>

            <div>
                <p className={styles.sectionMidText}>Expert Guidance Every Step of the Way</p>
                Navigating the complex landscape of AI technology can be daunting, but you’re not alone. Our dedicated AI specialists work hand-in-hand with you to pinpoint the most impactful applications for your needs. We guide you through the entire process, from initial consultation to seamless integration with your existing IT infrastructure.
            </div>

            <div>
                <p className={styles.sectionMidText}>Ahead of the Curve, So You Don't Have To Be</p>
                AI is an ever-evolving field, but rest assured, we're always one step ahead. We stay up-to-date with the latest advancements, ensuring you're equipped with cutting-edge solutions that propel your business to new heights.
            </div>

            <div>
                <p className={styles.sectionMidText}>Your AI Journey, Simplified</p>
                You don’t have to worry about choosing the right tools or technologies. We take the guesswork out of the equation. Simply put, our expertise becomes your asset. From state-of-the-art chatbots and content generation systems to AI-enhanced automation tools, we implement solutions that best fit your operations, driving unparalleled efficiency and growth.
            </div>
        </motion.div>
      
        <div className='mt-20 flex flex-wrap gap-40 justify-center items-center'>
        {solutions.map((solution, index) => (
            <SolutionCard key={solution.title} index={index} {...solution} />
        ))}
        </div>
     </>
    )
}

export default SectionWrapper(Solutions, "solutions")