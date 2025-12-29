```javascript
import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import {
  TrendingUp, DollarSign, Package, Store,
  ArrowUpRight, Sparkles, Zap, Target,
  BarChart3, ShoppingCart, Globe, Clock, Search, Megaphone, GitCompare
} from 'lucide-react';

const Dashboard = () => {
  const { savedProducts, stores, trackedSales, currentPlan } = useApp();

  const totalRevenue = trackedSales.reduce((sum, sale) => sum + sale.revenue, 0);
  const totalProfit = trackedSales.reduce((sum, sale) => sum + (sale.revenue - sale.cost), 0);
  const avgMargin = savedProducts.length > 0 
    ? Math.round(savedProducts.reduce((sum, p) => sum + p.profitMargin, 0) / savedProducts.length)
    : 0;

  const stats = [
    {
      title: 'Total Revenue',
      value: `$${totalRevenue}`,
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
    },
    {
      title: 'Active Stores',
      value: stores.length,
      change: currentPlan.stores === 999 ? 'Unlimited' : `${stores.length}/${currentPlan.stores}`,
      icon: Store,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
    },
    {
      title: 'Saved Products',
      value: savedProducts.length,
      change: currentPlan.savedProducts === 999 ? 'Unlimited' : `${savedProducts.length}/${currentPlan.savedProducts}`,
      icon: Package,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
    },
    {
      title: 'Avg. Margin',
      value: `${avgMargin}%`,
      change: '+8.3%',
      icon: TrendingUp,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
    },
  ];

  const quickActions = [
    { title: 'Find Products', description: 'Discover trending products', icon: Search, color: 'from-blue-500 to-cyan-500', action: 'discover' },
    { title: 'Generate Ads', description: 'Create marketing content', icon: Megaphone, color: 'from-purple-500 to-pink-500', action: 'marketing' },
    { title: 'Track Sales', description: 'Monitor your profits', icon: TrendingUp, color: 'from-green-500 to-emerald-500', action: 'tracker' },
    { title: 'Compare', description: 'Analyze competitors', icon: GitCompare, color: 'from-orange-500 to-red-500', action: 'compare' },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30 rounded-2xl p-6 border border-blue-500/20"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome back! <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Ready to scale?</span>
            </h1>
            <p className="text-gray-300">
              You have {savedProducts.length} saved products and {stores.length} active stores.
              {savedProducts.length >= currentPlan.savedProducts && currentPlan.savedProducts !== 999 && (
                <span className="text-yellow-400 ml-2">Upgrade to save more!</span>
              )}
            </p>
          </div>
          <button className="mt-4 md:mt-0 px-6 py-3 bg-gradient-primary rounded-xl font-semibold hover:opacity-90 transition-opacity">
            <Sparkles className="inline h-5 w-5 mr-2" />
            Quick Scan
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-dark-800 rounded-xl p-5 border border-dark-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <span className={`text-sm font-medium ${stat.change.includes('+') ? 'text-green-400' : 'text-gray-400'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
            <p className="text-gray-400 text-sm">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <motion.button
            key={action.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setActiveTab(action.action)}
            className="bg-dark-800 rounded-xl p-5 border border-dark-700 hover:border-blue-500/50 transition-colors group"
          >
            <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4`}>
              <action.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold mb-1 group-hover:text-blue-400 transition-colors">
              {action.title}
            </h3>
            <p className="text-gray-400 text-sm">{action.description}</p>
          </motion.button>
        ))}
      </div>

      {currentPlan.price === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-6 border border-blue-500/30"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2 flex items-center">
                <Crown className="h-5 w-5 mr-2 text-yellow-400" />
                Unlock Premium Features
              </h3>
              <p className="text-gray-300">
                Upgrade to get unlimited products, advanced tools, and priority support.
              </p>
            </div>
            <button 
              onClick={() => setActiveTab('upgrade')}
              className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl font-semibold hover:opacity-90 transition-opacity"
            >
              Upgrade Now
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
```
