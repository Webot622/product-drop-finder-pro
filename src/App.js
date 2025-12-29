import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Discover from './components/Discover';
import Tools from './components/Tools';
import Upgrade from './components/Upgrade';

function MainContent() {
  const { activeTab } = useApp();

  if (activeTab === 'dashboard') return <Dashboard />;
  if (activeTab === 'discover') return <Discover />;
  if (activeTab === 'tools') return <Tools />;
  if (activeTab === 'upgrade') return <Upgrade />;
  return <Dashboard />;
}

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-dark-950 text-white">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 pt-20 md:ml-64 p-6 overflow-x-hidden">
            <MainContent />
          </main>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
