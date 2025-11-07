import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ShieldCheckIcon, ShieldExclamationIcon } from './Icons';

interface ResultsProps {
    onDone: () => void;
    onClean: () => void;
    threatFound: boolean;
}

const Counter: React.FC<{ value: number }> = ({ value }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        // Fix: Initialize `stop` as a number to hold the animation frame ID.
        const controls = {
            stop: 0,
        };
        const animate = (start: number, end: number, duration: number) => {
            let startTimestamp: number | null = null;
            const step = (timestamp: number) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                setDisplayValue(Math.floor(progress * (end - start) + start));
                if (progress < 1) {
                    controls.stop = requestAnimationFrame(step);
                }
            };
            controls.stop = requestAnimationFrame(step);
        };
        animate(0, value, 1000);

        // Fix: Remove the incorrect type cast. `controls.stop` is now a number.
        return () => cancelAnimationFrame(controls.stop);
    }, [value]);
    
    return <span>{displayValue.toLocaleString()}</span>;
};

const Results: React.FC<ResultsProps> = ({ onDone, onClean, threatFound }) => {
    const controls = useAnimation();

    useEffect(() => {
        controls.start(i => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1 + 0.3, type: 'spring', stiffness: 100 }
        }));
    }, [controls]);

    const stats = {
        apps: 142,
        files: 34591,
        threats: threatFound ? 1 : 0
    };

    const commonClasses = "flex flex-col items-center justify-center text-center text-white flex-grow p-6";

    if (threatFound) {
        return (
            <div className={commonClasses}>
                <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', delay: 0.1 }}>
                    <ShieldExclamationIcon className="h-40 w-40 text-red-400 mb-6" />
                </motion.div>
                <h1 className="text-4xl font-bold text-red-300 mb-2">Threats Found</h1>
                <p className="text-gray-300 text-lg mb-8">Your device is at risk!</p>
    
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="bg-gray-800/50 rounded-lg p-6 w-full max-w-sm mb-12">
                    <motion.div custom={1} initial={{ opacity: 0, y: 20 }} animate={controls} className="flex justify-between items-center py-2 border-b border-gray-700">
                        <span className="text-gray-400">Apps Scanned</span>
                        <span className="font-bold text-white"><Counter value={stats.apps} /></span>
                    </motion.div>
                    <motion.div custom={2} initial={{ opacity: 0, y: 20 }} animate={controls} className="flex justify-between items-center py-2 border-b border-gray-700">
                        <span className="text-gray-400">Files Checked</span>
                        <span className="font-bold text-white"><Counter value={stats.files} /></span>
                    </motion.div>
                    <motion.div custom={3} initial={{ opacity: 0, y: 20 }} animate={controls} className="flex justify-between items-center pt-2">
                        <span className="text-red-400">Threats Found</span>
                        <span className="font-bold text-red-400"><Counter value={stats.threats} /></span>
                    </motion.div>
                </motion.div>
    
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    onClick={onClean}
                    className="w-full max-w-sm bg-gradient-to-br from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold py-4 px-4 rounded-lg text-lg transition-all duration-300 shadow-lg shadow-red-500/20 transform active:scale-95"
                >
                    CLEAN NOW
                </motion.button>
            </div>
        );
    }

    return (
        <div className={commonClasses}>
            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', delay: 0.1 }}>
                <ShieldCheckIcon className="h-40 w-40 text-green-400 mb-6" />
            </motion.div>
            <h1 className="text-4xl font-bold text-green-300 mb-2">Scan Complete</h1>
            <p className="text-gray-300 text-lg mb-8">No threats were found.</p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="bg-gray-800/50 rounded-lg p-6 w-full max-w-sm mb-12">
                <motion.div custom={1} initial={{ opacity: 0, y: 20 }} animate={controls} className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-400">Apps Scanned</span>
                    <span className="font-bold text-white"><Counter value={stats.apps} /></span>
                </motion.div>
                <motion.div custom={2} initial={{ opacity: 0, y: 20 }} animate={controls} className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-400">Files Checked</span>
                    <span className="font-bold text-white"><Counter value={stats.files} /></span>
                </motion.div>
                <motion.div custom={3} initial={{ opacity: 0, y: 20 }} animate={controls} className="flex justify-between items-center pt-2">
                    <span className="text-green-400">Threats Found</span>
                    <span className="font-bold text-green-400"><Counter value={stats.threats} /></span>
                </motion.div>
            </motion.div>

            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onClick={onDone}
                className="w-full max-w-sm bg-gradient-to-br from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-4 px-4 rounded-lg text-lg transition-all duration-300 shadow-lg shadow-green-500/20 transform active:scale-95"
            >
                DONE
            </motion.button>
        </div>
    );
};

export default Results;