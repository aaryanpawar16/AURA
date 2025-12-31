import React, { useState, useEffect, useMemo, useRef, forwardRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import { 
  ShieldCheck, Search, ShoppingBag, 
  CheckCircle2, Clock, ArrowLeft, 
  Wallet, Zap, Loader2, Star, Truck, AlertTriangle, XCircle, ShoppingCart, CreditCard, Trash2, Plus, Minus, FileCheck, X
} from 'lucide-react';

// --- UTILS ---
const cn = (...classes) => classes.filter(Boolean).join(' ');

// --- FALLBACK DATA ---
const FALLBACK_CATEGORIES = ["All", "Jordan", "Nike", "Adidas", "New Balance", "Accessories"];
const FALLBACK_PRODUCTS = []; 

// --- CARD SPOTLIGHT COMPONENTS ---

const DotPattern = () => {
  return (
    <div className="absolute inset-0 h-full w-full pointer-events-none [mask-image:radial-gradient(transparent,white)]">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
    </div>
  );
};

const CardSpotlight = ({
  children,
  radius = 350,
  color = "#262626",
  className,
  ...props
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "group/spotlight relative border border-neutral-800 bg-black dark:border-neutral-800",
        className
      )}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute z-0 -inset-px rounded-md opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{
          backgroundColor: color,
          maskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 80%
            )
          `,
        }}
      >
        {/* Simplified Reveal Effect: Dot Pattern instead of heavy Three.js Canvas */}
        <div className="h-full w-full bg-transparent absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-indigo-600/20" />
            <DotPattern />
        </div>
      </motion.div>
      {children}
    </div>
  );
};

// --- TOAST COMPONENT ---
const Toast = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-white text-black px-6 py-3 rounded-full shadow-2xl font-bold flex items-center gap-3 border border-gray-200"
        >
            <CheckCircle2 className="text-green-600" size={20} />
            {message}
        </motion.div>
    );
};

// --- CERTIFICATE MODAL COMPONENT ---
const CertificateModal = ({ order, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#1a1a1a] border border-white/10 p-8 rounded-3xl max-w-md w-full relative overflow-hidden"
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition">
                    <X size={24} />
                </button>
                
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500" />
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl" />

                <div className="text-center space-y-6 relative z-10">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
                        <ShieldCheck className="text-emerald-400" size={32} />
                    </div>
                    
                    <div>
                        <h3 className="text-white font-black uppercase tracking-widest text-lg">Certificate of Authenticity</h3>
                        <p className="text-gray-500 text-xs mt-1">Verified by Aura Protocol</p>
                    </div>

                    <div className="bg-black/40 p-4 rounded-xl border border-white/5 space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Product</span>
                            <span className="text-white font-bold">{order.productName}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Order ID</span>
                            <span className="text-white font-mono">{order.id}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Verified Date</span>
                            <span className="text-white">{order.trackingSteps.find(s => s.status.includes("Passed"))?.date}</span>
                        </div>
                        <div className="pt-3 border-t border-white/10 flex justify-between text-sm items-center">
                            <span className="text-gray-500">Status</span>
                            <span className="text-emerald-400 font-black uppercase text-xs flex items-center gap-1">
                                <CheckCircle2 size={12} /> 10/10 Passed
                            </span>
                        </div>
                    </div>

                    <div className="w-full bg-white/5 h-12 rounded-lg flex items-center justify-center">
                        <p className="font-mono text-xs text-gray-500 tracking-[0.5em]">AURA-VERIFIED-{Math.floor(Math.random()*10000)}</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

// --- WAVY BACKGROUND COMPONENT ---
const createNoise3D = () => {
    const perm = new Uint8Array(512);
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;
    for (let i = 0; i < 256; i++) {
        const r = (Math.random() * (256 - i)) | 0;
        const t = p[i]; p[i] = p[i + r]; p[i + r] = t;
        perm[i] = perm[i + 256] = p[i];
    }
    const grad3 = [[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];
    return (x, y, z) => {
        let n0, n1, n2, n3;
        const F3 = 1.0/3.0;
        const s = (x+y+z)*F3;
        const i = Math.floor(x+s), j = Math.floor(y+s), k = Math.floor(z+s);
        const G3 = 1.0/6.0;
        const t = (i+j+k)*G3;
        const X0 = i-t, Y0 = j-t, Z0 = k-t;
        const x0 = x-X0, y0 = y-Y0, z0 = z-Z0;
        let i1, j1, k1, i2, j2, k2;
        if(x0>=y0) {
            if(y0>=z0) { i1=1; j1=0; k1=0; i2=1; j2=1; k2=0; }
            else if(x0>=z0) { i1=1; j1=0; k1=0; i2=1; j2=0; k2=1; }
            else { i1=0; j1=0; k1=1; i2=1; j2=0; k2=1; }
        } else {
            if(y0<z0) { i1=0; j1=0; k1=1; i2=0; j2=1; k2=1; }
            else if(x0<z0) { i1=0; j1=1; k1=0; i2=0; j2=1; k2=1; }
            else { i1=0; j1=1; k1=0; i2=1; j2=1; k2=0; }
        }
        const x1 = x0 - i1 + G3, y1 = y0 - j1 + G3, z1 = z0 - k1 + G3;
        const x2 = x0 - i2 + 2.0*G3, y2 = y0 - j2 + 2.0*G3, z2 = z0 - k2 + 2.0*G3;
        const x3 = x0 - 1.0 + 3.0*G3, y3 = y0 - 1.0 + 3.0*G3, z3 = z0 - 1.0 + 3.0*G3;
        const ii = i & 255, jj = j & 255, kk = k & 255;
        const gi0 = perm[ii+perm[jj+perm[kk]]] % 12;
        const gi1 = perm[ii+i1+perm[jj+j1+perm[kk+k1]]] % 12;
        const gi2 = perm[ii+i2+perm[jj+j2+perm[kk+k2]]] % 12;
        const gi3 = perm[ii+1+perm[jj+1+perm[kk+1]]] % 12;
        let t0 = 0.6 - x0*x0 - y0*y0 - z0*z0;
        if(t0<0) n0 = 0.0;
        else { t0 *= t0; n0 = t0 * t0 * (grad3[gi0][0]*x0 + grad3[gi0][1]*y0 + grad3[gi0][2]*z0); }
        let t1 = 0.6 - x1*x1 - y1*y1 - z1*z1;
        if(t1<0) n1 = 0.0;
        else { t1 *= t1; n1 = t1 * t1 * (grad3[gi1][0]*x1 + grad3[gi1][1]*y1 + grad3[gi1][2]*z1); }
        let t2 = 0.6 - x2*x2 - y2*y2 - z2*z2;
        if(t2<0) n2 = 0.0;
        else { t2 *= t2; n2 = t2 * t2 * (grad3[gi2][0]*x2 + grad3[gi2][1]*y2 + grad3[gi2][2]*z2); }
        let t3 = 0.6 - x3*x3 - y3*y3 - z3*z3;
        if(t3<0) n3 = 0.0;
        else { t3 *= t3; n3 = t3 * t3 * (grad3[gi3][0]*x3 + grad3[gi3][1]*y3 + grad3[gi3][2]*z3); }
        return 32.0*(n0 + n1 + n2 + n3);
    };
};

const WavyBackground = ({ children, className, containerClassName, colors, waveWidth, backgroundFill, blur = 10, speed = "fast", waveOpacity = 0.5, ...props }) => {
    const noise = createNoise3D();
    let w, h, nt, i, x, ctx, canvas;
    const canvasRef = useRef(null);
    const getSpeed = () => speed === "fast" ? 0.002 : 0.001;
    const init = () => {
        canvas = canvasRef.current;
        if (!canvas) return;
        ctx = canvas.getContext("2d");
        w = ctx.canvas.width = window.innerWidth;
        h = ctx.canvas.height = window.innerHeight;
        ctx.filter = `blur(${blur}px)`;
        nt = 0;
        window.addEventListener('resize', handleResize);
        render();
    };
    const handleResize = () => {
        if (!ctx) return;
        w = ctx.canvas.width = window.innerWidth;
        h = ctx.canvas.height = window.innerHeight;
        ctx.filter = `blur(${blur}px)`;
    };
    const waveColors = colors ?? ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"];
    const drawWave = (n) => {
        nt += getSpeed();
        for (i = 0; i < n; i++) {
            ctx.beginPath();
            ctx.lineWidth = waveWidth || 50;
            ctx.strokeStyle = waveColors[i % waveColors.length];
            for (x = 0; x < w; x += 5) {
                var y = noise(x / 800, 0.3 * i, nt) * 100;
                ctx.lineTo(x, y + h * 0.5); 
            }
            ctx.stroke();
            ctx.closePath();
        }
    };
    let animationId;
    const render = () => {
        if (!ctx) return;
        ctx.fillStyle = backgroundFill || "black";
        ctx.globalAlpha = waveOpacity || 0.5;
        ctx.fillRect(0, 0, w, h);
        drawWave(5);
        animationId = requestAnimationFrame(render);
    };
    useEffect(() => { init(); return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', handleResize); }; }, []);
    return (
        <div className={cn("h-full flex flex-col items-center justify-center", containerClassName)}>
            <canvas className="absolute inset-0 z-0" ref={canvasRef} id="canvas"></canvas>
            <div className={cn("relative z-10", className)} {...props}>{children}</div>
        </div>
    );
};

// --- NAVIGATION ---
const Navbar = ({ view, setView, cartCount, searchQuery, setSearchQuery }) => {
  const navItems = [{ id: 'home', label: 'Catalog', icon: <ShoppingBag size={14}/> }, { id: 'tracking', label: 'Tracking', icon: <Truck size={14} /> }];
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-12 w-full md:w-auto justify-between">
        <h1 onClick={() => setView('home')} className="text-2xl font-black tracking-tighter text-white cursor-pointer italic group">
          A<span className="group-hover:text-violet-500 transition-colors">U</span>RA
        </h1>
        <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
          {navItems.map(item => (
            <button key={item.id} onClick={() => setView(item.id)} className={cn("hover:text-white transition-all py-2 flex items-center gap-2", view === item.id ? 'text-white' : '')}>
              {item.icon} {item.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="relative flex-1 md:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors placeholder:text-gray-600"
            />
        </div>
        
        <div className="relative group cursor-pointer text-white" onClick={() => setView('cart')}>
             {cartCount > 0 && (
                 <div className="absolute -top-2 -right-2 w-4 h-4 bg-violet-500 rounded-full flex items-center justify-center text-[8px] font-bold">
                     {cartCount}
                 </div>
             )}
             <ShoppingBag size={18} className="group-hover:text-violet-400 transition" />
        </div>
      </div>
    </nav>
  );
};

// --- CART PAGE ---
const CartPage = ({ cart, removeFromCart, setView }) => {
    const total = cart.reduce((acc, item) => acc + item.price, 0);

    return (
        <div className="pt-32 px-6 max-w-4xl mx-auto pb-20 min-h-screen">
            <h2 className="text-4xl font-black text-white italic uppercase mb-10">Your Cart</h2>
            
            {cart.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                    <ShoppingBag size={48} className="mx-auto text-gray-600 mb-4" />
                    <p className="text-gray-400 text-lg mb-6">Your bag is empty.</p>
                    <button onClick={() => setView('home')} className="bg-white text-black px-8 py-3 rounded-full font-bold uppercase tracking-wide hover:bg-gray-200 transition">
                        Start Shopping
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Cart Items List */}
                    <div className="md:col-span-2 space-y-4">
                        {cart.map((item, idx) => (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={`${item.id}-${idx}`} 
                                className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl items-center"
                            >
                                <div className="w-20 h-20 bg-white rounded-lg p-2 flex items-center justify-center shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-white text-sm">{item.name}</h4>
                                    <p className="text-xs text-violet-400 font-bold uppercase tracking-widest">{item.brand}</p>
                                    <p className="text-lg font-black mt-1">${item.price}</p>
                                </div>
                                <button 
                                    onClick={() => removeFromCart(idx)}
                                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="h-fit bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-32">
                        <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">Order Summary</h3>
                        <div className="space-y-3 text-sm text-gray-400 mb-6">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="text-white">${total}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="text-white">Calculated at checkout</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span className="text-white">$0.00</span>
                            </div>
                        </div>
                        <div className="border-t border-white/10 pt-4 mb-6">
                            <div className="flex justify-between text-lg font-black text-white">
                                <span>Total</span>
                                <span>${total}</span>
                            </div>
                        </div>
                        <button className="w-full bg-white text-black py-4 rounded-xl font-black uppercase italic tracking-widest hover:bg-violet-500 hover:text-white transition-all flex items-center justify-center gap-2">
                            <CreditCard size={18} /> Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

// --- TRACKING PAGE ---
const TrackingPage = ({ orders }) => {
    const [selectedOrder, setSelectedOrder] = useState(null);

    return (
        <div className="pt-32 px-6 max-w-4xl mx-auto pb-20 min-h-screen">
            <h2 className="text-4xl font-black text-white italic uppercase mb-10">Order Tracking</h2>
            <div className="space-y-8">
                {orders.length === 0 ? (
                    <div className="text-gray-500 text-center py-20 bg-white/5 rounded-3xl border border-white/10">No active orders found.</div>
                ) : (
                    orders.map(order => (
                        <div key={order.id} className="bg-white/5 border border-white/10 rounded-3xl p-8">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold text-white">{order.productName}</h3>
                                        <span className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider", 
                                            order.status === 'Refunded' ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"
                                        )}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-400 font-mono">ID: {order.id}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold text-white">${order.price}</p>
                                    <p className="text-xs text-gray-400">{order.purchaseDate}</p>
                                </div>
                            </div>

                            {/* Timeline */}
                            <div className="space-y-6 relative pl-4 border-l-2 border-white/10 ml-2">
                                {order.trackingSteps.map((step, idx) => (
                                    <div key={idx} className="relative pl-6">
                                        <div className={cn(
                                            "absolute -left-[25px] top-0 w-4 h-4 rounded-full border-2",
                                            step.completed ? 
                                                (step.status.includes("Failed") ? "bg-red-500 border-red-500" : "bg-violet-500 border-violet-500") 
                                                : "bg-black border-gray-600"
                                        )} />
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className={cn("text-sm font-bold", step.completed ? "text-white" : "text-gray-600")}>{step.status}</p>
                                                <p className="text-xs text-gray-500">{step.date}</p>
                                            </div>
                                            {step.completed && step.status.includes("Passed") && (
                                                <button 
                                                    onClick={() => setSelectedOrder(order)}
                                                    className="px-3 py-1 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 rounded-full text-[10px] font-bold text-violet-400 uppercase tracking-widest flex items-center gap-1 transition-colors"
                                                >
                                                    <FileCheck size={12} /> View Certificate
                                                </button>
                                            )}
                                        </div>
                                        {step.details && (
                                            <div className="mt-2 p-3 bg-white/5 rounded-lg text-xs text-gray-300 border border-white/5">
                                                {step.status.includes("Failed") && <AlertTriangle size={12} className="inline mr-2 text-red-500"/>}
                                                {step.status.includes("Passed") && <ShieldCheck size={12} className="inline mr-2 text-green-500"/>}
                                                {step.details}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
            
            <AnimatePresence>
                {selectedOrder && (
                    <CertificateModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
                )}
            </AnimatePresence>
        </div>
    );
};

// --- HOME PAGE ---
const HomePage = ({ onProductSelect, products, categories, selectedCat, setSelectedCat, isLoading, searchQuery }) => {
  const filteredProducts = useMemo(() => {
    let result = products;
    
    // Filter by Category
    if (selectedCat !== "All") {
        result = result.filter(p => p.brand === selectedCat);
    }
    
    // Filter by Search Query
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        result = result.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.brand.toLowerCase().includes(query)
        );
    }
    
    return result;
  }, [products, selectedCat, searchQuery]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-20 relative">
      <div className="h-[40rem] md:h-[50rem] w-full bg-black rounded-md overflow-hidden relative">
        <WavyBackground backgroundFill="black" className="max-w-4xl mx-auto" colors={["#818cf8", "#c084fc", "#e879f9", "#22d3ee"]} blur={10}>
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }} className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full text-[10px] font-black text-violet-400 uppercase tracking-widest mb-6 backdrop-blur-md">
                <Zap size={10} fill="currentColor" /> Marketplace Live
            </div>
            <h2 className="text-7xl md:text-9xl font-black tracking-tighter text-white italic leading-[0.8] uppercase mb-8 drop-shadow-2xl">
                THE PULSE OF <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 drop-shadow-[0_0_25px_rgba(239,68,68,0.5)]">CULTURE.</span>
            </h2>
            <p className="max-w-lg mx-auto text-gray-300 text-sm md:text-base font-medium tracking-wide drop-shadow-lg">
                Experience the collision of high-fashion and street culture in a decentralized marketplace.
            </p>
            </motion.div>
        </WavyBackground>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-30">
        <div className="flex items-center gap-2 bg-[#121212]/80 backdrop-blur-xl border border-white/10 p-1 rounded-2xl mb-12 w-fit overflow-x-auto">
          {isLoading ? (
            <div className="px-6 py-2 text-gray-500 text-[10px] uppercase tracking-widest flex items-center gap-2">
              <Loader2 className="animate-spin" size={12} /> Loading...
            </div>
          ) : (
            categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCat(cat)} className={cn("px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap", selectedCat === cat ? "bg-white text-black" : "text-gray-500 hover:text-white")}>
                {cat}
              </button>
            ))
          )}
        </div>

        {isLoading ? (
          <div className="h-64 flex items-center justify-center text-gray-500"><Loader2 className="animate-spin mb-2" size={32} /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.length === 0 ? (
                <div className="col-span-full text-center py-20">
                    <p className="text-gray-500">No products found matching "{searchQuery}"</p>
                </div>
            ) : (
                filteredProducts.map(p => (
                <CardSpotlight key={p.id} className="p-0 rounded-[40px] border border-white/5 bg-transparent cursor-pointer hover:bg-white/[0.07] transition-all" onClick={() => onProductSelect(p)}>
                    <div className="p-8 relative z-20">
                        <div className="relative h-48 mb-8 flex items-center justify-center">
                        <img src={p.image} className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-110" alt={p.name} />
                        </div>
                        <div>
                        <p className="text-[10px] text-violet-400 font-black uppercase tracking-[0.2em] mb-1">{p.brand}</p>
                        <h4 className="text-sm font-bold text-white mb-2">{p.name}</h4>
                        <p className="text-lg font-black text-white">${p.price}</p>
                        </div>
                    </div>
                </CardSpotlight>
                ))
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// --- PRODUCT DETAIL PAGE ---
const ProductDetail = ({ product, goBack, qualityStandards, reviews, addToCart, onAddToCartClick }) => {
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(product);
        setIsAdded(true);
        onAddToCartClick(); // Trigger toast
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="pt-32 px-6 max-w-7xl mx-auto pb-20 min-h-screen">
            <button onClick={goBack} className="flex items-center gap-2 text-gray-500 hover:text-white mb-10 uppercase font-black text-xs tracking-widest">
                <ArrowLeft size={16} /> Back
            </button>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Left Col: Image & Authenticity */}
                <div>
                    <div className="bg-white/5 rounded-[40px] border border-white/10 p-10 mb-8 flex items-center justify-center">
                         <img src={product.image} className="w-full max-w-lg h-auto object-contain drop-shadow-2xl" alt={product.name} />
                    </div>
                    
                    {/* Quality Check List */}
                    <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <ShieldCheck className="text-emerald-400" size={24} />
                            <h3 className="text-xl font-bold text-white">10-Point Quality Check</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {qualityStandards.map((std, i) => (
                                <div key={i} className="flex items-start gap-3 text-sm text-gray-400">
                                    <CheckCircle2 size={16} className="text-violet-500 mt-1 shrink-0" />
                                    <span>{std}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Col: Info, Sellers, Reviews */}
                <div>
                    <span className="text-violet-400 font-black uppercase tracking-widest text-xs">{product.brand}</span>
                    <h1 className="text-5xl font-black uppercase italic mt-2 mb-6 leading-tight">{product.name}</h1>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-4 mb-10">
                        <button className="flex-1 bg-white text-black font-black uppercase italic tracking-widest py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                            <CreditCard size={20} /> Buy Now
                        </button>
                        <button 
                            onClick={handleAddToCart}
                            className={cn(
                                "flex-1 font-black uppercase italic tracking-widest py-4 rounded-xl border transition-all flex items-center justify-center gap-2",
                                isAdded ? "bg-green-500 text-white border-green-500" : "bg-white/10 text-white border-white/10 hover:bg-white/20"
                            )}
                        >
                            {isAdded ? <CheckCircle2 size={20} /> : <ShoppingCart size={20} />} 
                            {isAdded ? "Added!" : "Add to Cart"}
                        </button>
                    </div>

                    {/* Seller Comparison */}
                    <div className="mb-10">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Compare Sellers</h3>
                        <div className="space-y-3">
                            {product.sellers && product.sellers.map(seller => (
                                <div key={seller.id} className="flex items-center justify-between bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/5 transition-all cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold">
                                            {seller.name.substring(0,2).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-bold text-white">{seller.name}</p>
                                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                                <span className="text-emerald-400 font-bold">{seller.trust}% Trust</span> • {seller.condition}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-black text-white">${seller.price}</p>
                                        <p className="text-[10px] text-gray-400">{seller.delivery}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Reviews */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Reviews ({reviews.filter(r => r.productId === product.id).length})</h3>
                        <div className="space-y-4">
                            {reviews.filter(r => r.productId === product.id).length === 0 && <p className="text-gray-500 italic">No reviews yet.</p>}
                            {reviews.filter(r => r.productId === product.id).map(r => (
                                <div key={r.id} className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
                                    <div className="flex justify-between mb-2">
                                        <span className="font-bold text-white text-sm">{r.user}</span>
                                        <span className="text-xs text-gray-500">{r.date}</span>
                                    </div>
                                    <div className="flex gap-1 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={12} className={i < r.rating ? "fill-yellow-500 text-yellow-500" : "text-gray-700"} />
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-300">"{r.comment}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- MAIN APP ---
export default function App() {
  const [view, setView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Data State
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);
  const [orders, setOrders] = useState([]);
  const [qualityStandards, setQualityStandards] = useState([]);
  const [reviews, setReviews] = useState([]);
  
  // Cart & UI State
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  const addToCart = (product) => {
      setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
  };

  const triggerToast = (msg) => {
      setToastMessage(msg);
  };

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Connecting to Aura Backend...");
        const [prodRes, catRes, qualRes, ordRes, revRes] = await Promise.all([
          fetch('http://localhost:5000/api/products'),
          fetch('http://localhost:5000/api/categories'),
          fetch('http://localhost:5000/api/quality'),
          fetch('http://localhost:5000/api/orders'),
          fetch('http://localhost:5000/api/reviews')
        ]);

        if (!prodRes.ok) throw new Error("Backend unreachable");

        setProducts(await prodRes.json());
        setCategories(await catRes.json());
        setQualityStandards(await qualRes.json());
        setOrders(await ordRes.json());
        setReviews(await revRes.json());
        console.log("✅ Connected!");

      } catch (error) {
        console.warn("⚠️ Backend unavailable. Using fallback.", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-violet-500/50 flex flex-col">
      <Navbar 
        view={view} 
        setView={setView} 
        cartCount={cart.length} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <HomePage 
                onProductSelect={(p) => { setSelectedProduct(p); setView('detail'); }} 
                products={products}
                categories={categories}
                selectedCat={selectedCat}
                setSelectedCat={setSelectedCat}
                isLoading={isLoading}
                searchQuery={searchQuery}
            />
          )}
          {view === 'detail' && selectedProduct && (
            <ProductDetail 
                product={selectedProduct} 
                goBack={() => setView('home')} 
                qualityStandards={qualityStandards}
                reviews={reviews}
                addToCart={addToCart}
                onAddToCartClick={() => triggerToast("Added to Cart")}
            />
          )}
          {view === 'tracking' && (
              <TrackingPage orders={orders} />
          )}
          {view === 'cart' && (
              <CartPage cart={cart} removeFromCart={removeFromCart} setView={setView} />
          )}
        </AnimatePresence>
      </main>
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
            <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        )}
      </AnimatePresence>
      
      {/* Footer */}
      <footer className="bg-black/50 border-t border-white/5 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Aura Marketplace. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}