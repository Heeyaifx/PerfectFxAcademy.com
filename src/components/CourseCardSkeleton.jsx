import React from 'react';
import Skeleton from './Skeleton';

export default function CourseCardSkeleton() {
    return (
        <div className="course-card-skeleton glass">
            <div className="skeleton-thumbnail">
                <Skeleton width="100%" height="200px" borderRadius="0" />
            </div>

            <div className="skeleton-content">
                <Skeleton width="80%" height="24px" className="mb-16" />

                <div className="skeleton-meta">
                    <Skeleton width="80px" height="16px" />
                    <Skeleton width="100px" height="16px" />
                </div>

                <div className="skeleton-progress">
                    <Skeleton width="100%" height="6px" className="mb-8" />
                    <Skeleton width="100px" height="14px" />
                </div>

                <Skeleton width="100%" height="44px" borderRadius="30px" className="mt-20" />
            </div>

            <style jsx="true">{`
        .course-card-skeleton {
          overflow: hidden;
          border-radius: 16px;
        }
        
        .skeleton-thumbnail {
          height: 200px;
          background: rgba(255, 255, 255, 0.03);
        }
        
        .skeleton-content {
          padding: 24px;
        }
        
        .skeleton-meta {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .skeleton-progress {
          margin-bottom: 20px;
        }
        
        .mb-8 { margin-bottom: 8px; }
        .mb-16 { margin-bottom: 16px; }
        .mb-20 { margin-bottom: 20px; }
        .mt-20 { margin-top: 20px; }
      `}</style>
        </div>
    );
}
