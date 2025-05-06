'use client';

import { useState, useEffect, useCallback } from 'react';

// Note order for each clef
const CLEF_NOTE_ORDERS = {
  treble: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
  bass: ['C', 'D', 'E', 'F', 'G', 'A', 'B'] 
};

const NoteButtons = ({ onNoteClick, clef = 'treble' }) => {
  const [activeNote, setActiveNote] = useState(null);

  const handleClick = useCallback((note) => {
    setActiveNote(note);
    if (onNoteClick) {
      onNoteClick(note);
    }
  }, [onNoteClick]);

  // Get the appropriate note order for the current clef
  const noteOrder = CLEF_NOTE_ORDERS[clef];

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleKeyPress = (event) => {
      const key = event.key;
      const index = parseInt(key, 10) - 1; // 1 = index 0
      if (index >= 0 && index < noteOrder.length) {
        handleClick(noteOrder[index]);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [handleClick, noteOrder]);

  // Map of note positions for reference (not displaying this to user)
  const clefPositions = {
    treble: {
      'C': 'C4 (Middle C)',
      'D': 'D4',
      'E': 'E4',
      'F': 'F4',
      'G': 'G4',
      'A': 'A4',
      'B': 'B4'
    },
    bass: {
      'C': 'C3', 
      'D': 'D3',
      'E': 'E3',
      'F': 'F3',
      'G': 'G3',
      'A': 'A3',
      'B': 'B3'
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {noteOrder.map((note, index) => (
          <button
            key={note}
            className={`w-16 h-16 text-xl font-bold rounded-full transition-all flex flex-col items-center justify-center
              ${activeNote === note
                ? 'bg-blue-600 text-white scale-110'
                : 'bg-white border-2 border-gray-300 text-gray-800 hover:bg-gray-100'}`}
            onClick={() => handleClick(note)}
          >
            <span>{note}</span>
            <span className="text-xs text-gray-500">({index + 1})</span>
          </button>
        ))}
      </div>
      <div className="mt-3 text-gray-500 text-sm">
        Press 1–7 to guess C–B
      </div>
    </div>
  );
};

export default NoteButtons;