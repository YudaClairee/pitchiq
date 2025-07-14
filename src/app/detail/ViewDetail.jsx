'use client'

import dynamic from 'next/dynamic'
import React from 'react'
import Link from 'next/link';
import ReactMarkdown from 'react-markdown'

// const PDFViewer = dynamic(() => import('./PDFViewer'), { ssr: false });

const ViewDetail = ({deck}) => {
  return (
    <div className="p-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Deck Analysis
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Overall Score:</span>
            <span className="text-2xl font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg">
              {deck.analysis.overallScore}/10
            </span>
          </div>
        </div>
        <Link
          href="/dashboard"
          className="text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors duration-300 font-semibold"
        >
          Back to Dashboard
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 bg-white min-h-screen">
        <div className="col-span-1 bg-gray-100 rounded-lg p-6">
          {/* <PDFViewer fileUrl={deck.filePath} /> */}
          {/* <iframe src={deck.filePath} className='w-full h-full'/> */}
        </div>
        <div className="bg-gray-100 rounded-lg p-6 col-span-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Analysis Summary
          </h2>
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h1: (props) => (
                  <h1
                    className="text-2xl font-bold text-gray-800 mt-6 mb-4 border-b pb-2"
                    {...props}
                  />
                ),
                h2: (props) => (
                  <h2
                    className="text-xl font-semibold text-gray-800 mt-5 mb-3"
                    {...props}
                  />
                ),
                h3: (props) => (
                  <h3
                    className="text-lg font-medium text-gray-800 mt-4 mb-2"
                    {...props}
                  />
                ),
                p: (props) => (
                  <p
                    className="text-gray-700 mb-4 leading-relaxed"
                    {...props}
                  />
                ),
                ul: (props) => (
                  <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />
                ),
                ol: (props) => (
                  <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />
                ),
                li: (props) => <li className="text-gray-700" {...props} />,
                strong: (props) => (
                  <strong className="font-semibold text-gray-800" {...props} />
                ),
              }}
            >
              {deck.analysis.response.summary}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewDetail