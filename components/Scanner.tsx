import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchIcon } from './Icons';

const MOCK_FILES = [
    '/system/app/Chrome.apk',
    '/system/bin/debuggerd',
    '/data/user/0/com.whatsapp/databases/msgstore.db',
    '/data/app/com.facebook.katana-1/base.apk',
    '/storage/emulated/0/Download/invoice.pdf',
    '/system/framework/framework-res.apk',
    'Scanning running processes...',
    'Checking system permissions...',
    '/data/user/0/com.instagram.android/cache/video_cache',
    'Verifying app signatures...',
    '/storage/emulated/0/DCIM/Camera/IMG_20230101.jpg',
    'Analyzing system vulnerabilities...',
    '/system/lib/libandroid_runtime.so',
    'Scanning for malware...',
    'Checking for root access...',
    'Finalizing scan report...'
];


interface ScannerProps {
    onScanComplete: (threatFound: boolean) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onScanComplete }) => {
    const [progress, setProgress] = useState(0);
    const [currentFile, setCurrentFile] = useState('Initializing scanner...');

    const scanConfig = useRef({
        willFindThreat: Math.random() > 0.5,
        threatProgressPoint: Math.floor(Math.random() * 40) + 40,
        threatShown: false,
    });


    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev + 1;

                if (newProgress >= 100) {
                    clearInterval(interval);
                    setCurrentFile('Scan complete!');
                    setTimeout(() => onScanComplete(scanConfig.current.willFindThreat), 1000);
                    return 100;
                }

                if (scanConfig.current.willFindThreat && !scanConfig.current.threatShown && newProgress >= scanConfig.current.threatProgressPoint) {
                    setCurrentFile('Threat Detected: Adware.Generic in shady.apk');
                    scanConfig.current.threatShown = true;
                } else if (!scanConfig.current.threatShown || !scanConfig.current.willFindThreat) {
                    const fileIndex = Math.floor((newProgress / 100) * MOCK_FILES.length);
                    setCurrentFile(MOCK_FILES[fileIndex] || MOCK_FILES[MOCK_FILES.length - 1]);
                }

                return newProgress;
            });
        }, 150);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex flex-col items-center justify-center text-center text-white flex-grow p-6">
            <div className="relative mb-8 w-64 h-64 flex items-center justify-center">
                {[...Array(3)].map((_, i) => (
                     <motion.div
                        key={i}
                        className="absolute rounded-full border-blue-500/30"
                        style={{
                            borderWidth: `${(i+1) * 2}px`,
                            width: `${80 + i * 80}px`,
                            height: `${80 + i * 80}px`,
                        }}
                        animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "easeInOut",
                        }}
                    />
                ))}
                <SearchIcon className="h-40 w-40 text-blue-400" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Scanning...</h1>
            <AnimatePresence mode="wait">
                <motion.p 
                    key={currentFile}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`text-gray-400 mb-6 text-sm break-all px-4 h-10 flex items-center justify-center ${scanConfig.current.threatShown ? 'text-red-400 font-bold' : ''}`}
                >
                    {currentFile}
                </motion.p>
            </AnimatePresence>

            <div className="w-full max-w-sm bg-gray-700 rounded-full h-2.5">
                <motion.div 
                    className="bg-gradient-to-r from-blue-400 to-blue-600 h-2.5 rounded-full" 
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.15, ease: "linear" }}
                />
            </div>
             <p className="text-blue-300 mt-2 font-mono text-lg">{progress}%</p>
        </div>
    );
};

export default Scanner;