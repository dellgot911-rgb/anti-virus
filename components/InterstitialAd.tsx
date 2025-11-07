import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CloseIcon, AdIcon } from './Icons';

interface InterstitialAdProps {
    onClose: () => void;
}

const InterstitialAd: React.FC<InterstitialAdProps> = ({ onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 8000); // Auto-close after 8 seconds
        return () => clearTimeout(timer);
    }, [onClose]);
    
    return (
        <motion.div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div 
                className="bg-gray-800 w-full h-full md:w-[360px] md:h-[640px] md:rounded-lg shadow-2xl flex flex-col relative text-white"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
                <div className="p-2 flex justify-between items-center bg-gray-900/50">
                    <div className="flex items-center">
                         <AdIcon className="h-4 w-4 text-gray-400 mr-2" />
                         <span className="text-sm text-gray-400">Advertisement</span>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white p-1 rounded-full">
                        <CloseIcon className="h-6 w-6" />
                    </button>
                </div>
                
                <div className="flex-grow flex flex-col items-center justify-center bg-cover bg-center" style={{backgroundImage: "url('https://picsum.photos/360/640?blur=2&random=1')"}}>
                    <div className="bg-black/50 p-8 rounded-lg text-center">
                        <h2 className="text-4xl font-extrabold mb-4 text-yellow-300">New Levels Unlocked!</h2>
                        <p className="text-lg mb-8">Experience the epic adventure now.</p>
                        <button className="bg-yellow-400 text-black font-bold text-xl py-4 px-10 rounded-full hover:bg-yellow-500 transition-transform transform hover:scale-105">
                            PLAY FREE
                        </button>
                    </div>
                </div>

                <div className="p-2 text-center bg-gray-900/50">
                    <p className="text-xs text-gray-600">Interstitial Ad: ca-app-pub-3325212059628015/8943180705</p>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default InterstitialAd;