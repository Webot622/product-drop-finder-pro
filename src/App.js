import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Discover from './components/Discover';
import MyStores from './components/MyStores';
import Tools from './components/Tools';
import Marketing from './components/Marketing';
import Analytics from './components/Analytics';
import Tracker from './components/Tracker';
import Compare from './components/Compare';
import Upgrade from './components/Upgrade';

import { AppProvider, useApp } from './context/AppContext';

const AppContent = () => {
  const { activeTab, sidebarOpen } = useApp();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'discover':
        return <Discover />;
      case 'stores':
        return <MyStores />;
      case 'tools':
        return <Tools />;
      case 'marketing':
        return <Marketing />;
      case 'analytics':
        return <Analytics />;
      case 'tracker':
        return <Tracker />;
      case 'compare':
        return <Compare />;
      case 'upgrade':
        return <Upgrade />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 text-gray-100">
      <Header />
      <Sidebar />
      
      <main className={`
        transition-all duration-300
        ${sidebarOpen ? 'ml-0 md:ml-64' : 'ml-0'}
        pt-16
      `}>
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <AppProvider>
        <AppContent />
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#1f2937',
              color: '#fff',
              border: '1px solid #374151',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </AppProvider>
    </HelmetProvider>
  );
}

export default App;
```
