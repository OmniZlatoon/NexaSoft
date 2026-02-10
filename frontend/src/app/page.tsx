'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { 
  ShieldCheck, 
  Zap, 
  TrendingUp,
  AlertTriangle , 
  BarChart3, 
  ShoppingCart, 
  Bell, 
  Menu,
  CheckCircle2, 
  X, 
  ChevronRight,
  Sparkles,
  Building2,
  ArrowUpRight,
  BrainCircuit,
  PieChart,
  Lightbulb,
  Boxes,
  Users
} from 'lucide-react';
const marketChallenges = [
    {
      problem: "Perishable Waste",
      description: "Over-ordering fresh produce leads to 30% spoilage rates on average.",
      solution: "Predictive expiry modeling and dynamic clearance suggesting.",
      icon: <AlertTriangle className="text-red-500" />
    },
    {
      problem: "Out-of-Stock (OOS)",
      description: "Customers leave when high-demand items aren't on shelves during peak hours.",
      solution: "Hourly demand forecasting with automated replenishment alerts.",
      icon: <ShoppingCart className="text-amber-500" />
    },
    {
      problem: "Manual Auditing",
      description: "Staff spend 15+ hours weekly manually checking inventory levels.",
      solution: "Real-time AI digital twin of your stock levels via POS integration.",
      icon: <Users className="text-indigo-500" />
    }
  ];

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      title: "Smart Inventory Tracking",
      description: "Real-time monitoring of stock levels across multiple locations with automated low-stock triggers.",
      icon: <Boxes className="w-6 h-6 text-indigo-500" />
    },
    {
      title: "Expiry Forecasting",
      description: "Proprietary algorithms predict when products will expire, allowing for strategic clearance sales.",
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />
    },
    {
      title: "Profit Maximization",
      description: "Our AI identifies high-margin opportunities by analyzing historical sales and seasonal trends.",
      icon: <TrendingUp className="w-6 h-6 text-orange-500" />
    }
  ];

  const aiInsights = [
    {
      product: "Organic Avocado Oil",
      reason: "Demand up 45% in your region",
      action: "Buy Now",
      profit: "+22%",
      trend: "Rising Fast"
    },
    {
      product: "Premium Keto Flour",
      reason: "Wholesale prices dropping",
      action: "Stock Up",
      profit: "+18%",
      trend: "Optimal Entry"
    }
  ];
  const aiPredictions = [
    { product: "Organic Greek Yogurt", confidence: "98%", trend: "Surging Demand", impact: "+24% Revenue" },
    { product: "Biodegradable Utensils", confidence: "92%", trend: "New Eco-Regulation", impact: "Secure Supply Now" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg shadow-indigo-200 shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-900">Nexa<span className="text-indigo-600">Soft</span></span>
            </div>
            
            <div className="hidden md:flex items-center space-gap-8 gap-8 font-medium text-slate-600">
              <a href="#" className="hover:text-indigo-600 transition-colors">Features</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">AI Insights</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Pricing</a>
              <Link href='/Registration'>
                <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full hover:bg-indigo-600 transition-all shadow-md active:scale-95">
                  Get Started
                </button>
              </Link>
              <Link href='/Inventory'>
                <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full hover:bg-indigo-600 transition-all shadow-md active:scale-95">
                  Mobile Scanner
                </button>
              </Link>
            </div>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

       {/* MOBILE NAV */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white p-6 lg:hidden">
          <div className="flex items-center justify-between mb-8">
            <span className="text-xl font-bold">NexaSoft</span>
            <button onClick={() => setIsMenuOpen(false)}><X className="h-6 w-6" /></button>
          </div>
          <div className="space-y-4 text-center">
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium">About</a>
            <a href="#challenges" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium">Market Solutions</a>
            <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium">Pricing</a>
            <a href="#register" onClick={() => setIsMenuOpen(false)} className="block bg-indigo-600 text-white p-3 rounded-xl">Pre-register</a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-3xl opacity-60 animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-emerald-100/50 rounded-full blur-3xl opacity-60"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span>Next-Gen AI Inventory Management</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Predict Your Profit. <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-violet-600">Master Your Stock.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              NexaSoft uses advanced neural networks to analyze market demand, predict expiration risks, and suggest high-yield purchases before your competitors even notice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 group">
                Start Free Trial
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>
        
       {/* Social Proof / Stats */}
      <section className="py-20 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-extrabold text-indigo-600 mb-1">500M+</p>
              <p className="text-slate-600 font-medium">SKUs Tracked</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-indigo-600 mb-1">$2.4B</p>
              <p className="text-slate-600 font-medium">Inventory Value</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-indigo-600 mb-1">94%</p>
              <p className="text-slate-600 font-medium">Waste Reduction</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-indigo-600 mb-1">12k+</p>
              <p className="text-slate-600 font-medium">Global Retailers</p>
            </div>
          </div>
        </div>
      </section>


      {/* SUPERMARKET CHALLENGES & SOLUTIONS */}
      <section id="challenges" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Industry-Specific Solutions</h2>
            <p className="mt-4 text-gray-600">Solving the most critical problems for modern grocery retailers.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {marketChallenges.map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Problem: {item.problem}</h3>
                <p className="text-gray-500 mb-6 text-sm leading-relaxed">{item.description}</p>
                <div className="pt-6 border-t border-gray-50">
                  <p className="text-indigo-600 font-bold text-sm flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" /> NexaSoft Solution
                  </p>
                  <p className="mt-2 text-gray-900 text-sm font-medium">{item.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* AI PREDICTIONS PREVIEW */}
      <section id="predictions" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gray-900 rounded-[3rem] p-8 lg:p-16 text-white flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 text-indigo-400 font-bold text-sm uppercase tracking-widest mb-4">
                <BrainCircuit className="w-5 h-5" /> NexaPulse Intelligence
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">AI That Tells You What To Buy Before You Need It</h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Our engine scans local weather patterns, holiday trends, and logistics data to predict regional demand shifts with 96% accuracy.
              </p>
              <div className="space-y-4">
                {aiPredictions.map((pred, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex justify-between items-center">
                    <div>
                      <p className="font-bold">{pred.product}</p>
                      <p className="text-xs text-gray-400">{pred.trend}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-400 font-bold">{pred.impact}</p>
                      <p className="text-[10px] text-gray-500">Confidence: {pred.confidence}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full max-w-md">
               <div className="aspect-square bg-linear-to-tr from-indigo-500 to-violet-500 rounded-3xl p-1 shadow-2xl overflow-hidden">
                  <div className="w-full h-full bg-gray-900 rounded-[1.4rem] p-6 flex flex-col justify-center items-center text-center">
                    <BarChart3 className="w-20 h-20 text-indigo-400 mb-6" />
                    <p className="text-xl font-bold">Predictive Model Loaded</p>
                    <p className="text-sm text-gray-400 mt-2">Analyzing 4,200 SKU identifiers across 12 regions...</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>



      {/* AI SUGGESTION FEATURE - The Requested Upgrade */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 font-bold tracking-widest uppercase text-sm mb-4">
                <BrainCircuit className="w-5 h-5" />
                <span>Nexa Intelligence</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Real-time AI Recommendations</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Stop guessing. NexaSoft monitors global market trends and local demand shifts. When a product shows a massive increase in profit potential, you&#39;ll be the first to know.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="bg-indigo-500/20 p-2 rounded-lg">
                    <TrendingUp className="text-indigo-400 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl">Demand Forecasting</h4>
                    <p className="text-slate-400">Our AI predicts &#34;Viral Trends&#34; 14 days before they hit peak saturation.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-emerald-500/20 p-2 rounded-lg">
                    <PieChart className="text-emerald-400 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl">Profit Optimization</h4>
                    <p className="text-slate-400">Calculates exact purchase quantities to minimize waste and maximize ROI.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* AI Insight Card Mockup */}
              <div className="bg-slate-800 rounded-3xl border border-slate-700 p-8 shadow-2xl relative z-10">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-bold">New Suggestion</p>
                      <p className="font-bold">AI Analysis Complete</p>
                    </div>
                  </div>
                  <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/20 uppercase">
                    High Confidence
                  </span>
                </div>

                <div className="space-y-4">
                  {aiInsights.map((item, idx) => (
                    <div key={idx} className="bg-slate-900/50 border border-slate-700 p-5 rounded-2xl group hover:border-indigo-500/50 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h5 className="font-bold text-lg">{item.product}</h5>
                          <p className="text-sm text-slate-400">{item.reason}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-emerald-400 font-bold">{item.profit}</p>
                          <p className="text-[10px] text-slate-500 uppercase tracking-tighter">Est. Profit</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-slate-700/50">
                        <span className="text-xs font-medium flex items-center gap-1 text-orange-400">
                          <ArrowUpRight className="w-3 h-3" /> {item.trend}
                        </span>
                        <button className="bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-indigo-500 transition-all">
                          {item.action}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-700 flex items-center justify-between text-sm">
                  <span className="text-slate-400">Market coverage: Worldwide</span>
                  <span className="text-indigo-400 font-bold cursor-pointer hover:underline">View All Insights →</span>
                </div>
              </div>
              
              {/* Decorative Blur Background for UI */}
              <div className="absolute -inset-4 bg-indigo-500/20 blur-2xl rounded-3xl -z-10 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Enterprise Grade Tools</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">Everything you need to manage thousands of SKUs across multiple retail locations with surgical precision.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="mb-6 bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ABOUT US (Clean Grid) */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-indigo-600 font-bold mb-4">Our Mission</p>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Redefining Inventory Management for the Digital Age</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Founded by retail logistics experts, NexaSoft was built to bridge the gap between complex data science and the practical day-to-day operations of supermarket managers.
              </p>
              <ul className="space-y-4">
                <li className="flex gap-3 items-start">
                  <CheckCircle2 className="w-6 h-6 text-indigo-600 mt-0.5" />
                  <span className="text-gray-700"><strong>Data-Driven:</strong> Decades of combined experience in supply chain optimization.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle2 className="w-6 h-6 text-indigo-600 mt-0.5" />
                  <span className="text-gray-700"><strong>Scalable:</strong> From single-store boutiques to national grocery giants.</span>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 rounded-3xl h-64 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Team" />
              </div>
              <div className="bg-indigo-600 rounded-3xl h-64 flex flex-col items-center justify-center text-white p-6">
                <p className="text-4xl font-bold mb-2">99%</p>
                <p className="text-sm text-center">Prediction Accuracy target</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    
     {/* PRICING GRID (Preserved from requested good version) */}
      <section id="pricing" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">Simple, Scalable Pricing</h2>
            <p className="text-gray-600 mt-4">Transparent plans designed for retail growth.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
             {/* Starter */}
             <div className="bg-white p-8 rounded-3xl border border-gray-200 flex flex-col h-full">
                <h3 className="text-xl font-bold">Retail Starter</h3>
                <p className="text-gray-500 text-sm mt-2">For single-location stores.</p>
                <p className="text-4xl font-bold my-6">$149<span className="text-sm font-normal text-gray-400">/mo</span></p>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-indigo-600" /> Up to 500 SKUs</li>
                  <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-indigo-600" /> Basic AI Predictions</li>
                  <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-indigo-600" /> Weekly Reports</li>
                </ul>
                <button className="w-full py-3 border border-indigo-600 text-indigo-600 rounded-xl font-bold hover:bg-indigo-50">Get Started</button>
             </div>
             {/* Pro */}
             <div className="bg-white p-8 rounded-3xl border-2 border-indigo-600 shadow-xl flex flex-col h-full relative">
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest">Most Popular</div>
                <h3 className="text-xl font-bold text-indigo-600">Enterprise Core</h3>
                <p className="text-gray-500 text-sm mt-2">For growing grocery chains.</p>
                <p className="text-4xl font-bold my-6">$499<span className="text-sm font-normal text-gray-400">/mo</span></p>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-center gap-2 text-sm font-medium"><CheckCircle2 className="w-4 h-4 text-indigo-600" /> Unlimited SKUs</li>
                  <li className="flex items-center gap-2 text-sm font-medium"><CheckCircle2 className="w-4 h-4 text-indigo-600" /> Real-time Demand Engine</li>
                  <li className="flex items-center gap-2 text-sm font-medium"><CheckCircle2 className="w-4 h-4 text-indigo-600" /> Multi-location Sync</li>
                  <li className="flex items-center gap-2 text-sm font-medium"><CheckCircle2 className="w-4 h-4 text-indigo-600" /> POS Direct Integration</li>
                </ul>
                <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all">Go Professional</button>
             </div>
             {/* Custom */}
             <div className="bg-white p-8 rounded-3xl border border-gray-200 flex flex-col h-full">
                <h3 className="text-xl font-bold">National Scale</h3>
                <p className="text-gray-500 text-sm mt-2">Custom solutions for corporations.</p>
                <p className="text-4xl font-bold my-6 text-gray-400">Custom</p>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-indigo-600" /> API Access</li>
                  <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-indigo-600" /> Custom AI Training</li>
                  <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-indigo-600" /> Dedicated Success Manager</li>
                </ul>
                <button className="w-full py-3 border border-gray-900 text-gray-900 rounded-xl font-bold hover:bg-gray-50">Contact Sales</button>
             </div>
          </div>
        </div>
      </section>

      

           {/* CONTACT (RESTORED) */}
      <section id="contact" className="py-24 bg-slate-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold mb-6">Let&#39;s Optimize Your Floor</h2>
              <p className="text-gray-600 mb-10">Join 400+ retailers transforming their bottom line with NexaSoft.</p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl border border-gray-200 flex items-center justify-center text-indigo-600"></div>
                  <div><p className="text-xs font-bold text-gray-400 uppercase">Email Us</p><p className="font-bold">hello@nexasoft.io</p></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl border border-gray-200 flex items-center justify-center text-indigo-600"></div>
                  <div><p className="text-xs font-bold text-gray-400 uppercase">Call Sales</p><p className="font-bold">+1 (555) 012-3456</p></div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm">
               <div className="grid grid-cols-2 gap-4 mb-4">
                 <input className="bg-gray-50 p-4 rounded-xl text-sm border border-transparent focus:border-indigo-600 outline-none" placeholder="First Name" />
                 <input className="bg-gray-50 p-4 rounded-xl text-sm border border-transparent focus:border-indigo-600 outline-none" placeholder="Last Name" />
               </div>
               <input className="w-full bg-gray-50 p-4 rounded-xl text-sm border border-transparent focus:border-indigo-600 outline-none mb-4" placeholder="Work Email" />
               <textarea className="w-full bg-gray-50 p-4 rounded-xl text-sm border border-transparent focus:border-indigo-600 outline-none h-32 mb-6" placeholder="Tell us about your store..."></textarea>
               <button className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-100">Send Message</button>
            </div>
          </div>
        </div>
      </section>
     
      {/* CTA Section
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-600 rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-center text-white">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-indigo-400 rounded-full blur-3xl opacity-30"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">Ready to let AI handle your inventory?</h2>
              <p className="text-indigo-100 text-xl mb-12">Join forward-thinking businesses and increase your operational efficiency by up to 40% in the first quarter.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-slate-50 transition-all shadow-2xl">
                  Get Started for Free
                </button>
                <button className="bg-indigo-700 text-white border border-indigo-500 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-indigo-800 transition-all">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section> */}


              {/* PRE-RELEASE COMPANY REGISTRATION */}
      <section id="register" className="py-24 bg-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center text-white relative z-10">
          <Building2 className="w-16 h-16 mx-auto mb-8 opacity-80" />
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 tracking-tight">Reserve Early Access for Your Company</h2>
          <p className="text-indigo-100 text-lg mb-10 opacity-90 max-w-2xl mx-auto">
            We are currently accepting a limited number of partner companies for our final beta phase. Secure your position and receive special founding-member pricing.
          </p>
          <div className="bg-white p-2 rounded-4xl shadow-2xl flex flex-col sm:flex-row max-w-2xl mx-auto overflow-hidden">
            <input 
              type="text" 
              placeholder="Your Company Name" 
              className="flex-1 px-6 py-4 text-gray-900 outline-none placeholder:text-gray-400 text-lg border-none focus:ring-0"
            />
            <button className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all m-1">
              Join Waitlist
            </button>
          </div>
          <p className="mt-6 text-indigo-200 text-sm">Join 40+ retail chains already on the list.</p>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-indigo-600 p-1.5 rounded-lg">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900">Nexa<span className="text-indigo-600">Soft</span></span>
              </div>
              <p className="text-slate-500 max-w-xs leading-relaxed">
                Empowering retailers with predictive intelligence and seamless inventory control. The future of commerce is here.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Product</h4>
              <ul className="space-y-4 text-slate-500">
                <li><a href="#" className="hover:text-indigo-600">AI Forecasting</a></li>
                <li><a href="#" className="hover:text-indigo-600">Inventory Sync</a></li>
                <li><a href="#" className="hover:text-indigo-600">Mobile App</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-slate-500">
                <li><a href="#" className="hover:text-indigo-600">About Us</a></li>
                <li><a href="#" className="hover:text-indigo-600">Careers</a></li>
                <li><a href="#" className="hover:text-indigo-600">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Legal</h4>
              <ul className="space-y-4 text-slate-500">
                <li><a href="#" className="hover:text-indigo-600">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-indigo-600">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
            <p>© 2024 NexaSoft AI Solutions Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-indigo-600">Twitter</a>
              <a href="#" className="hover:text-indigo-600">LinkedIn</a>
              <a href="#" className="hover:text-indigo-600">Instagram</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white p-6 flex flex-col items-center justify-center animate-in slide-in-from-top duration-300">
          <button className="absolute top-6 right-6" onClick={() => setIsMenuOpen(false)}>
            <X size={32} />
          </button>
          <div className="flex flex-col gap-8 text-center text-2xl font-bold text-slate-900">
            <a href="#" onClick={() => setIsMenuOpen(false)}>Features</a>
            <a href="#" onClick={() => setIsMenuOpen(false)}>AI Insights</a>
            <a href="#" onClick={() => setIsMenuOpen(false)}>Pricing</a>
            <button className="bg-indigo-600 text-white px-10 py-4 rounded-2xl shadow-lg mt-4">
              Get Started
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;