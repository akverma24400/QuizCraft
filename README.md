# PDF to Quiz

An AI-powered web application that converts PDF documents into interactive quizzes using AI.

---

## Overview

PDF to Quiz allows users to upload PDF documents, automatically extract questions and answers, generate missing answers using Groq AI, review the extracted content, and create timed quizzes.

The project is designed using a modular architecture so that every component can be reused in future AI-powered applications.

---

## Features

- Upload PDF documents
- Extract text from PDFs
- Detect multiple-choice questions
- Extract existing answers
- Generate missing answers using Groq AI
- Generate explanations for answers
- Classify questions by topic
- Classify difficulty level
- Review extracted questions in a table
- Edit questions before creating quizzes
- Create timed quizzes
- View detailed quiz results
- Export questions to CSV, Excel, and JSON

---

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router

### Backend

- Python
- FastAPI
- PyMuPDF
- pdfplumber
- Groq API
- MongoDB

---

## Project Structure

```
pdf-to-quiz/
│
├── frontend/
├── backend/
└── README.md
```

---

## Development Roadmap

### Phase 1

- [ ] Backend Setup
- [ ] File Upload
- [ ] PDF Text Extraction

### Phase 2

- [ ] Question Extraction
- [ ] Option Extraction
- [ ] Answer Extraction

### Phase 3

- [ ] Groq AI Integration
- [ ] Explanation Generation
- [ ] Topic Classification
- [ ] Difficulty Classification

### Phase 4

- [ ] MongoDB Integration
- [ ] Review Question Table

### Phase 5

- [ ] Quiz Engine
- [ ] Timer
- [ ] Results Page

### Phase 6

- [ ] Export to CSV
- [ ] Export to Excel
- [ ] Export to JSON

---

## Planned Workflow

```

Upload PDF
↓
Extract Text
↓
Extract Questions
↓
Extract Answers
↓
Generate Missing Answers (Groq AI)
↓
Store in MongoDB
↓
Review Questions
↓
Generate Quiz
↓
Attempt Quiz
↓
Results & Analytics
↓
Export Data

```

---

## Project Goals

- Build a reusable PDF processing engine.
- Create a modular AI-powered quiz generator.
- Follow clean architecture principles.
- Keep backend and frontend completely independent.
- Make every module reusable in future projects.

---

## Status

🚧 Project under active development.
