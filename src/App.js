import React from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Discover from './components/Discover';
import Tools from './components/Tools';
import Upgrade from './components/Upgrade';
import { useApp } from './context/AppContext';

function MainContent() {
  const { activeTab } = useApp();

  switch (activeTab) {
    case 'dashboard':
      return <Dashboard />;
    case 'discover':
      return <Discover />;
    case 'tools':
      return <Tools />;
    case 'upgrade':
      return <Upgrade />;
    default:
      return <Dashboard />;
  }
}

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-dark-950 text-white">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 pt-20 md:ml-64 p-6 overflow-auto">
            <MainContent />
          </main>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
