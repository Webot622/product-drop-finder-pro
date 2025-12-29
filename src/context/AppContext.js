```javascript
import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const AppContext = createContext({});

const generateMockProduct = (id) => ({
  id,
  name: `Product ${id}: ${['Wireless Earbuds', 'Smart Watch', 'Yoga Mat', 'LED Desk Lamp', 'Phone Mount'][Math.floor(Math.random() * 5)]}`,
  category: ['Electronics', 'Fashion', 'Home', 'Sports', 'Beauty'][Math.floor(Math.random() * 5)],
  supplier: ['AliExpress', 'Amazon', 'eBay', 'Wish'][Math.floor(Math.random() * 4)],
  cost: Math.floor(Math.random() * 50) + 10,
  price: Math.floor(Math.random() * 150) + 50,
  trendScore: Math.floor(Math.random() * 40) + 60,
  profitMargin: Math.floor(Math.random() * 100) + 50,
  competition: Math.floor(Math.random() * 60) + 20,
  shippingDays: Math.floor(Math.random() * 15) + 5,
  rating: (Math.random() * 2 + 3).toFixed(1),
  reviews: Math.floor(Math.random() * 10000),
  tags: ['Trending', 'Hot', 'New', 'Seasonal'].slice(0, Math.floor(Math.random() * 3) + 1),
});

const generateMockStore = (id) => ({
  id,
  name: `Store ${id}: ${['ElectroHub', 'Fashionista', 'Home Bliss', 'FitLife', 'Beauty Glow'][Math.floor(Math.random() * 5)]}`,
  niche: ['Electronics', 'Fashion', 'Home Decor', 'Fitness', 'Beauty'][Math.floor(Math.random() * 5)],
  platform: ['Shopify', 'WooCommerce', 'Etsy'][Math.floor(Math.random() * 3)],
  monthlyRevenue: Math.floor(Math.random() * 5000) + 1000,
  profitMargin: Math.floor(Math.random() * 40) + 20,
  products: Math.floor(Math.random() * 50) + 10,
  status: ['Active', 'Paused'][Math.floor(Math.random() * 2)],
  createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
});

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    plan: 'free',
    joined: '2024-01-15',
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [savedProducts, setSavedProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [trackedSales, setTrackedSales] = useState([]);

  const planLimits = {
    free: {
      searchesPerDay: 5,
      savedProducts: 3,
      stores: 1,
      tools: ['Product Discovery', 'Basic Analytics'],
      price: 0,
    },
    starter: {
      searchesPerDay: 20,
      savedProducts: 10,
      stores: 3,
      tools: ['All Tools', 'Marketing Suite', 'Advanced Analytics'],
      price: 1,
    },
    premium: {
      searchesPerDay: 999,
      savedProducts: 999,
      stores: 999,
      tools: ['Everything Unlimited', 'Priority Support', 'Custom Features'],
      price: 5,
    },
  };

  const currentPlan = planLimits[user.plan];

  useEffect(() => {
    const mockProducts = Array.from({ length: 5 }, (_, i) => generateMockProduct(i + 1));
    const mockStores = Array.from({ length: 2 }, (_, i) => generateMockStore(i + 1));
    const mockSales = Array.from({ length: 7 }, (_, i) => ({
      id: i + 1,
      product: `Product ${i + 1}`,
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      revenue: Math.floor(Math.random() * 500) + 100,
      cost: Math.floor(Math.random() * 200) + 50,
      platform: ['Shopify', 'Amazon', 'Etsy'][Math.floor(Math.random() * 3)],
    }));

    setSavedProducts(mockProducts.slice(0, 3));
    setStores(mockStores);
    setTrackedSales(mockSales);
  }, []);

  const upgradePlan = (newPlan) => {
    if (user.plan === newPlan) {
      toast.error(`You're already on the ${newPlan} plan`);
      return;
    }

    if (newPlan === 'premium') {
      toast.success('Welcome to Premium! Unlimited access unlocked.');
    } else if (newPlan === 'starter') {
      toast.success('Upgraded to Starter plan! More features unlocked.');
    }

    setUser(prev => ({ ...prev, plan: newPlan }));
    
    toast('Payment simulation complete! Plan updated.', {
      icon: '💳',
    });
  };

  const saveProduct = (product) => {
    if (savedProducts.length >= currentPlan.savedProducts) {
      toast.error(`Upgrade to save more than ${currentPlan.savedProducts} products`);
      return;
    }
    
    if (savedProducts.find(p => p.id === product.id)) {
      toast.error('Product already saved');
      return;
    }

    setSavedProducts(prev => [...prev, product]);
    toast.success('Product saved successfully!');
  };

  const removeProduct = (productId) => {
    setSavedProducts(prev => prev.filter(p => p.id !== productId));
    toast.success('Product removed');
  };

  const addStore = (storeData) => {
    if (stores.length >= currentPlan.stores) {
      toast.error(`Upgrade to create more than ${currentPlan.stores} stores`);
      return;
    }

    const newStore = {
      ...storeData,
      id: Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      monthlyRevenue: 0,
      products: 0,
      status: 'Active',
    };

    setStores(prev => [...prev, newStore]);
    toast.success('Store created successfully!');
  };

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        activeTab,
        setActiveTab,
        sidebarOpen,
        toggleSidebar,
        savedProducts,
        saveProduct,
        removeProduct,
        stores,
        addStore,
        searchHistory,
        trackedSales,
        currentPlan,
        planLimits,
        upgradePlan,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
```
