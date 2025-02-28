import React from 'react'

const BlogsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-4 lg:px-12">
        {Array(3)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="flex flex-col w-full animate-pulse">
            <div className="w-full h-48 bg-gray-200 rounded-lg"></div>
            <div className="flex flex-col pt-2 space-y-3">
              <div className="w-3/4 h-6 bg-gray-200 rounded"></div>
              <div className="w-full h-4 bg-gray-200 rounded"></div>
              <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex gap-2 items-center justify-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="w-16 h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="w-20 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default BlogsSkeleton;