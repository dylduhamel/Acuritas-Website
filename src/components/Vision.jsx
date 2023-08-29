import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { styles } from "../styles"; 
import { SectionWrapper } from "../hoc";

const Vision = () => {
    const text = "leverage Acuritas's comprehensive AI development expertise to maximize your businesses potential";
    const words = text.split(' ');
  
    const wordVariants = {
      hidden: { opacity: 0 },
      visible: (i) => ({
        opacity: 1,
        transition: {
          delay: i * 0.3 // 0.2 seconds delay between each word
        }
      })
    };
  
    const [isVisible, setIsVisible] = useState(false);
    const visionRef = useRef(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // Once the element is visible, we can stop observing
          }
        });
      });
  
      if (visionRef.current) {
        observer.observe(visionRef.current);
      }
  
      return () => {
        if (visionRef.current) {
          observer.unobserve(visionRef.current);
        }
      };
    }, []);
  
    return (
        <div ref={visionRef} className="py-32 flex justify-center items-center">
          <div className="w-7/10 flex flex-wrap justify-center items-center">
            {words.map((word, i) => (
              <motion.span 
                key={i} 
                custom={i} 
                variants={wordVariants} 
                initial="hidden" 
                animate={isVisible ? "visible" : "hidden"} 
                className={`mr-2 ${styles.sectionHeadText} ${word === "AI" || word === "development" ? "text-tertiary" : "text-white"}`}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>
    );    
}    


export default SectionWrapper(Vision, "vision");
