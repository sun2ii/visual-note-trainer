'use client';

import SingleClefTrainer from '../../components/SingleClefTrainer';
import Link from 'next/link';

export default function BassClefPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-100">
      <div className="z-10 max-w-5xl w-full items-center justify-between">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Bass Clef Trainer</h1>
          <Link href="/treble" className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition-colors">
            Switch to Treble Clef
          </Link>
        </div>
        
        <div className="flex flex-col items-center">
          <SingleClefTrainer clef="bass" />
        </div>
        
        <div className="mt-8 text-center">
          <Link href="/" className="text-blue-600 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}