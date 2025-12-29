
import React from 'react';
import { AppProvider } from './context/AppContext';  // Adjust path if needed, probably ./context/AppContext
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';  // or whatever default

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-dark-950 text-white">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 pt-20 md:ml-64 p-6">
            <Dashboard />  {/* or a router/switch for activeTab */}
          </main>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
