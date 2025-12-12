# CalicoChess

A chess application with a Python backend and TypeScript React frontend.

## Project Structure

```
CalicoChess/
├── backend/           # Python backend for managing long-term state
│   ├── src/          # Source code
│   ├── tests/        # Test files
│   └── requirements.txt
└── frontend/         # TypeScript React SPA
    └── src/
        └── components/
            └── Chessboard.tsx
```

## Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Frontend Setup

The frontend is already installed. To run the development server:

```bash
cd frontend
npm run dev
```

The app will be available at `http://localhost:5173/`

## Features

- Basic 8x8 chessboard with standard starting position
- Unicode chess pieces
- Responsive design with hover effects
