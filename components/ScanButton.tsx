import React from 'react';
import { motion } from 'framer-motion';

interface ScanButtonProps {
    onClick: () => void;
}

const ScanButton: React.FC<ScanButtonProps> = ({ onClick }) => {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="w-full bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-5 px-4 rounded-lg text-xl transition-colors duration-300 shadow-lg shadow-blue-500/30"
        >
            SCAN NOW
        </motion.button>
    );
};

export default ScanButton;