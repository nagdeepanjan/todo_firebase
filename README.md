# Firebase Todo App

A modern Todo application built with React, Vite, and Firebase.

## Features

- User authentication with Firebase Auth
- Real-time todo synchronization with Firestore
- Add, edit, delete, and mark todos as complete
- Target date setting for todos
- Responsive design

## Tech Stack

- **Frontend**: React 19 with Vite
- **Backend**: Firebase (Firestore & Auth)
- **Testing**: Vitest with Testing Library
- **Linting**: ESLint with React hooks plugin

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up Firebase configuration in `src/firebase.js`
4. Start development server: `npm run dev`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Run ESLint

## Branch Information

This repository uses `main` as the default branch. See [.github/README.md](.github/README.md) for instructions on setting up the default branch correctly.

## Development Setup

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
