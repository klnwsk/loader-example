import { motion } from "framer-motion";
import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  return (
    <>
      <div className="flex justify-center align-middle">
        <Loader />
      </div>
    </>
  );
}

const Loader = () => {
  const [reversePathAnimationTriggered, setReversePathAnimationTriggered] =
    useState(false);

  const [groupAnimationTriggered, setGroupAnimationTriggered] = useState(false);

  const outerTimeoutRef = useRef(null);
  const innerTimeoutRef = useRef(null);

  const handlePathAnimationComplete = () => {
    setReversePathAnimationTriggered(true);
  };

  // const handleGroupAnimationComplete = () => {
  //   setReversePathAnimationTriggered(true);
  // };

  useEffect(() => {
    if (reversePathAnimationTriggered) {
      // Clear any existing outer timeout
      if (outerTimeoutRef.current) {
        clearTimeout(outerTimeoutRef.current);
      }

      outerTimeoutRef.current = setTimeout(() => {
        setReversePathAnimationTriggered(false);

        // Clear any existing inner timeout before setting a new one
        if (innerTimeoutRef.current) {
          clearTimeout(innerTimeoutRef.current);
        }

        innerTimeoutRef.current = setTimeout(() => {
          setGroupAnimationTriggered(false);
        }, 1000); // Adjust delay as needed
      }, 1000); // Delay after reverse path animation completes
    }

    // Cleanup on unmount or before the next effect runs
    return () => {
      if (outerTimeoutRef.current) {
        clearTimeout(outerTimeoutRef.current);
      }
      if (innerTimeoutRef.current) {
        clearTimeout(innerTimeoutRef.current);
      }
    };
  }, [reversePathAnimationTriggered]);

  const initialAnimateValue = { x: 0, y: 0 };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="40"
      fill="none"
      viewBox="0 0 40 31"
    >
      <motion.g
        fill="#3B4768"
        fill-rule="evenodd"
        clip-path="url(#clip0_304_456)"
        clip-rule="evenodd"
        // initial={{ rotateY: 0 }}
        // animate={groupAnimationTriggered ? { rotateY: 360 } : {}}
        // onAnimationComplete={handleGroupAnimationComplete}
        // transition={{ duration: 1 }}
      >
        <motion.path
          id="front-wall"
          d="m0 12.4 10.333 6.2V31L0 24.8V12.4Z"
          opacity=".2"
          initial={{ x: 0, y: 0 }}
          animate={
            reversePathAnimationTriggered
              ? initialAnimateValue
              : { x: 6, y: -2 }
          }
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />
        <motion.path
          id="back-wall"
          d="m19.375 0 10.333 6.2v12.4l-10.333-6.2V0Z"
          opacity=".2"
          initial={{ x: 0, y: 0 }}
          animate={
            reversePathAnimationTriggered
              ? initialAnimateValue
              : { x: -4, y: 4 }
          }
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />
        <motion.path
          id="bottom-wall"
          d="M4.65 24.8 14.983 31l10.334-6.2-10.334-6.2L4.65 24.8Z"
          opacity=".2"
          initial={{ x: 0, y: 0 }}
          animate={
            reversePathAnimationTriggered
              ? initialAnimateValue
              : { x: 0, y: -3 }
          }
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />
        <motion.path
          id="left-wall"
          d="M3.1 21.442V9.73l9.3-5.856v11.711l-9.3 5.856Z"
          opacity=".2"
          initial={{ x: 0, y: 0 }}
          animate={
            reversePathAnimationTriggered
              ? initialAnimateValue
              : { x: 2.5, y: 0 }
          }
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />
        <motion.path
          id="top-wall"
          d="m4.65 9.3 10.333 6.2 10.334-6.2-10.334-6.2L4.65 9.3Z"
          initial={{ x: 0, y: 0 }}
          animate={
            reversePathAnimationTriggered
              ? initialAnimateValue
              : { x: 0.9, y: 1 }
          }
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />
        <motion.path
          onAnimationComplete={handlePathAnimationComplete}
          id="right-wall"
          d="M16.275 28.417V16.706l9.3-5.856v11.711l-9.3 5.856Z"
          initial={{ x: 0, y: 0 }}
          animate={
            reversePathAnimationTriggered
              ? initialAnimateValue
              : { x: 0, y: -0.5 }
          }
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />
      </motion.g>
      <defs>
        <clipPath id="clip0_304_456">
          <path fill="#fff" d="M0 0h124.775v31H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default App;
