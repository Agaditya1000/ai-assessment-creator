# VedaAI – AI Assessment Creator

VedaAI is a full-stack platform that allows teachers to generate structured, professional question papers using AI.

## Features
- **AI-Powered Generation**: Instantly create assessments based on topics and instructions.
- **Structured Output**: Questions are organized into sections with difficulty levels and marks.
- **Real-time Updates**: Track the AI generation progress via WebSockets.
- **Premium Design**: Glassmorphic, dark-themed UI built with Next.js and Vanilla CSS.
- **Background Processing**: Reliable generation using BullMQ and Redis.

## Tech Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, Zustand, Socket.io-client, Framer Motion.
- **Backend**: Node.js, Express, TypeScript, MongoDB (Mongoose), Redis, BullMQ, Socket.io.
- **AI**: Google Gemini AI (1.5 Flash).

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or Atlas)
- Redis (Running locally or via Docker)

### Backend Setup
1. Navigate to `server/`
2. Run `npm install`
3. Create a `.env` file based on `.env.example` and add your `GEMINI_API_KEY`.
4. Run `npm run dev`

### Frontend Setup
1. Navigate to `client/`
2. Run `npm install`
3. Create a `.env` file based on `.env.example`.
4. Run `npm run dev`

## Architecture Overview
- **API Request**: Frontend sends assessment parameters to the backend.
- **Job Queue**: Backend creates a MongoDB record and adds a generation job to BullMQ.
- **AI Processing**: A background worker picks up the job, calls Gemini API with a structured prompt, and parses the JSON response.
- **Real-time Notify**: Upon completion, the worker updates the database and emits a WebSocket event to the frontend.
- **Result UI**: Frontend receives the update and renders the structured question paper.
