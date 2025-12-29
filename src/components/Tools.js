```javascript
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useApp } from '../context/AppContext';
import {
  Wrench, FileText, Hash, Target, DollarSign,
  Sparkles, Copy, RefreshCw
} from 'lucide-react';

const Tools = () => {
  const [activeTool, setActiveTool] = useState('copy');

  const generateAdCopy = () => {
    const templates = [
      "🔥 LIMITED TIME OFFER! Get this amazing product while supplies last!",
      "🚀 JUST LAUNCHED! This innovative product is changing lives!",
      "✨ TRANSFORM YOUR LIFE with this must-have product!",
      "🎯 ATTENTION! This product was made for you."
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  };

  const [adCopy, setAdCopy] = useState(generateAdCopy());

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const handleRegenerate = () => {
    setAdCopy(generateAdCopy());
    toast.success('Regenerated!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2 flex items-center">
          <Wrench className="h-6 w-6 mr-2 text-yellow-400" />
          Smart Tools
        </h1>
        <p className="text-gray-400">
          Generate marketing content instantly
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <button
          onClick={() => setActiveTool('copy')}
          className={`p-4 rounded-xl border-2 ${activeTool === 'copy' ? 'border-blue-500 bg-blue-500/10' : 'border-dark-700 bg-dark-800'}`}
        >
          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-3 mx-auto">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <span className="text-sm font-medium">Ad Copy</span>
        </button>
      </div>

      <div className="bg-dark-800 rounded-2xl border border-dark-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            <FileText className="h-5 w-5 inline mr-2 text-blue-400" />
            Ad Copy Generator
          </h2>
          <div className="flex space-x-3">
            <button onClick={handleRegenerate} className="px-4 py-2 bg-dark-700 hover:bg-dark-600 rounded-lg flex items-center">
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate
            </button>
            <button onClick={() => handleCopy(adCopy)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center">
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </button>
          </div>
        </div>

        <div className="bg-dark-900 rounded-xl p-5 border border-dark-700">
          <p className="whitespace-pre-line">{adCopy}</p>
        </div>
      </div>
    </div>
  );
};

export default Tools;
```

### 13. src/components/Upgrade.js
**File name:** `src/components/Upgrade.js`
```javascript
import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import {
  Crown, Zap, Shield, Check,
  Sparkles, Trophy
} from 'lucide-react';

const Upgrade = () => {
  const { user, currentPlan, planLimits, upgradePlan } = useApp();

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      icon: Shield,
      features: [
        '3 products per search',
        '3 saved products',
        '1 store',
        'Basic tools',
      ],
      cta: 'Current Plan',
      disabled: true,
    },
    {
      id: 'starter',
      name: 'Starter',
      price: 1,
      icon: Zap,
      popular: true,
      features: [
        '10 products per search',
        '10 saved products',
        '3 stores',
        'All tools',
        'Marketing suite',
      ],
      cta: user.plan === 'starter' ? 'Current Plan' : 'Upgrade Now',
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 5,
      icon: Crown,
      features: [
        'Unlimited everything',
        'Advanced tools',
        'Priority support',
        'Custom features',
      ],
      cta: user.plan === 'premium' ? 'Current Plan' : 'Go Premium',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-4">
          <Crown className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-3">Choose Your Plan</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Start free, upgrade anytime. No hidden fees.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isCurrent = user.plan === plan.id;
          
          return (
            <motion.div
              key={plan.id}
              className={`
                relative rounded-2xl p-6 border-2
                ${isCurrent ? 'border-blue-500 bg-gradient-card' : 'border-dark-700 bg-dark-800'}
                ${plan.popular ? 'ring-2 ring-blue-500/50' : ''}
              `}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                    MOST POPULAR
                  </div>
                </div>
              )}
              
              <div className="text-center mb-6">
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl mb-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-200">{feature}</span>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => !plan.disabled && upgradePlan(plan.id)}
                disabled={plan.disabled || isCurrent}
                className={`
                  w-full py-3 rounded-xl font-semibold
                  ${plan.disabled || isCurrent
                    ? 'bg-gray-800 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-primary hover:opacity-90'
                  }
                `}
              >
                {plan.cta}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Upgrade;
```
