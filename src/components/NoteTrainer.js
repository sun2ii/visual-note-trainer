'use client';

import { useState, useEffect } from 'react';
import MusicStaff from './MusicStaff';
import NoteButtons from './NoteButtons';

// Define note maps for different clefs
const TREBLE_NOTE_MAP = {
  'C': { keys: ['c/4'], duration: 'w' },
  'D': { keys: ['d/4'], duration: 'w' },
  'E': { keys: ['e/4'], duration: 'w' },
  'F': { keys: ['f/4'], duration: 'w' },
  'G': { keys: ['g/4'], duration: 'w' },
  'A': { keys: ['a/4'], duration: 'w' },
  'B': { keys: ['b/4'], duration: 'w' }
};

const BASS_NOTE_MAP = {
  'C': { keys: ['c/3'], duration: 'w' }, // Changed to c/3 to match MusicStaff component
  'D': { keys: ['d/3'], duration: 'w' }, // Changed to d/3 to match MusicStaff component
  'E': { keys: ['e/3'], duration: 'w' }, // Changed to e/3 to match MusicStaff component
  'F': { keys: ['f/3'], duration: 'w' }, // Changed to f/3 to match MusicStaff component
  'G': { keys: ['g/3'], duration: 'w' }, // Changed to g/3 to match MusicStaff component
  'A': { keys: ['a/3'], duration: 'w' }, // Changed to a/3 to match MusicStaff component
  'B': { keys: ['b/3'], duration: 'w' }  // Changed to b/3 to match MusicStaff component
};

const NoteTrainer = ({ clef = 'treble', title = 'Note Trainer' }) => {
  // Game state with client-side only initialization
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [currentNote, setCurrentNote] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [gameActive, setGameActive] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Set isClient to true when component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Generate a random note based on the current clef
  const generateRandomNote = () => {
    const notes = Object.keys(clef === 'treble' ? TREBLE_NOTE_MAP : BASS_NOTE_MAP);
    const randomIndex = Math.floor(Math.random() * notes.length);
    return notes[randomIndex];
  };

  // Start a new round
  const startNewRound = () => {
    const newNote = generateRandomNote();
    setCurrentNote(newNote);
    setFeedback('');
    setGameActive(true);
  };

  // Handle note button clicks
  const handleNoteClick = (selectedNote) => {
    if (!gameActive) return;
    
    setAttempts(attempts + 1);
    
    if (selectedNote === currentNote) {
      setScore(score + 1);
      setFeedback('✅');
      setTimeout(() => {
        startNewRound();
      }, 100);
    } else {
      setFeedback(`❌ ${currentNote}`);
      setTimeout(() => {
        startNewRound();
      }, 200);
    }
  };

  // Start the game only after client-side hydration is complete
  useEffect(() => {
    // Only run on client-side to prevent hydration mismatch
    startNewRound();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
        <div className="text-right">
          <p className="text-lg font-medium">Score: {score}/{attempts} <span>{feedback}</span></p>
        </div>
      </div>
      
      <div className="mb-6">
        {isClient && currentNote && <MusicStaff clef={clef} currentNote={currentNote} width={300} height={150} />}
      </div>
      
      {isClient && <NoteButtons onNoteClick={handleNoteClick} clef={clef} />}
      
      <button 
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        onClick={startNewRound}
        disabled={!isClient}
      >
        New Note
      </button>
    </div>
  );
};

export default NoteTrainer;