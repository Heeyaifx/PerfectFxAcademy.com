import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Lock, AlertTriangle, CreditCard, ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const Legal = ({ title, icon: Icon, content }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="legal-container">
      {/* Background Glow Blobs */}
      {/* Background Glow Blobs */}
      <div className="glow-blob"></div>
      <div className="glow-blob glow-blob-2"></div>

      {/* Decorative Floating Shapes */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 45, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="floating-shape shape-1"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -45, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="floating-shape shape-2"
      />

      <div className="legal-hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-8 lg:px-24 relative z-10"
        >
          <div className="breadcrumb">
            <Link to="/"><Home size={14} /> Home</Link>
            <ChevronRight size={14} />
            <span>Legal</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="icon-badge"
            >
              <Icon size={32} />
            </motion.div>
            <motion.h1
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {title}
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="last-updated text-muted"
          >
            Last Updated: January 18, 2026
          </motion.p>
        </motion.div>
      </div>

      <div className="legal-content-wrapper">
        <div className="max-w-7xl mx-auto px-8 lg:px-24 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="legal-card"
          >
            <div className="card-noise"></div>
            <div className="prose">
              {content}
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx="true">{`
        .legal-container {
          padding-top: 140px;
          min-height: 100vh;
          background: #05070a;
          position: relative;
          overflow: hidden;
          /* Custom Gold Scrollbar */
          scrollbar-width: thin;
          scrollbar-color: var(--primary) transparent;
        }

        .legal-container::-webkit-scrollbar {
          width: 6px;
        }
        .legal-container::-webkit-scrollbar-track {
          background: transparent;
        }
        .legal-container::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, var(--primary), #b8860b);
          border-radius: 10px;
        }

        /* Noise Texture */
        .card-noise {
          position: absolute;
          inset: 0;
          z-index: 1;
          opacity: 0.03;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        /* Floating Shapes */
        .floating-shape {
          position: absolute;
          border: 1px solid rgba(212, 175, 55, 0.1);
          pointer-events: none;
          z-index: 1;
        }
        .shape-1 {
          width: 100px;
          height: 100px;
          top: 20%;
          left: 5%;
          border-radius: 20px;
        }
        .shape-2 {
          width: 150px;
          height: 150px;
          bottom: 15%;
          right: 5%;
          border-radius: 50%;
        }

        /* Animated Glow Blobs */
        .glow-blob {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%);
          top: -200px;
          right: -200px;
          border-radius: 50%;
          filter: blur(80px);
          animation: float 20s infinite alternate;
          pointer-events: none;
        }
        .glow-blob-2 {
          background: radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%);
          bottom: -300px;
          left: -300px;
          animation: float 25s infinite alternate-reverse;
        }

        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(50px, 100px) scale(1.1); }
        }

        .legal-hero {
          position: relative;
          padding: 40px 0 60px;
          background: linear-gradient(to bottom, rgba(212, 175, 55, 0.05), transparent);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #64748b;
          font-size: 0.85rem;
          margin-bottom: 40px;
          font-weight: 500;
        }
        .breadcrumb a {
          color: #64748b;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s ease;
        }
        .breadcrumb a:hover {
          color: var(--primary);
        }
        .icon-badge {
          width: 72px;
          height: 72px;
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          box-shadow: 0 0 30px rgba(212, 175, 55, 0.15);
        }
        h1 {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 900;
          background: linear-gradient(to right, #fff, var(--primary), #fff);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
          letter-spacing: -0.02em;
          line-height: 1.2;
          filter: drop-shadow(0 2px 10px rgba(212, 175, 55, 0.2));
        }
        .last-updated {
          font-size: 0.85rem;
          margin-top: 24px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          opacity: 0.7;
          color: var(--primary) !important;
          font-weight: 600;
        }
        .legal-card {
          border-radius: 40px;
          background: rgba(10, 10, 15, 0.7);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border: 1px solid rgba(212, 175, 55, 0.15);
          box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
          position: relative;
          overflow: hidden;
          padding: 100px 12%;
          max-width: 1000px;
          margin: 0 auto;
        }
        .legal-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
          z-index: 2;
        }
        .prose {
          position: relative;
          z-index: 2;
        }
        .prose h2 {
          color: white;
          font-size: 1.5rem;
          margin-top: 4rem;
          margin-bottom: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.01em;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: transform 0.3s ease;
        }
        .prose h2:hover {
          transform: translateX(10px);
        }
        .prose h2:first-child {
          margin-top: 0;
        }
        .prose h2::before {
          content: '';
          display: block;
          width: 8px;
          height: 32px;
          background: linear-gradient(to bottom, var(--primary), transparent);
          border-radius: 4px;
          box-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
        }
        .prose p {
          color: #a0aec0;
          line-height: 1.8;
          margin-bottom: 1.5rem;
          font-size: 1.05rem;
        }
        .prose ul {
          list-style: none;
          padding-left: 0.5rem;
          margin-bottom: 2.5rem;
        }
        .prose li {
          margin-bottom: 1rem;
          line-height: 1.8;
          color: #a0aec0;
          position: relative;
          padding-left: 2rem;
          transition: color 0.3s ease;
        }
        .prose li:hover {
          color: white;
        }
        .prose li::before {
          content: '✦';
          position: absolute;
          left: 0;
          color: var(--primary);
          font-size: 0.8rem;
          top: 2px;
        }
        .prose strong {
          color: var(--primary);
          font-weight: 700;
        }
        @media (max-width: 768px) {
          .legal-container { padding-top: 100px; }
          .legal-hero { padding: 40px 0; }
          .legal-card { padding: 60px 8%; border-radius: 32px; }
          .prose h2 { font-size: 1.6rem; margin-top: 4rem; }
          .prose p { font-size: 1.1rem; }
          .floating-shape { display: none; }
        }
      `}</style>
    </div>
  );
};

