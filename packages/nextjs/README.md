# Next.js Application

This is the main Next.js application for the SRust-Basic-Stellar-yarn project.

## Features

- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- shadcn/ui for UI components
- ESLint for code linting
- Modern import aliases (@/*)

## Getting Started

### Development

1. Install dependencies:
```bash
yarn install
```

2. Start the development server:
```bash
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
yarn build
```

To start the production server:
```bash
yarn start
```

## Project Structure

```
src/
├── app/             # App Router pages and layouts
├── components/      # Reusable UI components
├── lib/            # Utility functions and shared logic
└── styles/         # Global styles and Tailwind config
```

## Adding Components

To add a new shadcn/ui component:

```bash
npx shadcn add [component-name]
```

Example:
```bash
npx shadcn add button
```

## Development Guidelines

1. Follow the TypeScript types strictly
2. Use the provided import alias (@/*) for clean imports
3. Keep components small and focused
4. Follow the Tailwind CSS class ordering conventions
5. Use shadcn/ui components when available

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn type-check` - Run TypeScript type checking
