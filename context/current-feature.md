# Current Feature

Seed Data — see @context/features/05-seed-spec.md

## Status

Complete

## Goals and requirements

- Populate the database with sample data for development and demos
- Overwrite existing `prisma/seed.ts`
- Create a user (john@mail.com), 7 system item types, 5 collections with items per spec

## Notes


## History

<!-- Kepp this updated. Earliest to latest -->

- 2026-03-28: Initial Next.js, Tailwind and AI setup committed and pushed to GitHub
- 2026-03-30: Dashboard UI Phase 1 completed — shadcn/ui init, /dashboard route, dark mode, top bar with search and New Item button, sidebar and main placeholders
- 2026-03-31: Dashboard UI Phase 2 completed — collapsible sidebar with Types, Collections and Recent sections, item counts, colored icons, icon-only collapsed state
- 2026-04-01: Dashboard UI Phase 3 completed — stats cards, collections grid, pinned/recent items, sidebar polish (icon centering, mobile backdrop, no layout shift)
- 2026-04-01: Database setup completed — Prisma 7 + Neon PostgreSQL, full schema (User, Item, Collection, Tag, ItemType + NextAuth models), migrations config, PrismaClient singleton
- 2026-04-08: Seed data completed — user (john@mail.com), 7 system item types, 5 collections with 16 items total (snippets, prompts, commands, links)