export const TermsOfService = () => (
  <Legal
    title="Terms of Service"
    icon={Shield}
    content={
      <>
        <h2>1. Agreement to Terms</h2>
        <p>By accessing the Perfect FX Academy website and our educational materials, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.</p>

        <h2>2. Educational Nature of Services</h2>
        <p>Perfect FX Academy provides <strong>educational content only</strong>. We are not financial advisors, and nothing on this website or in our courses should be interpreted as financial advice, investment recommendations, or a solicitation to buy or sell any financial instruments.</p>

        <h2>3. Intellectual Property</h2>
        <p>All curriculum, videos, PDF guides, and proprietary strategies are the property of Perfect FX Academy. Your purchase grants you a personal, non-exclusive license for personal use. Redistribution, sharing, or reselling of our content is strictly prohibited and will result in immediate termination of access without refund.</p>

        <h2>4. User Accounts</h2>
        <p>You are responsible for maintaining the confidentiality of your account credentials. Any suspicious activity should be reported immediately. We reserve the right to terminate accounts that violate our community standards or sharing policies.</p>
      </>
    }
  />
);

export const PrivacyPolicy = () => (
  <Legal
    title="Privacy Policy"
    icon={Lock}
    content={
      <>
        <h2>1. Information We Collect</h2>
        <p>We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact support. This may include your name, email address, and payment information processed through secure third-party providers.</p>

        <h2>2. How We Use Your Data</h2>
        <p>Your data is used to provide and improve our services, communicate market updates, and ensure the security of our platform. We do not sell your personal information to third parties.</p>

        <h2>3. Data Security</h2>
        <p>We implement industry-standard security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>

        <h2>4. Cookies</h2>
        <p>We use cookies to enhance your browsing experience and analyze site traffic. You can choose to disable cookies through your browser settings, though some features of our site may be affected.</p>
      </>
    }
  />
);

export const RiskDisclosure = () => (
  <Legal
    title="Risk Disclosure"
    icon={AlertTriangle}
    content={
      <>
        <p className="text-white font-bold text-lg mb-6">Trading foreign exchange (Forex) on margin carries a high level of risk and may not be suitable for all investors.</p>

        <h2>1. High Leverage Risk</h2>
        <p>The high degree of leverage available in Forex trading can work against you as well as for you. Before deciding to trade, you should carefully consider your investment objectives, level of experience, and risk appetite.</p>

        <h2>2. Possibility of Loss</h2>
        <p>The possibility exists that you could sustain a loss of some or all of your initial investment. Therefore, you should not invest money that you cannot afford to lose. You should be aware of all the risks associated with Forex trading and seek advice from an independent financial advisor if you have any doubts.</p>

        <h2>3. Past Performance</h2>
        <p>Any testimonials, results, or past performance mentioned on this platform are not necessarily indicative of future results. No representation is being made that any account will or is likely to achieve profits or losses similar to those shown.</p>
      </>
    }
  />
);

export const RefundPolicy = () => (
  <Legal
    title="Refund Policy"
    icon={CreditCard}
    content={
      <>
        <h2>1. Digital Product Nature</h2>
        <p>Due to the digital nature of our educational content (videos, strategy guides, and downloadable resources) and the immediate access granted upon purchase, we generally operate a <strong>No Refund Policy</strong> once the content has been accessed or downloaded.</p>

        <h2>2. Case-by-Case Review</h2>
        <p>We want our students to be successful. If you encounter technical issues that prevent you from accessing the course, or if you feel the content was misrepresented, please contact our support team within 14 days for a case-by-case review.</p>

        <h2>3. Subscription Cancellations</h2>
        <p>For monthly or yearly subscriptions, you can cancel at any time through your dashboard. Your access will remain active until the end of the current billing period, after which no further charges will be made.</p>
      </>
    }
  />
);
