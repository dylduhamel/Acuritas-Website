import React, { useState, useEffect } from "react";
// import ParallaxTilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { solutions } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const SolutionCard = ({ index, title, info }) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)} className="xs:w-[250px] w-full green-pink-gradient p-[3px] rounded-[20px] shadow-card">
      {/* <ParallaxTilt
        tiltMaxAngleX={45}
        tiltMaxAngleY={45}
        scale={1}
        transitionSpeed={450}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      > */}
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className="bg-[#151030] rounded-[20px] py-8 px-2 min-h-[350px] flex justify-evenly items-center flex-col"
        >
          <h3 className="text-white text-[22px] font-bold text-center mb-4">
            {title}
          </h3>
          <div className="text-white tracking-wider text-[14px]">
            {info.split("-").map((phrase, idx) => (
              <div
                key={idx}
                style={{
                  paddingLeft: "1em",
                  textIndent: "-1em",
                  marginBottom: "0.5em",
                }}
              >
                • {phrase}
              </div>
            ))}
          </div>
        </div>
      {/* </ParallaxTilt> */}
    </motion.div>
  );
};

const Solutions = () => {
    return (
        <div style={{ marginBottom: 50, marginLeft: 40, marginRight: 40 }}>
            <div className="flex flex-wrap gap-20 justify-center items-center">
                {solutions.map((solution, index) => (
                    <SolutionCard key={solution.title} index={index} {...solution} />
                ))}
            </div>
        </div>
    );
};
  

export default Solutions;
