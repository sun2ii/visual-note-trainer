'use client';

import { useEffect, useRef } from 'react';
import { Renderer, Stave, StaveNote, Voice, Formatter } from 'vexflow';

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
  'C': { keys: ['c/3'], duration: 'w' },
  'D': { keys: ['d/3'], duration: 'w' },
  'E': { keys: ['e/3'], duration: 'w' },
  'F': { keys: ['f/3'], duration: 'w' },
  'G': { keys: ['g/3'], duration: 'w' },
  'A': { keys: ['a/3'], duration: 'w' },
  'B': { keys: ['b/3'], duration: 'w' }
};

const MusicStaff = ({ clef = 'treble', width = 300, height = 150, currentNote = null }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    containerRef.current.innerHTML = '';

    try {
      const renderer = new Renderer(
        containerRef.current,
        Renderer.Backends.SVG
      );

      renderer.resize(width, height);
      const context = renderer.getContext();
      context.setFillStyle('#000000');
      context.setStrokeStyle('#000000');

      const stave = new Stave(10, 40, width - 20);
      stave.addClef(clef);
      stave.setContext(context).draw();

      if (currentNote) {
        let noteKey, duration;

        if (currentNote.includes('/')) {
          const [noteName, octave] = currentNote.split('/');
          let adjustedOctave = parseInt(octave, 10);

          // ✅ FIX: Adjust for bass clef (bump octave up by 1 for correct rendering)
          if (clef === 'bass') {
            adjustedOctave += 1;
          }

          noteKey = `${noteName}/${adjustedOctave}`;
          duration = 'w';
        } else {
          const noteMap = clef === 'treble' ? TREBLE_NOTE_MAP : BASS_NOTE_MAP;

          if (!noteMap[currentNote]) {
            console.error(`Note ${currentNote} not found in ${clef} note map`);
            return;
          }

          noteKey = noteMap[currentNote].keys[0];
          duration = noteMap[currentNote].duration;
        }

        const note = new StaveNote({
          keys: [noteKey],
          duration: duration
        });

        const voice = new Voice({ num_beats: 4, beat_value: 4 });
        voice.addTickable(note);

        new Formatter().joinVoices([voice]).format([voice], width - 50);
        voice.draw(context, stave);
      }
    } catch (error) {
      console.error("Error rendering music notation:", error);
      console.error("Current note:", currentNote);

      try {
        const renderer = new Renderer(
          containerRef.current,
          Renderer.Backends.SVG
        );
        renderer.resize(width, height);
        const context = renderer.getContext();

        const stave = new Stave(10, 40, width - 20);
        stave.addClef(clef);
        stave.setContext(context).draw();
      } catch (e) {
        console.error("Failed to render even basic staff:", e);
      }
    }
  }, [clef, width, height, currentNote]);

  return <div ref={containerRef} className="music-staff" />;
};

export default MusicStaff;
