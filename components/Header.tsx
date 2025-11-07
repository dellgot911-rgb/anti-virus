
import React from 'react';
import { ShieldCheckIcon } from './Icons';

const Header: React.FC = () => {
    return (
        <header className="bg-gray-800/50 backdrop-blur-sm text-white p-4 flex items-center shadow-lg flex-shrink-0">
            <ShieldCheckIcon className="h-8 w-8 text-green-400 mr-3" />
            <div>
              <h1 className="text-xl font-bold">BabaPress Security</h1>
              <p className="text-xs text-gray-400">com.tiktokgx.babapress</p>
            </div>
        </header>
    );
};

export default Header;
