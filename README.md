# React Quiz Application

A dynamic quiz application built with React, Vite, and TailwindCSS that features multiple-choice and integer-based questions, real-time feedback, timer functionality, and persistent storage of quiz attempts.

[Try it out here!](https://remarkable-crumble-7d2ffc.netlify.app/)

![Quiz Interface](https://github.com/cranyax7/interactive-quiz-platform/blob/main/public/sampleQuiz.png)

## Features

- 🎯 Multiple choice and integer input questions
- ⏱️ 30-second timer for each question
- 💡 Immediate feedback on answers
- 📊 Score tracking and history
- 💾 Persistent storage using IndexedDB
- 🎨 Responsive design with Tailwind CSS
- 🔄 Option to retake the quiz

![Quiz Results](https://github.com/cranyax7/interactive-quiz-platform/blob/main/public/quizResult.png)

## Setup

1. Clone the repository:
```bash
git clone https://github.com/cranyax7/interactive-quiz-platform.git
cd quiz-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── App.jsx
├── components/
│   └── Quiz.jsx
├── data/
│   └── questions.js
└── db/
    └── indexedDB.js
```

## Technical Stack

- **React** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **IndexedDB** - Local storage

## Features in Detail

### Question Types
- Multiple Choice Questions (MCQ)
  - Instant feedback with color-coded responses
  - Options clearly displayed
- Integer Questions
  - Input validation
  - Submit button for answer confirmation

### Timer
- 30-second countdown for each question
- Visual indicator turns red in last 10 seconds
- Auto-submits when time runs out

### Scoring
- Real-time score tracking
- Percentage calculation
- Historical attempt tracking

### Storage
- Persistent storage of quiz attempts using IndexedDB
- Stores score, total questions, and timestamp
- View previous attempts in results screen

## Quiz Data Structure

The quiz data should be structured as follows in `src/data/questions.js`:

```javascript
export const quizData = {
  title: "Quiz Title",
  questions: [
    {
      id: 1,
      type: "mcq",
      question: "Question text",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correct: 0 // Index of correct answer
    },
    {
      id: 2,
      type: "integer",
      question: "Question text",
      correct: 42 // Correct integer answer
    }
  ]
};
```

## Acknowledgments

- Built with React and Vite
- Styled with Tailwind CSS
- Uses IndexedDB for local storage
- Timer implementation inspired by React useEffect patterns