# OneWise Frontend

The frontend application for OneWise, a real-time collaborative mentorship platform. Built with Next.js 14, TypeScript, and Tailwind CSS, featuring real-time code editing with Monaco Editor and Yjs.

## Features

- **Real-time Collaborative Coding**: Monaco Editor integrated with Yjs for conflict-free editing
- **Modern UI**: Responsive design with Tailwind CSS and custom components
- **Authentication**: Supabase Auth integration
- **WebSocket Communication**: Real-time updates via Socket.io
- **Mentorship Sessions**: Create and join live coding sessions
- **User Profiles**: Profile management and session history

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Real-time**: Socket.io client, Yjs, y-websocket
- **Backend Integration**: Supabase

## Prerequisites

- Node.js >= 18
- npm, yarn, or pnpm

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

## Environment Setup

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Configure the following variables in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
```

## Running the Application

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run start
```

### Linting
```bash
npm run lint
```

## Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── auth/              # Authentication pages
│   │   ├── mentor/            # Mentor-specific pages
│   │   ├── session/           # Session pages
│   │   ├── profile/           # User profile pages
│   │   └── ...                # Other pages
│   ├── components/            # Reusable React components
│   │   ├── auth/             # Authentication components
│   │   ├── sidebar/           # Navigation components
│   │   └── ...               # Other components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility functions and configurations
│   └── types/                 # TypeScript type definitions
├── public/                    # Static assets
├── .env.example              # Environment variables template
├── next.config.js            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── vercel.json               # Vercel deployment configuration
```

## Key Components

- **AuthScaffold**: Authentication layout component
- **Sidebar**: Navigation sidebar
- **MonacoEditor**: Code editor with real-time collaboration
- **SessionManager**: Handles mentorship session logic

## Deployment

### Vercel
1. Connect your GitHub repository
2. Set root directory to `frontend`
3. Configure environment variables
4. Deploy

### Other Platforms
The app can be deployed to any static hosting service supporting Next.js.

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

## Contributing

1. Follow the existing code style
2. Run linting before committing
3. Test changes in development mode
4. Submit pull requests with clear descriptions
