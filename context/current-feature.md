# Current Feature

Database Setup — see @context/features/04-database-spec.md

## Status

Complete

## Goals and requirements

- Set up Prisma ORM with Neon PostgreSQL (serverless)
- Create initial schema based on data models in project-overview.md
- Include NextAuth models (Account, Session, VerificationToken)
- Add appropriate indexes and cascade deletes
- Use Prisma 7 (breaking changes — read upgrade guide before implementing)
- Always create migrations, never push directly to DB

## Notes


## History

<!-- Kepp this updated. Earliest to latest -->

- 2026-03-28: Initial Next.js, Tailwind and AI setup committed and pushed to GitHub
- 2026-03-30: Dashboard UI Phase 1 completed — shadcn/ui init, /dashboard route, dark mode, top bar with search and New Item button, sidebar and main placeholders
- 2026-03-31: Dashboard UI Phase 2 completed — collapsible sidebar with Types, Collections and Recent sections, item counts, colored icons, icon-only collapsed state
- 2026-04-01: Dashboard UI Phase 3 completed — stats cards, collections grid, pinned/recent items, sidebar polish (icon centering, mobile backdrop, no layout shift)
- 2026-04-01: Database setup completed — Prisma 7 + Neon PostgreSQL, full schema (User, Item, Collection, Tag, ItemType + NextAuth models), migrations config, PrismaClient singleton
