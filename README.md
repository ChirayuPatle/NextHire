# NextHire - Setup Guide

## Prerequisites
- Node.js (latest LTS version)
- Bun.js
- Git

## Frontend Setup (React.js)
1. Clone the repository
```bash
git clone git@github.com:ChirayuPatle/NextHire.git
cd NextHire
```

2. Navigate to frontend directory
```bash
cd frontend
```

3. Install dependencies
```bash
npm install
```

4. Start development server
```bash
npm start
```
The frontend will be available at `http://localhost:3000`

## Backend Setup (Bun.js)
1. Navigate to backend directory
```bash
cd backend
```

2. Install Bun (if not installed)
```bash
curl -fsSL https://bun.sh/install | bash
```

3. Install dependencies
```bash
bun install
```

4. Start the server
```bash
bun start
```
The backend will be available at `http://localhost:8000`

## Running Both Services
- Keep both terminal windows open (frontend and backend)
- Frontend and backend must be running simultaneously
- Ensure all environment variables are properly configured