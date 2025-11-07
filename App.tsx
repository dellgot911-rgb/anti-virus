import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Scanner from './components/Scanner';
import AdBanner from './components/AdBanner';
import InterstitialAd from './components/InterstitialAd';
import Results from './components/Results';
import ScanButton from './components/ScanButton';
import { ScanStatus } from './types';
import { ShieldCheckIcon, ShieldExclamationIcon, SparklesIcon } from './components/Icons';

const App: React.FC = () => {
    const [scanStatus, setScanStatus] = useState<ScanStatus>(ScanStatus.IDLE);
    const [showInterstitial, setShowInterstitial] = useState<boolean>(false);
    const [lastScanTime, setLastScanTime] = useState<string | null>(null);
    const [threatFound, setThreatFound] = useState<boolean>(false);
    const [nextAction, setNextAction] = useState<'scan' | 'clean' | null>(null);

    const handleScanComplete = useCallback((found: boolean) => {
        setThreatFound(found);
        setScanStatus(ScanStatus.FINISHED);
        setLastScanTime(new Date().toLocaleString());
    }, []);

    const handleStartScan = () => {
        setNextAction('scan');
        setShowInterstitial(true);
    };

    const handleDone = () => {
        setScanStatus(ScanStatus.IDLE);
        setShowInterstitial(true);
    };

    const handleCleanThreats = () => {
        setNextAction('clean');
        setShowInterstitial(true);
    };
    
    const handleCloseInterstitial = () => {
        setShowInterstitial(false);
        if (nextAction === 'scan') {
            setScanStatus(ScanStatus.SCANNING);
        } else if (nextAction === 'clean') {
            setScanStatus(ScanStatus.CLEANING);
            setTimeout(() => {
                setThreatFound(false);
                setScanStatus(ScanStatus.IDLE);
            }, 2500);
        }
        setNextAction(null);
    };

    const contentVariants = {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 },
    };

    const renderContent = () => {
        switch (scanStatus) {
            case ScanStatus.SCANNING:
                return <Scanner onScanComplete={handleScanComplete} />;
            case ScanStatus.CLEANING:
                return (
                    <div className="flex flex-col items-center justify-center text-center text-white flex-grow p-6">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 10 } }}
                            className="relative mb-8"
                        >
                            <SparklesIcon className="h-40 w-40 text-purple-400" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div 
                                    className="h-64 w-64 rounded-full bg-purple-500/10"
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                                />
                            </div>
                        </motion.div>
                        <h1 className="text-3xl font-bold mb-2">Cleaning Threats...</h1>
                        <p className="text-gray-400">Please wait while we secure your device.</p>
                    </div>
                );
            case ScanStatus.FINISHED:
                return <Results onDone={handleDone} onClean={handleCleanThreats} threatFound={threatFound} />;
            case ScanStatus.IDLE:
            default:
                if (threatFound) {
                    return (
                        <div className="flex flex-col items-center justify-center text-center text-white flex-grow p-6">
                            <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="relative mb-8">
                                <ShieldExclamationIcon className="h-40 w-40 text-red-400" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="h-48 w-48 rounded-full bg-red-500/10 animate-ping"></div>
                                </div>
                            </motion.div>
                            <h1 className="text-3xl font-bold mb-2 text-red-300">Threat Detected</h1>
                            <p className="text-gray-400 mb-2">Malware was found on your device.</p>
                            <p className="text-xs text-gray-500">Last scan: {lastScanTime || 'Never'}</p>
                            <div className="mt-12 w-full max-w-sm">
                                <button
                                    onClick={handleStartScan}
                                    className="w-full bg-gradient-to-br from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold py-5 px-4 rounded-lg text-xl transition-all duration-300 shadow-lg shadow-red-500/30 transform active:scale-95"
                                >
                                    SCAN AGAIN
                                </button>
                            </div>
                        </div>
                    );
                }
                return (
                    <div className="flex flex-col items-center justify-center text-center text-white flex-grow p-6">
                        <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="relative mb-8">
                            <ShieldCheckIcon className="h-40 w-40 text-green-400" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="h-48 w-48 rounded-full bg-green-500/10 animate-ping"></div>
                            </div>
                        </motion.div>
                        <h1 className="text-3xl font-bold mb-2">You are protected</h1>
                        <p className="text-gray-400 mb-2">No threats detected.</p>
                        <p className="text-xs text-gray-500">Last scan: {lastScanTime || 'Never'}</p>
                        <div className="mt-12 w-full max-w-sm">
                            <ScanButton onClick={handleStartScan} />
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="h-screen w-screen bg-gradient-to-br from-gray-900 to-black flex flex-col font-sans antialiased overflow-hidden">
            <AnimatePresence>
                {showInterstitial && <InterstitialAd onClose={handleCloseInterstitial} />}
            </AnimatePresence>
            <Header />
            <main className="flex-grow flex flex-col overflow-y-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={scanStatus}
                        variants={contentVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="flex-grow flex flex-col"
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </main>
            <AdBanner />
        </div>
    );
};

export default App;