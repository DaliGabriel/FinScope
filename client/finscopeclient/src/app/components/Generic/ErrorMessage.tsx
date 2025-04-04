import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ErrorMessageProps } from "../../types/error";

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <AnimatePresence mode="wait">
      {message && (
        <motion.div
          key={message}
          initial={{
            opacity: 0,
            y: -20,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -20,
            scale: 0.95,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 15,
            mass: 0.5,
          }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.2 },
          }}
          className="p-4 text-red-700 bg-red-100 rounded-lg shadow-md"
        >
          <motion.div
            initial={{ x: -10 }}
            animate={{ x: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              delay: 0.1,
            }}
          >
            {message}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorMessage;
