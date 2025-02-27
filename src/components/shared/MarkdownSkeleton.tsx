import React from 'react'

export const MarkdownSkeleton = () => {
  return (
    <div role="status" className="space-y-2.5 animate-pulse">
      <div className="flex items-center w-full">
        <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-600 w-32"></div>
        <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-500 w-24"></div>
        <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-500 w-full"></div>
      </div>
      <div className="flex items-center w-full">
        <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-600 w-full"></div>
        <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-500 w-full"></div>
        <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-500 w-24"></div>
      </div>
      <div className="flex items-center w-full">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-500 w-full"></div>
        <div className="h-2.5 ms-2 bg-gray-100 rounded-full dark:bg-gray-600 w-80"></div>
        <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-500 w-full"></div>
      </div>
      <div className="flex items-center w-full">
        <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-600 w-full"></div>
        <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-500 w-full"></div>
        <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-500 w-24"></div>
      </div>
      <div className="flex items-center w-full">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-500 w-32"></div>
        <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-500 w-24"></div>
        <div className="h-2.5 ms-2 bg-gray-100 rounded-full dark:bg-gray-600 w-full"></div>
      </div>
      <div className="flex items-center w-full">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-500 w-full"></div>
        <div className="h-2.5 ms-2 bg-gray-100 rounded-full dark:bg-gray-600 w-80"></div>
        <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-500 w-full"></div>
      </div>
    </div>
  )
}
