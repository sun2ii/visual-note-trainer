'use client';

import { useState, useEffect } from 'react';
import MusicStaff from './MusicStaff';
import NoteButtons from './NoteButtons';

const NOTE_KEY_BANKS = {
  treble: {
    C: ['c/4', 'c/5'],
    D: ['d/4', 'd/5'],
    E: ['e/4', 'e/5'],
    F: ['f/4', 'f/5'],
    G: ['g/4', 'g/5'],
    A: ['a/4', 'a/5'],
    B: ['b/4', 'b/5']
  },
  bass: {
    C: ['c/3', 'c/4'],  // Middle C is c/4, Bass C is c/3
    D: ['d/3', 'd/4'],
    E: ['e/3', 'e/4'],
    F: ['f/3', 'f/4'],
    G: ['g/3', 'g/4'],  // Updated to match MusicStaff component
    A: ['a/3', 'a/4'],  // Updated to match MusicStaff component
    B: ['b/3', 'b/4'],  // Updated to match MusicStaff component
  }
};

const UnifiedNoteTrainer = () => {
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [currentNoteLetter, setCurrentNoteLetter] = useState(null);
  const [currentNoteKey, setCurrentNoteKey] = useState(null);
  const [currentClef, setCurrentClef] = useState('treble');
  const [feedback, setFeedback] = useState('');
  const [gameActive, setGameActive] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const generateRandomNoteAndClef = () => {
    const clef = Math.random() > 0.5 ? 'treble' : 'bass';
    const noteBank = NOTE_KEY_BANKS[clef];
    const letters = Object.keys(noteBank);
    const letter = letters[Math.floor(Math.random() * letters.length)];
    const keys = noteBank[letter];
    const key = keys[Math.floor(Math.random() * keys.length)];

    return { clef, letter, key };
  };

  const startNewRound = () => {
    const { clef, letter, key } = generateRandomNoteAndClef();
    setCurrentClef(clef);
    setCurrentNoteLetter(letter);
    setCurrentNoteKey(key);
    setFeedback('');
    setGameActive(true);
  };

  const handleNoteClick = (selectedNote) => {
    if (!gameActive) return;

    setAttempts((prev) => prev + 1);
    
    console.log(`Button clicked: ${selectedNote}, Current note: ${currentNoteLetter}, Clef: ${currentClef}`);

    if (selectedNote === currentNoteLetter) {
      setScore((prev) => prev + 1);
      setFeedback('✅');
      setTimeout(() => {
        startNewRound();
      }, 100);
    } else {
      setFeedback(`❌ ${currentNoteLetter}`);
      setTimeout(() => {
        startNewRound();
      }, 200);
    }
  };

  useEffect(() => {
    if (isClient) {
      startNewRound();
    }
  }, [isClient]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-slate-900">Note Trainer</h2>
        <div className="text-right">
          <p className="text-lg font-medium">Score: {score}/{attempts} <span>{feedback}</span></p>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="bg-gray-100 py-2 px-4 rounded mb-4">
          <span className="font-medium">Current Clef: </span>
          <span className="font-bold">{currentClef === 'treble' ? 'Treble' : 'Bass'}</span>
        </div>
      </div>

      <div className="mb-6">
        {isClient && currentNoteKey && (
          <MusicStaff 
            clef={currentClef} 
            currentNote={currentNoteKey} 
            width={300} 
            height={150} 
          />
        )}
      </div>

      {isClient && <NoteButtons onNoteClick={handleNoteClick} clef={currentClef} />}

      <button 
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors w-full"
        onClick={startNewRound}
        disabled={!isClient}
      >
        New Note
      </button>
    </div>
  );
};

export default UnifiedNoteTrainer;