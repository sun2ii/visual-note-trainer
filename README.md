# Note Trainer

A web application to practice identifying notes on the musical staff in both treble and bass clefs.

## Features

- Interactive music note recognition training
- Support for both treble and bass clefs
- Real-time feedback on correct/incorrect answers
- Score tracking
- Responsive design that works on desktop and mobile devices
- Built with modern web technologies (Next.js, React, Tailwind CSS)
- Uses VexFlow for music notation rendering

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/note-trainer.git
   cd note-trainer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. **Home Page**: Select which clef you want to practice with (Treble or Bass)
2. **Clef Trainer Page**: 
   - A random note will be displayed on the staff
   - Click on the note name (A, B, C, D, E, F, G) that matches the displayed note
   - Receive immediate feedback (✅ for correct, ❌ for incorrect)
   - Your score is displayed at the top
   - Click "New Note" to manually generate a new random note

3. **Navigation**:
   - Use the "Switch to Bass/Treble Clef" button to quickly change between clefs
   - Use the "Back to Home" link to return to the main menu

## Project Structure

```
note-trainer/
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js app router pages
│   │   ├── bass/       # Bass clef trainer page
│   │   ├── treble/     # Treble clef trainer page
│   │   └── page.js     # Home page
│   └── components/     # React components
│       ├── BassClef.js
│       ├── MusicStaff.js
│       ├── NoteButtons.js
│       ├── NoteTrainer.js
│       ├── SingleClefTrainer.js
│       ├── TrebleClef.js
│       └── UnifiedNoteTrainer.js
├── package.json
└── README.md
```

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for server-rendered applications
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [VexFlow](https://www.vexflow.com/) - JavaScript library for music notation rendering

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
