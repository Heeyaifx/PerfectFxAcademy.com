import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ShieldCheck, PlayCircle, Users, Award, BookOpen, Check, X, Plus, Minus, MapPin, Target, Code, Zap } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import TestimonialCard from '../components/TestimonialCard';

const Home = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Full-time Trader",
      location: "New York, USA",
      rating: 5,
      review: "Perfect FX Academy completely transformed my trading journey. The systematic approach and daily market guidance helped me go from struggling to consistently profitable. Best investment I've ever made!",
      result: "From $500 to $5,000 in 3 months",
      image: null
    },
    {
      name: "Michael Chen",
      role: "Part-time Trader",
      location: "Singapore",
      rating: 5,
      review: "The personal scalping strategy alone was worth the entire course fee. I finally understand market structure and liquidity. Passed my first prop firm challenge thanks to the risk management module!",
      result: "Passed $100K Funded Challenge",
      image: null
    },
    {
      name: "Emma Rodriguez",
      role: "Student Trader",
      location: "London, UK",
      rating: 5,
      review: "As a complete beginner, I was overwhelmed by forex. This academy broke everything down systematically. The community support and mentor's expertise made all the difference. Now trading confidently!",
      result: "Achieved 85% Win Rate",
      image: null
    },
    {
      name: "David Kumar",
      role: "Professional Trader",
      location: "Mumbai, India",
      rating: 5,
      review: "I've tried many courses, but Perfect FX Academy stands out. The focus on psychology and capital preservation is what separates winners from losers. My drawdowns reduced by 60% after implementing their system.",
      result: "Reduced Drawdown by 60%",
      image: null
    },
    {
      name: "Lisa Thompson",
      role: "Forex Enthusiast",
      location: "Toronto, Canada",
      rating: 5,
      review: "The daily market breakdowns are pure gold. I learn something new every single day. The mentor's 4 years of experience really shows in the quality of content and real-world application.",
      result: "Consistent Monthly Profits",
      image: null
    },
    {
      name: "James Wilson",
      role: "Funded Trader",
      location: "Sydney, Australia",
      rating: 5,
      review: "This isn't just another course - it's a complete operating system for trading. The infrastructure and systematic processes they teach are what professional traders actually use. Game changer!",
      result: "Managing $200K Funded Account",
      image: null
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-content"
        >
          <motion.div
            initial={{ rotate: -5, y: 10, opacity: 0 }}
            animate={{ rotate: 2, y: 0, opacity: 1 }}
            transition={{
              duration: 1,
              y: { duration: 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
              rotate: { duration: 6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
            }}
            className="badge prestige-badge-hero mb-6"
          >
            <Award size={16} className="text-primary" />
            <span className="ml-2">4 YEARS OF EXCELLENCE</span>
          </motion.div>
          <h1>Master the <span className="text-gradient">Forex Market</span> with Perfect FX Academy</h1>
          <p className="subtitle">
            Skip the trial and error. Learn the exact strategies I've used for the last 4 years to navigate the markets profitably. Your journey to financial freedom starts here.
          </p>
          <div className="hero-btns">
            <Link to="/register" className="btn-premium btn-primary">Start Learning Now</Link>
            <a href="#curriculum" className="btn-premium btn-outline">Explore Courses</a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="hero-image"
        >
          {/* Background Glow */}
          <div className="hero-glow"></div>

          {/* Floating Decorations */}
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="hero-decoration decor-circle"
          ></motion.div>
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="hero-decoration decor-line"
          ></motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="stats-glass glass"
          >
            <div className="stat">
              <span className="stat-num">95%</span>
              <span className="stat-label">Accuracy</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-num">100+</span>
              <span className="stat-label">Students</span>
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="chart-preview glass"
          >
            <TrendingUp color="#d4af37" size={40} />
            <div className="chart-bars">
              <div className="bar" style={{ height: '40%' }}></div>
              <div className="bar" style={{ height: '70%' }}></div>
              <div className="bar" style={{ height: '55%' }}></div>
              <div className="bar" style={{ height: '90%' }}></div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Comparison Section */}
      <section className="comparison">
        <div className="section-header">
          <h2><span className="text-muted">Most Educators</span> vs <span className="text-primary">Perfect FX Academy</span></h2>
          <p>They give you strategy knowledge. We give you professional infrastructure.</p>
        </div>

        <div className="comparison-grid">
          {/* The Others */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="comparison-card glass failed"
          >
            <h3>Most Trading Educators</h3>
            <div className="fail-header">
              <span className="fail-icon"><X size={32} /></span>
              <span>Why they fail you</span>
            </div>
            <ul className="comparison-list">
              <li>
                <X size={20} className="text-red-500" />
                <div>
                  <strong>One-time course content</strong>
                  <p>You're left to figure out execution alone</p>
                </div>
              </li>
              <li>
                <X size={20} className="text-red-500" />
                <div>
                  <strong>Theory-only lessons</strong>
                  <p>No real-time guidance when markets move</p>
                </div>
              </li>
              <li>
                <X size={20} className="text-red-500" />
                <div>
                  <strong>One-size-fits-all strategies</strong>
                  <p>No personalised system for your situation</p>
                </div>
              </li>
              <li>
                <X size={20} className="text-red-500" />
                <div>
                  <strong>No ongoing support</strong>
                  <p>You're stuck when you hit obstacles</p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Perfect FX */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="comparison-card glass success"
          >
            <h3>With Perfect FX Academy</h3>
            <div className="success-header">
              <span className="success-icon"><Check size={32} /></span>
              <span>Your path to success</span>
            </div>
            <ul className="comparison-list">
              <li>
                <Check size={20} className="text-primary" />
                <div>
                  <strong>Complete operating system</strong>
                  <p>Systematic process for every scenario</p>
                </div>
              </li>
              <li>
                <Check size={20} className="text-primary" />
                <div>
                  <strong>Daily market guidance</strong>
                  <p>Real-time application of your strategy</p>
                </div>
              </li>
              <li>
                <Check size={20} className="text-primary" />
                <div>
                  <strong>Ongoing coaching</strong>
                  <p>Same-day answers to every question</p>
                </div>
              </li>
              <li>
                <Check size={20} className="text-primary" />
                <div>
                  <strong>Professional community</strong>
                  <p>Network with consistently funded traders</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="difference-cta">
          <p className="difference-text">
            <span className="text-primary font-bold">The difference:</span> Other educators teach you to trade.
            <br />
            We install the infrastructure that professional traders use to stay consistent.
          </p>
          <Link to="/register" className="btn-premium btn-primary pulse-btn">
            JOIN PERFECT FX ACADEMY
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="max-w-7xl mx-auto px-8 lg:px-24">
          <div className="about-grid">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="about-image-container"
            >
              <div className="about-image-blob"></div>
              <div className="about-image-card">
                {/* Floating Badge */}
                <motion.div
                  initial={{ rotate: -10, y: 10 }}
                  animate={{ rotate: -5, y: -5 }}
                  transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
                  className="floating-prestige-badge"
                >
                  <Award size={16} />
                  <span>PRESTIGE COMMUNITY</span>
                </motion.div>

                <div className="about-icon-main">
                  <MapPin size={40} className="text-primary" />
                </div>
                <h3>Manipur Base Community</h3>
                <p>Rooted in the heart of Manipur, we've built a thriving ecosystem of traders dedicated to professional growth and local empowerment.</p>
                <div className="about-stats mt-6">
                  <div className="about-stat-item">
                    <span className="stat-value">500+</span>
                    <span className="stat-label">Active Members</span>
                  </div>
                  <div className="about-stat-item">
                    <span className="stat-value">95%</span>
                    <span className="stat-label">Success Rate</span>
                  </div>
                </div>
              </div>

              {/* Decorative Background Elements */}
              <div className="about-decoration decor-1"></div>
              <div className="about-decoration decor-2"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="about-content"
            >
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="prestige-label mb-6"
              >
                WHO WE ARE
              </motion.div>
              <h2>Building the Future of <span className="text-primary">Professional Trading</span></h2>
              <p className="about-main-text">
                Perfect FX Academy is more than just a training program. We are a community-driven institution that simplifies complex institutional concepts into actionable trading systems.
              </p>

              <div className="about-pillars">
                <div className="pillar-item">
                  <div className="pillar-icon"><Target size={24} /></div>
                  <div>
                    <h4>ICT Concepts</h4>
                    <p>Mastering Inner Circle Trader methodologies, liquidity pools, and order blocks with surgical precision.</p>
                  </div>
                </div>
                <div className="pillar-item">
                  <div className="pillar-icon"><Zap size={24} /></div>
                  <div>
                    <h4>CRT Methodology</h4>
                    <p>Proprietary Crystal Clear Concepts designed for high-probability setups in any market condition.</p>
                  </div>
                </div>
                <div className="pillar-item">
                  <div className="pillar-icon"><Code size={24} /></div>
                  <div>
                    <h4>Algo Trading</h4>
                    <p>Leveraging systematic, rule-based algorithm models to remove emotion and ensure execution excellence.</p>
                  </div>
                </div>
              </div>

              <div className="about-vision mt-12">
                <Link to="/register" className="btn-premium btn-primary">Join Our Community</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Courses Preview Section */}
      <section id="curriculum" className="courses-preview">
        <div className="section-header">
          <h2>Our <span className="text-primary">Curriculum</span></h2>
          <p>A structured pathway from beginner to funded trader.</p>
        </div>

        <div className="courses-grid-home">
          {[
            {
              title: "1. Basic to Pro Forex Foundation",
              duration: "4h 30m",
              lessons: 12,
              image: "https://images.unsplash.com/photo-1634704784915-aacf363b021f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              level: "Beginner"
            },
            {
              title: "2. Technical Analysis Mastery",
              duration: "6h 15m",
              lessons: 24,
              image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1000&auto=format&fit=crop",
              level: "Intermediate"
            },
            {
              title: "3. My Personal Scalping Strategy",
              duration: "3h 45m",
              lessons: 8,
              image: "https://images.unsplash.com/photo-1621944190310-e3cca1564bd7?q=80&w=1000&auto=format&fit=crop",
              level: "Advanced"
            },
            {
              title: "4. Risk Management & Psychology",
              duration: "2h 20m",
              lessons: 10,
              image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=1000&auto=format&fit=crop",
              level: "Essential"
            }
          ].map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="course-card-home glass"
            >
              <div className="course-thumb">
                <img src={course.image} alt={course.title} />
                <span className="level-badge">{course.level}</span>
              </div>
              <div className="course-details">
                <h3>{course.title}</h3>
                <div className="course-meta">
                  <span><TrendingUp size={16} /> {course.lessons} Lessons</span>
                  <span><PlayCircle size={16} /> {course.duration}</span>
                </div>
                <Link to="/register" className="btn-text">
                  Start Course <TrendingUp size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="section-header">
          <h2>Why Choose <span className="text-primary">Perfect FX Academy?</span></h2>
          <p>We provide more than just education; we provide a path to mastery.</p>
        </div>

        <div className="feature-grid">
          {[
            { icon: <PlayCircle />, title: "Recorded Sessions", desc: "Access all my live mentorship recordings anytime, anywhere. Learn at your own pace." },
            { icon: <TrendingUp />, title: "Proven Strategies", desc: "No fluff. Just the exact technical and fundamental analysis used by pros." },
            { icon: <ShieldCheck />, title: "Risk Management", desc: "The secret to 4 years of consistency is protecting your capital first." },
            { icon: <Users />, title: "Student Community", desc: "Join a circle of like-minded traders growing together every day." },
            { icon: <Award />, title: "Expert Guidance", desc: "Benefit from 4 years of real-market experience and direct mentorship." },
            { icon: <BookOpen />, title: "Curated Resources", desc: "Downloadable PDF guides, checklists, and trading journals." },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="feature-card glass"
            >
              <div className="feature-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials">
        <div className="section-header">
          <h2>What Our <span className="text-primary">Students Say</span></h2>
          <p>Join <span className="text-primary font-semibold">500+ successful traders</span> who transformed their trading with Perfect FX Academy</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing">
        <div className="section-header">
          <h2>Select Your <span className="text-primary">Plan</span></h2>
          <p>Choose the path that fits your trading goals.</p>
        </div>

        <div className="pricing-grid">
          {/* Tier 1: Monthly */}
          <motion.div
            whileHover={{ y: -10 }}
            className="pricing-card glass"
          >
            <div className="plan-header">
              <h3>Monthly Access</h3>
              <div className="price">$49<span>/mo</span></div>
            </div>
            <ul className="plan-features">
              <li><Check size={18} className="text-primary" /> Full Course Access</li>
              <li><Check size={18} className="text-primary" /> Daily Market Breakdown</li>
              <li><Check size={18} className="text-primary" /> Community Access</li>
              <li><Check size={18} className="text-primary" /> Live Q&A Sessions</li>
              <li className="disabled"><X size={18} /> 1-on-1 Mentorship</li>
            </ul>
            <Link to="/register" className="btn-premium btn-outline w-full text-center block mt-6">Get Started</Link>
          </motion.div>

          {/* Tier 2: Yearly (Popular) */}
          <motion.div
            whileHover={{ y: -10 }}
            className="pricing-card glass popular"
          >
            <div className="popular-badge">Most Popular</div>
            <div className="plan-header">
              <h3>Yearly Access</h3>
              <div className="price">$497<span>/yr</span></div>
              <p className="text-sm text-green-400 mt-2">Save 15%</p>
            </div>
            <ul className="plan-features">
              <li><Check size={18} className="text-primary" /> All Monthly Features</li>
              <li><Check size={18} className="text-primary" /> Priority Support</li>
              <li><Check size={18} className="text-primary" /> Exclusive Webinars</li>
              <li><Check size={18} className="text-primary" /> Trade Signals</li>
              <li className="disabled"><X size={18} /> 1-on-1 Mentorship</li>
            </ul>
            <Link to="/register" className="btn-premium btn-primary w-full text-center block mt-6">Join Pro</Link>
          </motion.div>

          {/* Tier 3: Lifetime */}
          <motion.div
            whileHover={{ y: -10 }}
            className="pricing-card glass"
          >
            <div className="plan-header">
              <h3>Lifetime Elite</h3>
              <div className="price">$997<span>/life</span></div>
            </div>
            <ul className="plan-features">
              <li><Check size={18} className="text-primary" /> Lifetime Course Access</li>
              <li><Check size={18} className="text-primary" /> 1-on-1 Mentorship Call</li>
              <li><Check size={18} className="text-primary" /> Private Strategy Session</li>
              <li><Check size={18} className="text-primary" /> VIP Community Role</li>
              <li><Check size={18} className="text-primary" /> Direct WhatsApp Access</li>
            </ul>
            <Link to="/register" className="btn-premium btn-outline w-full text-center block mt-6">Go Elite</Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq">
        <div className="section-header">
          <h2>Frequently Asked <span className="text-primary">Questions</span></h2>
          <p>Everything you need to know about joining Perfect FX Academy.</p>
        </div>

        <div className="faq-grid">
          {[
            {
              q: "How can Perfect FX Academy help me become a consistent trader?",
              a: "We provide a complete operating system, not just strategy knowledge. With our systematic process for every market scenario, risk management protocols, and daily market guidance, you'll stop guessing and start executing with precision."
            },
            {
              q: "What’s included in the Perfect FX Academy membership?",
              a: "You get full access to our comprehensive video course (Basic to Pro), proper risk management frameworks, daily market breakdowns, my personal scalping strategy, and access to our exclusive community of funded traders."
            },
            {
              q: "Is Perfect FX Academy suitable for beginners?",
              a: "Absolutely. Our 'Basic to Pro Forex Foundation' module is designed specifically to take you from zero knowledge to a professional understanding of market structure and liquidity, regardless of your starting point."
            },
            {
              q: "How does Perfect FX Academy support funded traders?",
              a: "We focus heavily on capital preservation and psychology. Our advanced modules teach you how to manage large capital, handle drawdowns, and maintain the psychological edge needed to keep your funded accounts."
            },
            {
              q: "How does the community support my growth as a trader?",
              a: "You’ll connect with traders who share insights, outlooks, and trade breakdowns — keeping you accountable, improving your process, and sharpening your edge daily."
            }
          ].map((item, index) => (
            <FAQItem
              key={index}
              question={item.q}
              answer={item.a}
              isOpen={openIndex === index}
              toggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </section>

      <style jsx="true">{`
        .home-container {
          padding-top: 80px;
        }
        .hero {
          display: flex;
          align-items: center;
          gap: 60px;
          min-height: 80vh;
          background: rgba(5, 7, 10, 0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 60px 40px;
          margin: 20px 0;
        }
        .hero-content {
          flex: 1;
        }
        .hero-image {
          flex: 1;
          position: relative;
          height: 400px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .badge {
          display: inline-flex;
          align-items: center;
          padding: 8px 18px;
          background: rgba(212, 175, 55, 0.08);
          color: var(--primary);
          border-radius: 30px;
          border: 1px solid rgba(212, 175, 55, 0.2);
          margin-bottom: 24px;
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .prestige-badge-hero {
          background: rgba(212, 175, 55, 0.12);
          border: 1px solid var(--primary);
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
          padding: 10px 24px;
          font-size: 0.9rem;
        }
        .prestige-label {
          display: inline-block;
          font-size: 1.1rem;
          font-weight: 900;
          color: var(--primary);
          letter-spacing: 0.3em;
          padding-bottom: 8px;
          border-bottom: 2px solid var(--primary);
          margin-bottom: 24px;
          text-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
        }
        .text-gradient {
          background: var(--gradient-main);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          background-size: 200% auto;
          animation: shine 5s linear infinite;
        }
        @keyframes shine {
          to { background-position: 200% center; }
        }
        .hero-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%);
          filter: blur(80px);
          z-index: -1;
          animation: pulse-glow 10s infinite alternate;
        }
        .hero-decoration {
          position: absolute;
          border: 1px solid rgba(212, 175, 55, 0.2);
          z-index: -1;
        }
        .decor-circle {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          top: -20px;
          right: -20px;
        }
        .decor-line {
          width: 200px;
          height: 1px;
          bottom: 50px;
          left: -40px;
          transform: rotate(-35deg);
        }
        .hero h1 {
          font-size: 3.5rem;
          line-height: 1.1;
          margin-bottom: 24px;
        }
        .subtitle {
          font-size: 1.25rem;
          color: var(--text-muted);
          margin-bottom: 40px;
          max-width: 600px;
        }
        .hero-btns {
          display: flex;
          gap: 20px;
        }
        .stats-glass {
          padding: 30px;
          display: flex;
          gap: 30px;
          position: absolute;
          bottom: 20px;
          right: 20px;
        }
        .stat {
          display: flex;
          flex-direction: column;
        }
        .stat-num {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--primary);
        }
        .stat-label {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .stat-divider {
          width: 1px;
          background: var(--border-color);
        }
        .chart-preview {
          padding: 40px;
          width: 300px;
          height: 250px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .chart-bars {
          display: flex;
          align-items: flex-end;
          gap: 12px;
          height: 100%;
        }
        .bar {
          flex: 1;
          background: var(--gradient-main);
          border-radius: 4px;
          opacity: 0.6;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 80px;
          padding: 0 20px;
        }
        .section-header h2 {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          margin-bottom: 24px;
          line-height: 1.2;
        }
        .section-header p {
          color: var(--text-muted);
          font-size: 1.25rem;
          max-width: 700px;
          margin: 0 auto;
        }
        .features {
          padding: 140px 5% 120px;
          max-width: 1400px;
          margin: 0 auto;
        }
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          margin-top: 60px;
        }
        
        /* Pricing Styles */
        .pricing { padding: 80px 0; }
        .pricing-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 40px;
            margin-top: 50px;
            max-width: 1100px;
            margin-left: auto;
            margin-right: auto;
        }
        .pricing-card {
            padding: 40px;
            border-radius: 24px;
            display: flex;
            flex-direction: column;
            position: relative;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .testimonials {
          padding: 100px 5%;
          background: rgba(255, 255, 255, 0.02);
        }

        .testimonials-grid {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          padding: 20px;
        }

        .pricing-card.popular {
            background: linear-gradient(145deg, rgba(212, 175, 55, 0.1), rgba(0, 0, 0, 0.4));
            border: 1px solid var(--primary);
            transform: scale(1.05);
            z-index: 2;
        }
        .popular-badge {
            position: absolute;
            top: -12px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--primary);
            color: black;
            padding: 4px 16px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: bold;
            box-shadow: 0 4px 12px rgba(212, 175, 55, 0.4);

        }
        .plan-header { text-align: center; margin-bottom: 30px; }
        .plan-header h3 { color: var(--text-muted); font-size: 1.1rem; margin-bottom: 15px; }
        .price { font-size: 3rem; font-weight: 700; color: white; display: flex; align-items: baseline; justify-content: center; gap: 4px; }
        .price span { font-size: 1rem; color: var(--text-muted); font-weight: 400; }
        
        .plan-features { list-style: none; display: flex; flex-direction: column; gap: 15px; flex: 1; margin-bottom: 30px; }
        .plan-features li { display: flex; align-items: center; gap: 12px; color: #ccc; font-size: 0.95rem; }
        .plan-features li.disabled { color: #555; text-decoration: line-through; opacity: 0.6; }

        .faq { padding: 80px 0; }

        /* About Section Styles */
        .about-section {
          padding: 120px 0;
          position: relative;
          overflow: hidden;
          background: linear-gradient(to bottom, transparent, rgba(212, 175, 55, 0.05), transparent);
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 80px;
          align-items: center;
        }
        .about-image-container {
          position: relative;
          perspective: 1000px;
        }
        .about-image-blob {
          position: absolute;
          width: 140%;
          height: 140%;
          top: -20%;
          left: -20%;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, transparent 70%);
          filter: blur(60px);
          z-index: 0;
          animation: pulse-glow 8s infinite alternate;
        }
        @keyframes pulse-glow {
          from { opacity: 0.5; transform: scale(1); }
          to { opacity: 1; transform: scale(1.1); }
        }
        .about-image-card {
          background: rgba(10, 10, 15, 0.75);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border: 1px solid rgba(212, 175, 55, 0.25);
          padding: 70px 45px;
          border-radius: 40px;
          position: relative;
          z-index: 2;
          text-align: center;
          box-shadow: 0 40px 100px rgba(0, 0, 0, 0.6);
          transform: rotateX(5deg) rotateY(-5deg);
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .about-image-card:hover {
          transform: rotateX(0deg) rotateY(0deg) translateY(-10px);
        }

        .floating-prestige-badge {
          position: absolute;
          top: -20px;
          right: -20px;
          background: linear-gradient(135deg, var(--primary), #b8860b);
          color: black;
          padding: 10px 20px;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 10px 25px rgba(212, 175, 55, 0.4);
          z-index: 10;
          letter-spacing: 0.05em;
        }

        .about-decoration {
          position: absolute;
          border: 1px solid rgba(212, 175, 55, 0.1);
          border-radius: 20px;
          z-index: 1;
          pointer-events: none;
        }
        .decor-1 {
          width: 120px;
          height: 120px;
          top: -40px;
          left: -40px;
          transform: rotate(15deg);
        }
        .decor-2 {
          width: 80px;
          height: 80px;
          bottom: -20px;
          right: -20px;
          transform: rotate(-15deg);
        }

        .about-icon-main {
          width: 80px;
          height: 80px;
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 32px;
          box-shadow: 0 0 30px rgba(212, 175, 55, 0.1);
        }
        .about-image-card h3 {
          font-size: 1.85rem;
          color: white;
          margin-bottom: 20px;
          font-weight: 800;
          letter-spacing: -0.01em;
        }
        .about-image-card p {
          color: #a0aec0;
          font-size: 1.15rem;
          line-height: 1.7;
        }
        .about-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          padding-top: 35px;
          margin-top: 35px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .about-stat-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .stat-value {
          font-size: 1.75rem;
          font-weight: 900;
          color: var(--primary);
          line-height: 1;
        }
        .stat-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-weight: 600;
        }
        .about-content {
          margin-left: 20px;
        }
        .about-content h2 {
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          line-height: 1.1;
          margin-bottom: 32px;
          font-weight: 900;
          letter-spacing: -0.02em;
        }
        .about-main-text {
          font-size: 1.25rem;
          color: #a0aec0;
          line-height: 1.8;
          margin-bottom: 54px;
        }
        .about-pillars {
          display: flex;
          flex-direction: column;
          gap: 36px;
        }
        .pillar-item {
          display: flex;
          gap: 28px;
          align-items: flex-start;
          transition: transform 0.3s ease;
        }
        .pillar-item:hover {
          transform: translateX(10px);
        }
        .pillar-icon {
          width: 60px;
          height: 60px;
          background: rgba(212, 175, 55, 0.08);
          border: 1px solid rgba(212, 175, 55, 0.15);
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          flex-shrink: 0;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
        .pillar-item h4 {
          font-size: 1.35rem;
          color: white;
          margin-bottom: 10px;
          font-weight: 700;
        }
        .pillar-item p {
          color: #8a8a8e;
          font-size: 1.05rem;
          line-height: 1.6;
        }

        @media (max-width: 968px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 80px;
          }
          .about-content {
            margin-left: 0;
            text-align: center;
          }
          .about-content h2 {
            font-size: 2.5rem;
          }
          .pillar-item {
            text-align: left;
            padding: 0 10px;
          }
          .about-section {
            padding: 100px 24px;
          }
          .about-image-card {
            transform: none !important;
          }
          .floating-prestige-badge {
            top: -15px;
            right: 0;
            font-size: 0.65rem;
          }
        }

        .feature-card {
          padding: 48px 32px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .feature-card:hover {
          border-color: var(--primary);
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }
        .feature-icon {
          color: var(--primary);
          margin-bottom: 32px;
          background: rgba(212, 175, 55, 0.1);
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
        }
        .feature-icon svg {
          width: 32px;
          height: 32px;
        }
        .feature-card h3 {
          margin-bottom: 20px;
          font-size: 1.5rem;
          color: white;
        }
        .feature-card p {
          color: var(--text-muted);
          line-height: 1.6;
          font-size: 1rem;
        }

        .comparison-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-top: 40px;
        }
        .comparison-card {
          padding: 40px;
          position: relative;
          overflow: hidden;
        }
        .comparison-card h3 {
          font-size: 1.5rem;
          margin-bottom: 20px;
          text-align: center;
        }
        .comparison-card.success {
          border: 1px solid var(--primary);
          background: linear-gradient(180deg, rgba(212, 175, 55, 0.05) 0%, rgba(5, 7, 10, 0.8) 100%);
        }
        .comparison-card.failed {
          border: 1px solid rgba(255, 255, 255, 0.1);
          opacity: 0.8;
        }
        .fail-header, .success-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 30px;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.9rem;
          letter-spacing: 0.05em;
        }
        .fail-header { color: #ef4444; }
        .success-header { color: var(--primary); }
        
        .comparison-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .comparison-list li {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }
        .text-red-500 { color: #ef4444; flex-shrink: 0; margin-top: 4px; }
        .text-primary { color: var(--primary); flex-shrink: 0; margin-top: 4px; }
        
        .comparison-list strong {
          display: block;
          color: white;
          margin-bottom: 4px;
          font-size: 1.1rem;
        }
        .comparison-list p {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.4;
        }


        @media (max-width: 1280px) {
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 968px) {
          .hero {
            flex-direction: column;
            text-align: center;
            padding: 40px 20px;
          }
          .hero h1 {
            font-size: 2.5rem;
          }
          .hero-btns {
            justify-content: center;
            flex-wrap: wrap;
          }
          .hero-image {
            display: none;
          }
          .subtitle {
            margin-left: auto;
            margin-right: auto;
          }
          .comparison-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .testimonials-grid {
            grid-template-columns: 1fr;
            padding: 0 20px;
          }

          .pricing-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .features {
            padding: 100px 24px;
          }
          .feature-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        @media (max-width: 640px) {
          .hero h1 {
            font-size: 2rem;
          }
          .subtitle {
            font-size: 1rem;
          }
          .hero-btns {
            flex-direction: column;
            width: 100%;
          }
          .hero-btns .btn-premium {
            width: 100%;
            justify-content: center;
          }
          .section-header h2 {
            font-size: 2rem;
          }
          .section-header p {
            font-size: 1rem;
          }
          .courses-grid-home {
            grid-template-columns: 1fr;
            padding: 0 10px;
          }
          .difference-text {
            font-size: 1.2rem;
          }
          .faq-question {
            font-size: 1rem;
            padding: 16px;
          }
          .faq-content {
            padding: 0 16px 16px 16px;
          }
        }

        @media (max-width: 480px) {
          .home-container {
            padding-top: 70px;
          }
          .hero {
            padding: 30px 16px;
            min-height: auto;
          }
          .hero h1 {
            font-size: 1.75rem;
            line-height: 1.2;
          }
          .subtitle {
            font-size: 0.95rem;
          }
          .badge {
            font-size: 0.8rem;
            padding: 4px 12px;
          }
          .section-header h2 {
            font-size: 1.75rem;
          }
          .comparison-card {
            padding: 24px;
          }
          .comparison-list strong {
            font-size: 1rem;
          }
          .comparison-list p {
            font-size: 0.875rem;
          }
          .pricing-card {
            padding: 30px 20px;
          }
          .price {
            font-size: 2.5rem;
          }
          .feature-card {
            padding: 30px 20px;
          }
          .feature-card h3 {
            font-size: 1.2rem;
          }
          .difference-text {
            font-size: 1.1rem;
          }
          .pulse-btn {
            font-size: 1rem;
            padding: 14px 30px;
          }
        }


        .faq {
          padding-bottom: 20px;
        }
        .faq-grid {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .faq-item {
          overflow: hidden;
          transition: border-color 0.3s ease;
        }
        .faq-item:hover {
          border-color: var(--primary-glow);
        }
        .faq-question {
          padding: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          width: 100%;
          text-align: left;
          background: transparent;
          border: none;
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
        }
        .faq-answer {
          color: var(--text-muted);
          line-height: 1.6;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .faq-content {
           padding: 0 24px 24px 24px;
        }

        .difference-cta {
          text-align: center;
          margin-top: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
        }
        .difference-text {
          font-size: 1.5rem;
          line-height: 1.5;
          max-width: 800px;
          color: white;
        }
        .pulse-btn {
          animation: pulse-gold 2s infinite;
          font-size: 1.1rem;
          padding: 16px 40px;
        }
        .courses-preview {
          padding: 80px 0;
        }
        .courses-grid-home {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          padding: 0 20px;
        }
        .course-card-home {
          overflow: hidden;
          transition: transform 0.3s ease;
        }
        .course-card-home:hover {
          transform: translateY(-5px);
          border-color: var(--primary);
        }
        .course-thumb {
          height: 180px;
          position: relative;
        }
        .course-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .level-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(4px);
          color: white;
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          border: 1px solid rgba(255,255,255,0.2);
        }
        .course-details {
          padding: 24px;
        }
        .course-details h3 {
          font-size: 1.1rem;
          margin-bottom: 12px;
          line-height: 1.4;
          height: 3rem;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .course-meta {
          display: flex;
          gap: 16px;
          color: var(--text-muted);
          font-size: 0.85rem;
          margin-bottom: 20px;
        }
        .course-meta span {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .btn-text {
          color: var(--primary);
          font-weight: 600;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: gap 0.3s ease;
        }
        .btn-text:hover {
          gap: 12px;
        }

        @keyframes pulse-gold {
          0% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); }
          70% { box-shadow: 0 0 0 15px rgba(212, 175, 55, 0); }
          100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); }
        }
      `}</style>
    </div >
  );
};

const FAQItem = ({ question, answer, isOpen, toggle }) => {
  return (
    <div className={`faq-item glass ${isOpen ? 'open' : ''}`} style={{ borderColor: isOpen ? 'var(--primary)' : '' }}>
      <button className="faq-question" onClick={toggle}>
        <span>{question}</span>
        {isOpen ? <Minus size={20} color="#d4af37" /> : <Plus size={20} color="#d4af37" />}
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        className="faq-answer"
      >
        <div className="faq-content">
          {answer}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
