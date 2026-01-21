import React from 'react';
import { Star, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TestimonialCard({ testimonial }) {
    const { name, role, location, rating, review, result, image } = testimonial;

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="testimonial-card glass"
        >
            <div className="testimonial-header">
                <div className="student-avatar">
                    {image ? (
                        <img src={image} alt={name} />
                    ) : (
                        <div className="avatar-placeholder">{name.charAt(0)}</div>
                    )}
                </div>
                <div className="student-info">
                    <h4>{name}</h4>
                    <p className="student-meta">{role} • {location}</p>
                </div>
            </div>

            <div className="rating">
                {[...Array(5)].map((_, index) => (
                    <Star
                        key={index}
                        size={16}
                        fill={index < rating ? '#d4af37' : 'none'}
                        stroke={index < rating ? '#d4af37' : '#666'}
                    />
                ))}
                <span className="rating-number">({rating}.0)</span>
            </div>

            <p className="review-text">"{review}"</p>

            {result && (
                <div className="result-badge">
                    <TrendingUp size={16} />
                    <span>{result}</span>
                </div>
            )}

            <style jsx="true">{`
        .testimonial-card {
          padding: 32px;
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .testimonial-card:hover {
          border-color: var(--primary-glow);
        }

        .testimonial-header {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .student-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
        }

        .student-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .avatar-placeholder {
          width: 100%;
          height: 100%;
          background: var(--gradient-main);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
          color: #000;
        }

        .student-info h4 {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 700;
          color: white;
        }

        .student-meta {
          margin: 4px 0 0 0;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .rating {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .rating-number {
          margin-left: 8px;
          font-size: 0.9rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .review-text {
          font-size: 1rem;
          line-height: 1.7;
          color: #e0e0e0;
          font-style: italic;
          flex: 1;
          margin: 0;
        }

        .result-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 8px;
          color: var(--primary);
          font-size: 0.9rem;
          font-weight: 600;
          align-self: flex-start;
        }

        @media (max-width: 768px) {
          .testimonial-card {
            padding: 24px;
          }

          .student-avatar {
            width: 48px;
            height: 48px;
          }

          .student-info h4 {
            font-size: 1rem;
          }

          .review-text {
            font-size: 0.95rem;
          }
        }
      `}</style>
        </motion.div>
    );
}
