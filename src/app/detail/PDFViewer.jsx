'use client';

import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from 'react';

// Setup worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function PDFViewer({ fileUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setError(null);
  }

  function onDocumentLoadError(error) {
    console.error('PDF Load Error:', error);
    setError(error.message);
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-red-500">
        <p>Failed to load PDF: {error}</p>
        <p className="text-sm mt-2">URL: {fileUrl}</p>
      </div>
    );
  }

  return (
    <Document
      file={fileUrl}
      onLoadSuccess={onDocumentLoadSuccess}
      onLoadError={onDocumentLoadError}
    >
      {Array.from(new Array(numPages), (_, index) => (
        <Page key={index} pageNumber={index + 1} width={800} />
      ))}
    </Document>
  );
}
