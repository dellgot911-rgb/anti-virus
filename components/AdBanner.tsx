
import React from 'react';
import { AdIcon } from './Icons';

const AdBanner: React.FC = () => {
    return (
        <div className="w-full bg-gray-800 p-2 flex-shrink-0 border-t border-gray-700">
            <div className="bg-gray-700 rounded-md p-3 flex items-center justify-between">
                <div className="flex items-center">
                     <div className="w-10 h-10 bg-blue-500 rounded-lg mr-3 flex items-center justify-center font-bold text-white text-xl">
                        AI
                    </div>
                    <div>
                        <p className="text-white font-bold text-sm">AI Chat Assistant</p>
                        <p className="text-gray-400 text-xs">Get instant answers!</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <AdIcon className="h-4 w-4 text-gray-500 mr-2"/>
                    <button className="bg-blue-600 text-white text-sm font-semibold px-4 py-1.5 rounded-md hover:bg-blue-700 transition-colors">
                        Install
                    </button>
                </div>
            </div>
            <p className="text-center text-xs text-gray-600 mt-1">Banner Ad: ca-app-pub-3325212059628015/6660648203</p>
        </div>
    );
};

export default AdBanner;
