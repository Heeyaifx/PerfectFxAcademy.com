import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Zap, Star, Shield, ArrowRight } from 'lucide-react';

export default function Pricing() {
    const tiers = [
        {
            name: "Starter",
            price: "$97",
            period: "/lifetime",
            description: "Perfect for beginners starting their journey.",
            features: [
                "Basic Forex Course",
                "Community Access",
                "Weekly Market Outlook",
                "Standard Support"
            ],
            highlight: false,
            btnText: "Get Started"
        },
        {
            name: "Pro Trader",
            price: "$297",
            period: "/lifetime",
            description: "Everything you need to become profitable.",
            features: [
                "Full Basic to Pro Course",
                "My Personal Scalping Strategy",
                "Daily Trade Signals",
                "Private Discord Access",
                "Live Trading Sessions"
            ],
            highlight: true,
            btnText: "Join Pro"
        },
        {
            name: "Inner Circle",
            price: "$997",
            period: "/year",
            description: "Direct mentorship for serious traders.",
            features: [
                "Everything in Pro",
                "1-on-1 Mentorship Calls",
                "Portfolio Management",
                "Institutional Data Access",
                "Priority 24/7 Support"
            ],
            highlight: false,
            btnText: "Apply Now"
        }
    ];

    return (
        <div className="pricing-page">
            <div className="pricing-container max-w-6xl mx-auto px-6">

                <div className="header-section text-center mb-16 relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-4"
                    >
                        Invest in your <span className="text-gold">Trading Career</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-muted max-w-xl mx-auto"
                    >
                        Straightforward pricing. Lifetime access. No hidden fees.
                    </motion.p>
                </div>

                <div className="tiers-grid">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className={`pricing-card glass-card ${tier.highlight ? 'highlighted' : ''}`}
                        >
                            {tier.highlight && (
                                <div className="popular-badge">MOST POPULAR</div>
                            )}

                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold mb-2">{tier.name}</h2>
                                <div className="price-tag my-4">
                                    <span className={`text-4xl font-bold ${tier.highlight ? 'text-gold' : 'text-white'}`}>{tier.price}</span>
                                    <span className="text-muted text-sm">{tier.period}</span>
                                </div>
                                <p className="text-muted text-sm">{tier.description}</p>
                            </div>

                            <div className="divider my-6"></div>

                            <ul className="benefits-list space-y-3 mb-8 text-left">
                                {tier.features.map((feat, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm">
                                        <CheckCircle className={tier.highlight ? "text-gold" : "text-muted"} size={16} />
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => window.open('https://t.me/your_telegram', '_blank')}
                                className={`w-full py-3 rounded-lg font-bold transition-all ${tier.highlight
                                    ? 'btn-gold shadow-lg'
                                    : 'bg-white/5 hover:bg-white/10 border border-white/10'
                                    }`}
                            >
                                {tier.btnText}
                            </button>
                        </motion.div>
                    ))}
                </div>

                <p className="text-center text-xs text-muted mt-12 flex items-center justify-center gap-1">
                    <Shield size={12} /> Secure crypto & bank payments accepted
                </p>

            </div>

            <style jsx="true">{`
        .pricing-page {
            min-height: 100vh;
            padding: 140px 20px 100px;
            background: radial-gradient(circle at top, #1a1c1e 0%, #05070a 50%);
        }
        .tiers-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
            /* align-items: start; *//* Let them stretch to equal height */
            max-width: 100%;
            margin: 0 auto;
        }
        @media (min-width: 1024px) {
            .tiers-grid {
                grid-template-columns: repeat(3, 1fr);
            }
        }
        
        /* ... */

        .benefits-list {
            flex-grow: 1;
        }
        .text-gold { color: #FFD700; }
        .glass-card {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            padding: 40px 30px;
            position: relative;
            transition: transform 0.3s ease, border-color 0.3s ease;
            height: 100%; /* Fill the grid cell height */
            display: flex;
            flex-direction: column;
        }
        .glass-card:hover {
            transform: translateY(-5px);
            border-color: rgba(255, 215, 0, 0.3);
        }
        .highlighted {
            background: rgba(255, 215, 0, 0.03);
            border: 1px solid rgba(255, 215, 0, 0.4);
            box-shadow: 0 0 40px rgba(255, 215, 0, 0.05);
            /* Removed scale(1.05) to keep same size */
            z-index: 10;
        }
        .highlighted:hover {
            transform: translateY(-5px); /* Consistent hover effect */
        }
        .popular-badge {
            position: absolute;
            top: -12px;
            left: 50%;
            transform: translateX(-50%);
            background: #FFD700;
            color: black;
            font-weight: 800;
            font-size: 0.75rem;
            padding: 4px 16px;
            border-radius: 20px;
            letter-spacing: 0.5px;
        }
        .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
        }
        .btn-gold {
            background: linear-gradient(135deg, #FFD700, #B8860B);
            color: black;
            border: none;
        }
        .btn-gold:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(255, 215, 0, 0.2);
        }
        /* Tailwind Utilities Emulation if not present */
        .text-center { text-align: center; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .mb-2 { margin-bottom: 0.5rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-8 { margin-bottom: 2rem; }
        .mb-16 { margin-bottom: 4rem; }
        .mb-20 { margin-bottom: 5rem; }
        .mt-4 { margin-top: 1rem; }
        .mt-12 { margin-top: 3rem; }
        .my-4 { margin-top: 1rem; margin-bottom: 1rem; }
        .my-6 { margin-top: 1.5rem; margin-bottom: 1.5rem; }
        .text-sm { font-size: 0.875rem; }
        .text-xs { font-size: 0.75rem; }
        .text-lg { font-size: 1.125rem; }
        .text-xl { font-size: 1.25rem; }
        .text-2xl { font-size: 1.5rem; }
        .text-4xl { font-size: 2.25rem; }
        .text-5xl { font-size: 3rem; }
        .text-6xl { font-size: 3.75rem; }
        .font-bold { font-weight: 700; }
        .w-full { width: 100%; }
        .max-w-xl { max-width: 36rem; }
        .max-w-2xl { max-width: 42rem; }
        .max-w-6xl { max-width: 72rem; }
        .max-w-7xl { max-width: 80rem; }
        .flex { display: flex; }
        .items-center { align-items: center; }
        .justify-center { justify-content: center; }
        .gap-1 { gap: 0.25rem; }
        .gap-3 { gap: 0.75rem; }
        .space-y-3 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.75rem; }
        .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
        .rounded-lg { border-radius: 0.5rem; }
        .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
        .transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
        .bg-white\/5 { background-color: rgba(255, 255, 255, 0.05); }
        .hover\:bg-white\/10:hover { background-color: rgba(255, 255, 255, 0.1); }
        .border-white\/10 { border-color: rgba(255, 255, 255, 0.1); }
        
        /* Mobile Responsive */
        @media (max-width: 768px) {
            .pricing-page {
                padding: 100px 16px 60px;
            }
            .glass-card {
                padding: 30px 20px;
            }
            .text-4xl { font-size: 2rem; }
            .text-5xl { font-size: 2.5rem; }
            .mb-16 { margin-bottom: 2.5rem; }
        }
        @media (max-width: 480px) {
            .pricing-page {
                padding: 90px 12px 40px;
            }
            .text-4xl { font-size: 1.75rem; }
            .text-lg { font-size: 1rem; }
        }
      `}</style>
        </div>
    );
}
