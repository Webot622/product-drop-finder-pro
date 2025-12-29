import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard, Search, Store, Wrench, Megaphone,
  BarChart3, TrendingUp, GitCompare, Crown,
  X, Zap, Sparkles, Target
} from 'lucide-react';

const Sidebar = () => {
  const { activeTab, setActiveTab, sidebarOpen, toggleSidebar, user, currentPlan } = useApp();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'text-blue-400' },
    { id: 'discover', label: 'Discover', icon: Search, color: 'text-purple-400' },
    { id: 'stores', label: 'My Stores', icon: Store, color: 'text-green-400' },
    { id: 'tools', label: 'Tools', icon: Wrench, color: 'text-yellow-400' },
    { id: 'marketing', label: 'Marketing', icon: Megaphone, color: 'text-pink-400' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, color: 'text-cyan-400' },
    { id: 'tracker', label: 'Tracker', icon: TrendingUp, color: 'text-orange-400' },
    { id: 'compare', label: 'Compare', icon: GitCompare, color: 'text-indigo-400' },
    { id: 'upgrade', label: 'Upgrade', icon: Crown, color: 'text-gradient-to-r from-yellow-400 to-orange-400' },
  ];

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-screen w-64 bg-dark-800/95 backdrop-blur-xl
        border-r border-dark-700 z-40 transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        md:block
      `}>
        <div className="p-6 h-full flex flex-col">
          <button
            onClick={toggleSidebar}
            className="md:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-dark-700"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center space-x-3 mb-8">
            <div className="h-10 w-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Drop Finder Pro
              </h1>
              <p className="text-xs text-gray-400">SaaS Edition</p>
            </div>
          </div>

          <div className="mb-6 p-4 bg-gradient-card rounded-xl border border-blue-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Current Plan</span>
              <span className="text-xs bg-blue-600 px-2 py-1 rounded-full capitalize">
                {user.plan}
              </span>
            </div>
            <p className="text-2xl font-bold mb-3">
              ${currentPlan.price}
              <span className="text-sm text-gray-400">/month</span>
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Products/Search</span>
                <span className="font-medium">
                  {currentPlan.savedProducts === 999 ? 'Unlimited' : currentPlan.savedProducts}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Saved Products</span>
                <span className="font-medium">
                  {currentPlan.savedProducts === 999 ? 'Unlimited' : currentPlan.savedProducts}
                </span>
              </div>
            </div>
          </div>

          <nav className="space-y-2 flex-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (window.innerWidth < 768) {
                      toggleSidebar();
                    }
                  }}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-xl
                    transition-all duration-200
                    ${isActive
                      ? 'bg-gradient-primary text-white shadow-lg'
                      : 'text-gray-300 hover:bg-dark-700 hover:text-white'
                    }
                  `}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-white' : tab.color}`} />
                  <span className="font-medium">{tab.label}</span>
                  {isActive && (
                    <div className="ml-auto h-2 w-2 bg-white rounded-full"></div>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto pt-6 border-t border-dark-700">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm">Today's Searches</span>
                </div>
                <span className="text-sm font-medium">
                  2/{currentPlan.searchesPerDay === 999 ? '∞' : currentPlan.searchesPerDay}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-green-400" />
                  <span className="text-sm">Success Rate</span>
                </div>
                <span className="text-sm font-medium text-green-400">
                  85%
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
```
