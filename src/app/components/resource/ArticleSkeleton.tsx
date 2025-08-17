// components/resource/ArticleSkeleton.tsx
import React from "react";

const ArticleSkeleton: React.FC = () => {
  return (
    <div className="bg-white shadow-lg border rounded-lg overflow-hidden w-full">
      <div className="lg:flex h-full">
        {/* Image Container Skeleton */}
        <div className="lg:w-1/2 h-48 lg:h-auto bg-gray-200 animate-pulse"></div>

        {/* Content Container Skeleton */}
        <div className="p-6 lg:w-1/2 flex flex-col justify-between">
          <div>
            {/* Title Skeleton */}
            <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded mb-4 w-3/4 animate-pulse"></div>

            {/* Description Skeleton */}
            <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded mb-4 w-2/3 animate-pulse"></div>

            {/* Meta Info Skeleton */}
            <div className="flex justify-between mb-4">
              <div className="h-3 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
            </div>
          </div>

          {/* Button Skeleton */}
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ArticleSkeleton;