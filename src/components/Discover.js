```javascript
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useApp } from '../context/AppContext';
import {
  Search, Filter, DollarSign, TrendingUp, Package,
  Target, Zap, Globe, Users, Clock, Sparkles,
  ChevronRight, Star, ShoppingCart, Copy
} from 'lucide-react';

const Discover = () => {
  const { saveProduct, currentPlan } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [products, setProducts] = useState([]);

  const generateMockProducts = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      name: `Product ${i + 1}: ${['Wireless Earbuds', 'Smart Watch', 'Yoga Mat', 'LED Desk Lamp', 'Phone Mount'][i % 5]}`,
      category: ['electronics', 'fashion', 'home', 'sports', 'beauty'][i % 5],
      supplier: ['AliExpress', 'Amazon', 'eBay', 'Wish'][i % 4],
      cost: Math.floor(Math.random() * 50) + 10,
      price: Math.floor(Math.random() * 150) + 50,
      trendScore: Math.floor(Math.random() * 40) + 60,
      profitMargin: Math.floor(Math.random() * 100) + 50,
      competition: Math.floor(Math.random() * 60) + 20,
      shippingDays: Math.floor(Math.random() * 15) + 5,
      rating: (Math.random() * 2 + 3).toFixed(1),
      reviews: Math.floor(Math.random() * 10000),
      tags: ['Trending', 'Hot', 'New'].slice(0, Math.floor(Math.random() * 3) + 1),
    }));
  };

  const handleSearch = () => {
    if (currentPlan.savedProducts === 3 && products.length >= 3) {
      toast.error('Free plan limited to 3 products. Upgrade for more!');
      return;
    }

    setIsSearching(true);
    
    setTimeout(() => {
      const count = currentPlan.savedProducts === 999 ? 12 : currentPlan.savedProducts;
      const newProducts = generateMockProducts(count);
      setProducts(newProducts);
      setIsSearching(false);
      
      toast.success(`Found ${newProducts.length} products!`);
    }, 1500);
  };

  const handleSaveProduct = (product) => {
    saveProduct(product);
  };

  const handleCopySupplier = (supplier) => {
    navigator.clipboard.writeText(supplier);
    toast.success('Supplier copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">Discover Products</h1>
          <p className="text-gray-400">
            Find trending products with high profit margins
            {currentPlan.savedProducts !== 999 && (
              <span className="ml-2 text-yellow-400">
                ({products.length}/{currentPlan.savedProducts} shown)
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="bg-dark-800 rounded-2xl p-6 border border-dark-700">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="What product are you looking for? Try 'wireless earbuds'..."
            className="w-full pl-12 pr-4 py-4 bg-dark-900 border border-dark-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>

        <button
          onClick={handleSearch}
          disabled={isSearching}
          className="w-full py-4 px-6 bg-gradient-primary rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity flex items-center justify-center"
        >
          {isSearching ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white mr-3"></div>
              Scanning Marketplaces...
            </>
          ) : (
            <>
              <Search className="h-6 w-6 mr-3" />
              Find Products
              <ChevronRight className="h-5 w-5 ml-2" />
            </>
          )}
        </button>
      </div>

      {products.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-dark-800 rounded-xl border border-dark-700 overflow-hidden hover:border-blue-500/50 transition-colors group"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold mb-1 group-hover:text-blue-400 transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <Package className="h-3 w-3" />
                        <span className="capitalize">{product.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm">{product.rating}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-2 bg-dark-900/50 rounded-lg">
                      <div className="text-lg font-bold text-green-400">{product.profitMargin}%</div>
                      <div className="text-xs text-gray-400">Margin</div>
                    </div>
                    <div className="text-center p-2 bg-dark-900/50 rounded-lg">
                      <div className="text-lg font-bold text-yellow-400">{product.trendScore}%</div>
                      <div className="text-xs text-gray-400">Trend</div>
                    </div>
                    <div className="text-center p-2 bg-dark-900/50 rounded-lg">
                      <div className="text-lg font-bold text-blue-400">${product.price}</div>
                      <div className="text-xs text-gray-400">Price</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm mb-4">
                    <div className="flex items-center">
                      <Globe className="h-3 w-3 mr-2 text-gray-400" />
                      <span className="text-gray-300">{product.supplier}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-2 text-gray-400" />
                      <span className="text-gray-300">{product.shippingDays} days</span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleSaveProduct(product)}
                      className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors flex items-center justify-center"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Save Product
                    </button>
                    <button
                      onClick={() => handleCopySupplier(product.supplier)}
                      className="px-4 py-2.5 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Discover;
```
