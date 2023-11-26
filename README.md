# Personality Test App

This is a React application that allows users to take a personality test. It displays a series of screens with questions that allow the user to self-assess different aspects of their personality.

## Functionality

The main functionality includes:

- Fullscreen card interface to display personality category questions
  - Uses React state and hooks to manage current card
  - Animates transition between cards
  - Cards take up full viewport size
- Likert scale questions with clickable options to capture self-assessment
  - Renders list of options as clickable buttons
  - Options have associated score value
  - Keeps track of selected option and score
- Tracking scores and selections in React state
  - Selected answers stored in React state
  - Answers organized by category and question
  - Can calculate overall score at end
- Calculating overall personality profile based on selections
  - Logic to tally scores by trait category
  - Can display user's "personality type"
- Clean and responsive UI using Styled Components
  - Layout uses flexbox and media queries
  - Reusable components for buttons, sections
  - Works across device sizes

## Components

The main React components are:

- `FullScreenCards` - Top level component
  - Manages all state
  - Renders card container
  - Handles card transitions
- `Card` - Individual category card
  - Background color
  - Title
  - Renders questions
- `LikertScaleQuestion`
  - Displays question text
  - Renders & handles Likert option buttons
- `Layout`, `Container`, `Button` - Reusable presentational components

## Data

- `questions.json` - Contains question text organized by category
- App state
  - `answers` - Selected scores by category & question
  - `selectedAnswers` - Tracks currently selected button

## Usage

To run locally:

```markdown
npm install
```

```markdown
npm start
```

The app works responsively across desktop and mobile. Users click through questions and get results.

Will be enhanced further with user accounts, data saving, sharing, etc.

```markdown
app
├── public
├── src
│ ├── components
│ │ ├── components3.js
│ │ ├── components2.js
│ │ └── components1.js
│ ├── data
│ │ └── questions.jsonl
├── logs
│ └── appLogs.log
├── App.js
├── index.js
├── package.json
├── .gitignore
├── README.md
├── .env
├── firebase.json
└── .firebaserc
```
