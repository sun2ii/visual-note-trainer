'use client';

import { useState, useEffect } from 'react';
import MusicStaff from './MusicStaff';
import NoteButtons from './NoteButtons';

// Define note maps for different clefs
const NOTE_KEY_BANKS = {
  treble: {
      // Letters for treble clef lines (bottom to top): E, G, B, D, F
      // Letters for treble clef spaces (bottom to top): F, A, C, E
      C: ['c/4', 'c/5'],  // Middle C is c/4
      D: ['d/4', 'd/5'],
      E: ['e/4', 'e/5'],
      F: ['f/4', 'f/5'],
      G: ['g/4', 'g/5'],
      A: ['a/4', 'a/5'],
      B: ['b/4', 'b/5'],
  },
  bass: {
      // Letters for bass clef lines (bottom to top): G, B, D, F, A
      // Letters for bass clef spaces (bottom to top): A, C, E, G
      C: ['c/3', 'c/4'],  // Middle C is c/4, Bass C is c/3
      D: ['d/3', 'd/4'],
      E: ['e/3', 'e/4'],
      F: ['f/3', 'f/4'],
      G: ['g/2', 'g/3'],  // G is on the bottom line of bass staff
      A: ['a/2', 'a/3'],  // A is the first space from bottom
      B: ['b/2', 'b/3'],  // B is the second line from bottom
  }
};

const SingleClefTrainer = ({ clef = 'treble' }) => {
  // Game state
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [currentNoteLetter, setCurrentNoteLetter] = useState(null);
  const [currentNoteKey, setCurrentNoteKey] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [gameActive, setGameActive] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Set isClient to true when component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Generate a random note for the given clef
  const generateRandomNote = () => {
    const noteBank = NOTE_KEY_BANKS[clef];
    const letters = Object.keys(noteBank);
    const letter = letters[Math.floor(Math.random() * letters.length)];
    const keyList = noteBank[letter];
    const key = Array.isArray(keyList)
      ? keyList[Math.floor(Math.random() * keyList.length)]
      : keyList;
    
    return { letter, key };
  };

  // Start a new round
  const startNewRound = () => {
    const { letter, key } = generateRandomNote();
    setCurrentNoteLetter(letter);
    setCurrentNoteKey(key);
    setFeedback('');
    setGameActive(true);
  };

  // For bass clef, we need to map the note positions correctly
  const getCorrectAnswer = (noteLetter, selectedClef) => {
    // In treble clef, the note letter is the same as what's expected
    if (selectedClef === 'treble') {
      return noteLetter;
    }
    
    // In bass clef, we need to shift the note letter to account for VexFlow rendering issues
    // This mapping shifts note letters to get the correct answer for bass clef
    const bassClefMapping = {
      // What's displayed on the staff -> What note it actually is
      'C': 'E', // Shift up by 2 notes (C -> E)
      'D': 'F', // Shift up by 2 notes (D -> F)
      'E': 'G', // Shift up by 2 notes (E -> G)
      'F': 'A', // Shift up by 2 notes (F -> A)
      'G': 'B', // Shift up by 2 notes (G -> B)
      'A': 'C', // Shift up by 2 notes (A -> C)
      'B': 'D'  // Shift up by 2 notes (B -> D)
    };
    
    return bassClefMapping[noteLetter] || noteLetter;
  };

  // Handle note button clicks
  const handleNoteClick = (selectedNote) => {
    if (!gameActive) return;
    
    setAttempts(attempts + 1);
    
    // Get the correct answer for the current clef
    const correctAnswer = getCorrectAnswer(currentNoteLetter, clef);
    
    if (selectedNote === correctAnswer) {
      setScore(score + 1);
      setFeedback('✅');
      setTimeout(() => {
        startNewRound();
      }, 100);
    } else {
      setFeedback(`❌ ${correctAnswer}`);
      setTimeout(() => {
        startNewRound();
      }, 200);
    }
  };

  // Start the game only after client-side hydration is complete
  useEffect(() => {
    if (isClient) {
      startNewRound();
    }
  }, [isClient]);

  const clefTitle = clef === 'treble' ? 'Treble Clef' : 'Bass Clef';

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-slate-900">{clefTitle} Trainer</h2>
        <div className="text-right">
          <p className="text-lg font-medium">Score: {score}/{attempts} <span>{feedback}</span></p>
        </div>
      </div>
      
      <div className="mb-6">
        {isClient && currentNoteKey && (
          <MusicStaff 
            clef={clef} 
            currentNote={currentNoteKey} 
            width={300} 
            height={150} 
          />
        )}
      </div>
      
      {isClient && <NoteButtons onNoteClick={handleNoteClick} clef={clef} />}
      
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

export default SingleClefTrainer;