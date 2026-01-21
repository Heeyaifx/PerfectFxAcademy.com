import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Clock, BookOpen, CheckCircle, Search, Filter, Lock, Mail } from 'lucide-react';
import CourseCardSkeleton from '../components/CourseCardSkeleton';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const courses = [
  {
    id: 1,
    title: "1. Basic to Pro Forex Foundation",
    duration: "4h 30m",
    lessons: 12,
    thumbnail: "https://images.unsplash.com/photo-1611974717482-45a04ea88f34?q=80&w=1000&auto=format&fit=crop",
    progress: 100,
  },
  {
    id: 2,
    title: "2. Technical Analysis Mastery",
    duration: "6h 15m",
    lessons: 24,
    thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1000&auto=format&fit=crop",
    progress: 45,
  },
  {
    id: 3,
    title: "3. My Personal Scalping Strategy",
    duration: "3h 45m",
    lessons: 8,
    thumbnail: "https://images.unsplash.com/photo-1621944190310-e3cca1564bd7?q=80&w=1000&auto=format&fit=crop",
    progress: 0,
  },
  {
    id: 4,
    title: "4. Risk Management & Psychology",
    duration: "2h 20m",
    lessons: 10,
    thumbnail: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=1000&auto=format&fit=crop",
    progress: 10,
  }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false); // Default to no access
  const [userName, setUserName] = useState('');
  const [greeting, setGreeting] = useState('Welcome back');

  // Check user access level and get name
  useEffect(() => {
    const checkAccess = async () => {
      if (!currentUser) return;

      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.accessLevel === 'premium' || userData.accessLevel === 'admin') {
            setHasAccess(true);
          } else {
            setHasAccess(false);
          }
          if (userData.displayName) {
            setUserName(userData.displayName);
          }
        } else {
          // Should create doc if it doesn't exist (e.g. old users), but for now deny access
          setHasAccess(false);
        }
      } catch (error) {
        console.error("Error checking access:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAccess();
  }, [currentUser]);

  // Set time of day greeting
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  if (isLoading) {
    return (
      <div className="dashboard-container">
        <div className="course-grid">
          {[...Array(4)].map((_, index) => <CourseCardSkeleton key={index} />)}
        </div>
        <style jsx="true">{`
                .dashboard-container { padding: 120px 5% 60px; max-width: 1400px; margin: 0 auto; }
                .course-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 30px; }
             `}</style>
      </div>
    );
  }

  if (!currentUser?.emailVerified) {
    return (
      <div className="dashboard-container">
        <div className="locked-access glass">
          <Mail size={64} className="text-primary mb-6" />
          <h1 className="text-3xl font-bold mb-4">Verify Your Email</h1>
          <p className="text-muted mb-8 max-w-lg mx-auto">
            We've sent a verification link to <strong>{currentUser?.email}</strong>.<br />
            Please check your inbox (and spam folder) and click the link to verify your account.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="btn-premium btn-primary" onClick={() => window.location.reload()}>I've Verified My Email</button>
          </div>
        </div>
        <style jsx="true">{`
            .dashboard-container {
                min-height: 80vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }
            .locked-access {
                text-align: center;
                padding: 60px 40px;
                max-width: 600px;
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        `}</style>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="dashboard-container">
        <div className="locked-wrapper">
          <div className="locked-access glass-premium">
            <div className="icon-glow">
              <Lock size={48} className="text-gold" />
            </div>
            <h1 className="premium-title">Unlock Premium Access</h1>
            <p className="text-muted mb-8 max-w-md mx-auto">
              You are currently on the <span className="text-white font-semibold">Free Plan</span>.
              Upgrade to access the full Perfect FX Academy curriculum and start your journey to profitability.
            </p>

            <div className="benefits-list">
              <div className="benefit-item">
                <CheckCircle size={20} className="text-gold" />
                <span>Complete Basic to Pro Forex Course</span>
              </div>
              <div className="benefit-item">
                <CheckCircle size={20} className="text-gold" />
                <span>My Personal Scalping Strategy</span>
              </div>
              <div className="benefit-item">
                <CheckCircle size={20} className="text-gold" />
                <span>Weekly Live Market Analysis</span>
              </div>
              <div className="benefit-item">
                <CheckCircle size={20} className="text-gold" />
                <span>Private Student Community Access</span>
              </div>
            </div>

            <div className="flex gap-4 justify-center w-full mt-8">
              <button className="btn-premium btn-gold" onClick={() => navigate('/pricing')}>
                Get Instant Access
              </button>
            </div>
            <p className="text-xs text-muted mt-4">Already paid? <a href="#" onClick={(e) => { e.preventDefault(); window.open('https://t.me/your_telegram', '_blank') }} className="text-gold hover:underline">Contact Support</a> for activation.</p>
          </div>
        </div>
        <style jsx="true">{`
            .dashboard-container {
                min-height: 85vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 120px 20px 60px;
                position: relative;
            }
            .locked-wrapper {
                position: relative;
                width: 100%;
                max-width: 550px;
                animation: floatUp 0.8s ease-out;
            }
            @keyframes floatUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .locked-wrapper::before {
                content: '';
                position: absolute;
                inset: -2px;
                background: linear-gradient(45deg, #FFD700, transparent, #FFD700);
                z-index: -1;
                filter: blur(20px);
                opacity: 0.2;
                border-radius: 24px;
            }
            .glass-premium {
                background: rgba(10, 10, 12, 0.85); /* Slightly more opaque to hide background */
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 215, 0, 0.15);
                border-radius: 24px;
                padding: 50px 40px;
                text-align: center;
                display: flex;
                flex-direction: column;
                align-items: center;
                box-shadow: 0 20px 50px rgba(0,0,0,0.5);
            }
            /* ... rest of styles (icon-glow, text-gold, etc) remain valid content ... */
            .icon-glow {
                background: rgba(255, 215, 0, 0.1);
                width: 80px;
                height: 80px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 24px;
                border: 1px solid rgba(255, 215, 0, 0.3);
                box-shadow: 0 0 30px rgba(255, 215, 0, 0.1);
            }
            .text-gold { color: #FFD700; }
            .premium-title {
                font-size: 2rem;
                font-weight: 800;
                margin-bottom: 12px;
                background: linear-gradient(to right, #fff, #FFD700);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .benefits-list {
                display: flex;
                flex-direction: column;
                gap: 16px;
                text-align: left;
                width: 100%;
                background: rgba(255,255,255,0.03);
                padding: 24px;
                border-radius: 16px;
                margin-top: 10px;
            }
            .benefit-item {
                display: flex;
                align-items: center;
                gap: 12px;
                color: #e2e8f0;
                font-size: 0.95rem;
            }
            .btn-gold {
                background: linear-gradient(135deg, #FFD700, #B8860B);
                color: black;
                border-radius: 100px;
                margin-top: 20px;
                font-weight: 700;
                padding: 12px 48px;
                border: 1px solid #FFD700;
                transition: transform 0.2s;
                font-size: 1rem;
            }
            .btn-gold:hover {
                transform: scale(1.02);
                box-shadow: 0 10px 30px rgba(255, 215, 0, 0.2);
            }
        `}</style>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h1>{greeting}, <span className="text-primary">{userName || 'Trader'}</span></h1>
          <p>Welcome back to your learning path. You have 3 courses in progress.</p>
        </div>
        <div className="search-bar glass">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search your courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="course-grid">
        {isLoading ? (
          // Show skeleton cards while loading
          [...Array(4)].map((_, index) => (
            <CourseCardSkeleton key={index} />
          ))
        ) : (
          // Show actual course cards with fade-in animation
          courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="course-card glass"
            >
              <div className="thumbnail">
                <img src={course.thumbnail} alt={course.title} />
                <div className="play-overlay">
                  <Play fill="white" size={40} />
                </div>
                {course.progress === 100 && (
                  <div className="completed-badge">
                    <CheckCircle size={14} /> Completed
                  </div>
                )}
              </div>

              <div className="course-info">
                <h3>{course.title}</h3>
                <div className="course-meta">
                  <span><Clock size={14} /> {course.duration}</span>
                  <span><BookOpen size={14} /> {course.lessons} Lessons</span>
                </div>

                <div className="progress-container">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${course.progress}%` }}></div>
                  </div>
                  <span className="progress-text">{course.progress}% complete</span>
                </div>

                <button
                  onClick={() => navigate(`/course/${course.id}`)}
                  className="btn-premium btn-primary w-full mt-4"
                >
                  {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <style jsx="true">{`
        .dashboard-container {
          padding: 120px 5% 60px;
          max-width: 1400px;
          margin: 0 auto;
        }
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 50px;
          gap: 30px;
        }
        .dashboard-header h1 {
          font-size: 2.5rem;
          margin-bottom: 10px;
        }
        .dashboard-header p {
          color: var(--text-muted);
        }
        .search-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
          width: 100%;
          max-width: 400px;
        }
        .search-bar input {
          background: transparent;
          border: none;
          color: white;
          outline: none;
          width: 100%;
          font-size: 1rem;
        }
        .course-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 30px;
        }
        .course-card {
          overflow: hidden;
          transition: border-color 0.3s ease;
        }
        .course-card:hover {
          border-color: var(--primary-glow);
        }
        .thumbnail {
          position: relative;
          height: 200px;
        }
        .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .play-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .course-card:hover .play-overlay {
          opacity: 1;
        }
        .completed-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: #4ade80;
          color: #064e3b;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .course-info {
          padding: 24px;
        }
        .course-info h3 {
          margin-bottom: 16px;
          font-size: 1.25rem;
          height: 3rem;
          overflow: hidden;
        }
        .course-meta {
          display: flex;
          gap: 20px;
          color: var(--text-muted);
          font-size: 0.875rem;
          margin-bottom: 20px;
        }
        .course-meta span {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .progress-container {
          margin-bottom: 20px;
        }
        .progress-bar {
          height: 6px;
          background: rgba(255,255,255,0.1);
          border-radius: 3px;
          margin-bottom: 8px;
        }
        .progress-fill {
          height: 100%;
          background: var(--gradient-main);
          border-radius: 3px;
        }
        .progress-text {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .mt-4 { margin-top: 1rem; }
        .w-full { width: 100%; justify-content: center; }

        @media (max-width: 768px) {
          .dashboard-container {
            padding: 100px 4% 40px;
          }
          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }
          .dashboard-header h1 {
            font-size: 2rem;
          }
          .search-bar {
            max-width: 100%;
          }
          .course-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        @media (max-width: 480px) {
          .dashboard-container {
            padding: 90px 3% 30px;
          }
          .dashboard-header h1 {
            font-size: 1.75rem;
          }
          .dashboard-header p {
            font-size: 0.9rem;
          }
          .search-bar {
            padding: 10px 16px;
          }
          .course-info {
            padding: 20px;
          }
          .course-info h3 {
            font-size: 1.1rem;
            height: auto;
          }
          .thumbnail {
            height: 160px;
          }
        }

      `}</style>
    </div>
  );
}
