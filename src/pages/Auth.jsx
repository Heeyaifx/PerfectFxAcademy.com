import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { users } from '../data/users';

export default function Auth({ type }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginManual } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (type === 'login') {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        navigate('/dashboard');
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Create user document in Firestore with 'free' access level
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          displayName: fullName,
          createdAt: new Date(),
          accessLevel: "free" // Default to free
        });

        // Send verification email
        await sendEmailVerification(user);

        // Account created successfully
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
      let message = "Failed to authenticate";
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        message = "Invalid email or password.";
      } else if (err.code === 'auth/email-already-in-use') {
        message = "This email is already in use.";
      } else if (err.code === 'auth/weak-password') {
        message = "Password should be at least 6 characters.";
      } else {
        message = err.message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="auth-card glass"
      >
        <div className="auth-header">
          <h2>{type === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{type === 'login' ? 'Login to access your courses' : 'Join the Perfect FX Academy inner circle'}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">

          {error && <div className="error-msg">{error}</div>}

          {type !== 'login' && (
            <div className="input-group">
              <User className="input-icon" size={20} />
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="input-group">
            <Mail className="input-icon" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-premium btn-primary w-full" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : (
              <>
                {type === 'login' ? 'Sign In' : 'Create Account'}
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          {type === 'login' ? (
            <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
          ) : (
            <p>Already have an account? <Link to="/login">Sign In</Link></p>
          )}
        </div>
      </motion.div>

      <style jsx="true">{`
        .auth-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 20px 20px;
          background: radial-gradient(circle at center, #1a1c1e 0%, #05070a 100%);
        }
        .auth-card {
          width: 100%;
          max-width: 450px;
          padding: 50px;
        }
        .auth-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .auth-header h2 {
          font-size: 2rem;
          margin-bottom: 10px;
        }
        .auth-header p {
          color: var(--text-muted);
        }
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .input-group {
          position: relative;
        }
        .input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }
        input {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          padding: 16px 16px 16px 48px;
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.3s ease;
        }
        input:focus {
          border-color: var(--primary);
        }
        .error-msg {
          background: rgba(255, 0, 0, 0.1);
          color: #ff4d4d;
          padding: 12px;
          border-radius: 8px;
          font-size: 0.9rem;
          border: 1px solid rgba(255, 0, 0, 0.2);
        }
        .auth-footer {
          margin-top: 30px;
          text-align: center;
          color: var(--text-muted);
        }
        .auth-footer a {
          color: var(--primary);
          text-decoration: none;
          font-weight: 600;
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .w-full { width: 100%; justify-content: center; }
        
      `}</style>
    </div>
  );
}
