import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";

const TeamCard = ({
  index,
  name,
  designation,
  image,
}) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className='bg-[#010B15] p-10 rounded-3xl xs:w-[320px] w-full'
  >
    <div className='mt-1'>
      <img
          src={image}
          alt={`Picture of-${name}`}
          className='w-60 h-60 rounded-full object-cover'
        />
      <div className='mt-7 flex justify-between items-center gap-1'>
        <div className='flex-1 flex flex-col'>
          <p className='text-white font-bold text-[26px]'>
            {name}
          </p>
          <p className='mt-1 text-tertiary text-[19px]'>
            {designation}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

const Team = () => {
  return (
    <div className={`mt-12 bg-[#2e3440] rounded-[20px]`}>
      <div
        className={`bg-[#e5e9f0] rounded-2xl ${styles.padding} min-h-[300px]`}
      >
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Who We Are</p>
          <h2 className={styles.sectionHeadText}>Meet The Team</h2>
        </motion.div>
      </div>
      <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-32 justify-center items-center`}>
        {testimonials.map((testimonial, index) => (
          <TeamCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Team, "team");