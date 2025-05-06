'use client';

import TestBassNotes from '../../components/TestBassNotes';
import Link from 'next/link';

export default function TestPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-100">
      <div className="z-10 max-w-5xl w-full items-center justify-between">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Bass Clef Note Test</h1>
          <Link href="/" className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition-colors">
            Back to Home
          </Link>
        </div>
        
        <div className="flex flex-col items-center">
          <TestBassNotes />
        </div>
      </div>
    </main>
  );
}