```javascript
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Menu, Search, Bell, User, ChevronDown,
  Zap, Sparkles, Shield, Trophy
} from 'lucide-react';

const Header = () => {
  const { user, currentPlan, toggleSidebar, setActiveTab } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveTab('discover');
    }
  };

  const getPlanBadgeColor = (plan) => {
    switch (plan) {
      case 'free': return 'bg-gray-600 text-gray-200';
      case 'starter': return 'bg-blue-600 text-white';
      case 'premium': return 'bg-gradient-primary text-white';
      default: return 'bg-gray-600';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-800/90 backdrop-blur-xl border-b border-dark-700">
      <div className="px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-dark-700 transition-colors md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="hidden md:block">
                <h1 className="font-bold text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Product Drop Finder
                </h1>
                <p className="text-xs text-gray-400">Find. Analyze. Launch.</p>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-2xl mx-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, niches, or tools..."
                className="w-full pl-12 pr-4 py-3 bg-dark-900 border border-dark-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder-gray-500"
              />
            </form>
          </div>

          <div className="flex items-center space-x-3">
            <div className={`hidden md:flex items-center space-x-2 px-3 py-2 rounded-lg ${getPlanBadgeColor(user.plan)}`}>
              {user.plan === 'premium' ? (
                <Trophy className="h-4 w-4" />
              ) : user.plan === 'starter' ? (
                <Zap className="h-4 w-4" />
              ) : (
                <Shield className="h-4 w-4" />
              )}
              <span className="text-sm font-medium capitalize">
                {user.plan} Plan
              </span>
            </div>

            <button className="p-2 rounded-lg hover:bg-dark-700 transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-dark-700 transition-colors"
              >
                <div className="h-9 w-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-dark-800 border border-dark-700 rounded-xl shadow-2xl z-50 overflow-hidden">
                  <div className="p-4 border-b border-dark-700">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                    <div className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs ${getPlanBadgeColor(user.plan)}`}>
                      {user.plan.toUpperCase()} PLAN
                    </div>
                  </div>
                  
                  <div className="p-2">
                    <button
                      onClick={() => setActiveTab('dashboard')}
                      className="w-full px-4 py-3 text-left rounded-lg hover:bg-dark-700 transition-colors flex items-center space-x-3"
                    >
                      <User className="h-4 w-4" />
                      <span>Profile Settings</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('tracker')}
                      className="w-full px-4 py-3 text-left rounded-lg hover:bg-dark-700 transition-colors flex items-center space-x-3"
                    >
                      <Zap className="h-4 w-4" />
                      <span>My Trackers</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('upgrade')}
                      className="w-full px-4 py-3 text-left rounded-lg hover:bg-dark-700 transition-colors flex items-center space-x-3"
                    >
                      <Trophy className="h-4 w-4" />
                      <span>Upgrade Plan</span>
                    </button>
                  </div>
                  
                  <div className="p-2 border-t border-dark-700">
                    <button className="w-full px-4 py-3 text-left rounded-lg hover:bg-red-900/20 text-red-400 transition-colors">
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
```
