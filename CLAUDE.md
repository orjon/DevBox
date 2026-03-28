# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Context files

Read the following for project context:

- @/context/project-overview.md
- @/context/coding-standards.md
- @/context/ai-interaction.md
- @/context/ccurrent-feature.md

## Commands

```bash
npm run dev      # start dev server
npm run build    # production build
npm run start    # start production server
npm run lint     # run ESLint
```

## Stack

- **Next.js 16** (App Router) with React 19 and TypeScript
- **Tailwind CSS v4** — configured via PostCSS; no `tailwind.config.*` file; theme customisation goes in `globals.css`
- **React Compiler** enabled (`reactCompiler: true` in `next.config.ts`) — manual memoisation (`useMemo`, `useCallback`, `memo`) is unnecessary
