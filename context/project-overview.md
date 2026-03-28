# DevBox — Project Overview

> A centralized developer workspace for managing code snippets, AI prompts, context files, commands, links, and more.

---

## Table of Contents

- [Concept](#concept)
- [Target Users](#target-users)
- [Tech Stack](#tech-stack)
- [Data Models (Prisma)](#data-models-prisma)
- [Item Types Reference](#item-types-reference)
- [Features](#features)
- [Monetization](#monetization)
- [UI/UX Guidelines](#uiux-guidelines)
- [Route Structure](#route-structure)

---

## Concept

DevBox is a SaaS tool that gives developers a single, fast workspace to store and retrieve the resources they use every day — snippets, prompts, terminal commands, links, notes, and files. Think of it as a developer's second brain, organized by type and grouped into collections.

---

## Target Users

| Persona | Primary Use Case |
|---|---|
| **Everyday Developer** | Quick access to snippets, commands, and links |
| **AI-First Developer** | Save prompts, context files, system messages, and workflows |
| **Content Creator / Educator** | Store code blocks, explanations, and course notes |
| **Full-Stack Builder** | Collect patterns, boilerplates, and API examples |

---

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| **Framework** | Next.js 16 / React 19 | SSR pages, API routes, single repo |
| **Language** | TypeScript | End-to-end type safety |
| **Database** | Neon (PostgreSQL) | Cloud-hosted Postgres |
| **ORM** | Prisma 7 | Migrations only — never use `db push` |
| **Auth** | NextAuth v5 | Email/password + GitHub OAuth |
| **File Storage** | Cloudflare R2 | For file and image uploads |
| **AI** | OpenAI `gpt-5-nano` | Auto-tagging, summaries, code explanation |
| **Styling** | Tailwind CSS v4 + shadcn/ui | Dark mode default |
| **Cache** | Redis | Under consideration |

**Key constraint:** Database changes must go through Prisma migrations. Never run `db push` or modify the schema directly. Migrations are created in dev and applied to prod.

### Reference Links

- Next.js Docs: https://nextjs.org/docs
- Prisma Docs: https://www.prisma.io/docs
- NextAuth v5: https://authjs.dev
- Tailwind CSS v4: https://tailwindcss.com/docs
- shadcn/ui: https://ui.shadcn.com
- Cloudflare R2: https://developers.cloudflare.com/r2
- Neon: https://neon.tech/docs
- OpenAI API: https://platform.openai.com/docs

---

## Data Models (Prisma)

```prisma
// ── Auth (NextAuth v5) ────────────────────────────────

model User {
  id                   String    @id @default(cuid())
  name                 String?
  email                String    @unique
  emailVerified        DateTime?
  image                String?
  password             String?
  isPro                Boolean   @default(false)
  stripeCustomerId     String?   @unique
  stripeSubscriptionId String?   @unique
  createdAt            DateTime  @default(now())
  updatedAt            DateTime  @updatedAt

  accounts    Account[]
  sessions    Session[]
  items       Item[]
  collections Collection[]
  itemTypes   ItemType[]
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

// ── Core Models ───────────────────────────────────────

model ItemType {
  id       String  @id @default(cuid())
  name     String
  icon     String
  color    String
  isSystem Boolean @default(false)
  userId   String?

  user  User?  @relation(fields: [userId], references: [id], onDelete: Cascade)
  items Item[]

  @@unique([name, userId])
}

model Item {
  id          String   @id @default(cuid())
  title       String
  contentType String   // "text" | "file" | "url"
  content     String?  // text content (null if file)
  fileUrl     String?  // R2 URL (null if text)
  fileName    String?  // original filename
  fileSize    Int?     // bytes
  url         String?  // for link types
  description String?
  language    String?  // programming language (optional)
  isFavorite  Boolean  @default(false)
  isPinned    Boolean  @default(false)
  lastUsedAt  DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  userId     String
  itemTypeId String

  user        User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  itemType    ItemType         @relation(fields: [itemTypeId], references: [id])
  tags        TagsOnItems[]
  collections ItemCollection[]

  @@index([userId])
  @@index([itemTypeId])
}

model Collection {
  id            String   @id @default(cuid())
  name          String
  description   String?
  isFavorite    Boolean  @default(false)
  defaultTypeId String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  userId String

  user  User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  items ItemCollection[]

  @@index([userId])
}

model ItemCollection {
  itemId       String
  collectionId String
  addedAt      DateTime @default(now())

  item       Item       @relation(fields: [itemId], references: [id], onDelete: Cascade)
  collection Collection @relation(fields: [collectionId], references: [id], onDelete: Cascade)

  @@id([itemId, collectionId])
}

model Tag {
  id   String @id @default(cuid())
  name String @unique

  items TagsOnItems[]
}

model TagsOnItems {
  itemId String
  tagId  String

  item Item @relation(fields: [itemId], references: [id], onDelete: Cascade)
  tag  Tag  @relation(fields: [tagId], references: [id], onDelete: Cascade)

  @@id([itemId, tagId])
}
```

---

## Item Types Reference

These are the built-in system types. Users can also create custom types.

| Type | Color | Hex | Icon (Lucide) | Content Model |
|---|---|---|---|---|
| Snippet | 🔵 Blue | `#3b82f6` | `Code` | text |
| Prompt | 🟣 Purple | `#8b5cf6` | `Sparkles` | text |
| Command | 🟠 Orange | `#f97316` | `Terminal` | text |
| Note | 🟡 Yellow | `#fde047` | `StickyNote` | text |
| File | ⚫ Gray | `#6b7280` | `File` | file |
| Image | 🩷 Pink | `#ec4899` | `Image` | file |
| Link | 🟢 Emerald | `#10b981` | `Link` | url |

All icons sourced from [Lucide Icons](https://lucide.dev/icons).

---

## Features

### Core

- **Items & Types** — Create, edit, delete items. Each item has a type that determines its color, icon, and content model. System types are immutable; users can add custom types. Items open in a slide-over drawer for fast access.
- **Collections** — Group items of any type. An item can belong to multiple collections (many-to-many). Examples: "React Patterns", "Interview Prep", "Context Files".
- **Search** — Full-text search across title, content, tags, and type. Filterable by type, collection, and tags.
- **Favorites & Pins** — Favorite collections and items for quick access. Pin items to the top of any view.
- **Recently Used** — Track and surface recently accessed items via `lastUsedAt`.
- **Markdown Editor** — Rich editing for text-based types (snippets, notes, prompts, commands) with syntax highlighting.
- **File Upload** — Drag-and-drop upload to Cloudflare R2 for file and image types.
- **Import from File** — Import code content directly from uploaded source files.
- **Export** — Export items and collections as JSON or ZIP (Pro).
- **Dark Mode** — Dark theme by default, light mode toggle available.
- **Multi-Collection Management** — Add/remove items to/from multiple collections. View which collections an item belongs to.

### Authentication

- Email/password registration and login
- GitHub OAuth sign-in
- Powered by NextAuth v5

### AI Features (Pro Only)

| Feature | Description |
|---|---|
| **Auto-Tag Suggestions** | AI analyzes content and suggests relevant tags |
| **AI Summaries** | Generate concise summaries of items |
| **Explain This Code** | AI-powered code explanation for snippets |
| **Prompt Optimizer** | Improve and refine AI prompts |

---

## Monetization

| | Free | Pro (£5/mo · £50/yr) |
|---|---|---|
| Items | 100 max | Unlimited |
| Collections | Unlimited | Unlimited |
| Search | Basic | Full |
| AI Features | ✗ | ✓ |
| Export (JSON/ZIP) | ✗ | ✓ |
| Priority Support | ✗ | ✓ |

Payments handled via Stripe. User model tracks `stripeCustomerId` and `stripeSubscriptionId`.

> **Dev note:** During development, all users have full access. Pro gating is enforced at launch.

---

## UI/UX Guidelines

### Design Principles

- Modern, minimal, developer-focused aesthetic
- Clean typography with generous whitespace
- Subtle borders and shadows
- Syntax highlighting for all code blocks
- Design references: Notion, Linear, Raycast

### Layout

```
┌─────────────────────────────────────────────────────┐
│  ┌──────────┐  ┌──────────────────────────────────┐ │
│  │           │  │                                  │ │
│  │  Sidebar  │  │         Main Content             │ │
│  │           │  │                                  │ │
│  │ ┌──────┐  │  │  ┌────────┐ ┌────────┐ ┌──────┐ │ │
│  │ │Types │  │  │  │ Coll.  │ │ Coll.  │ │Coll. │ │ │
│  │ │ list │  │  │  │ Card   │ │ Card   │ │Card  │ │ │
│  │ └──────┘  │  │  └────────┘ └────────┘ └──────┘ │ │
│  │           │  │                                  │ │
│  │ ┌──────┐  │  │  ┌────────┐ ┌────────┐ ┌──────┐ │ │
│  │ │Colls │  │  │  │ Item   │ │ Item   │ │Item  │ │ │
│  │ │ list │  │  │  │ Card   │ │ Card   │ │Card  │ │ │
│  │ └──────┘  │  │  └────────┘ └────────┘ └──────┘ │ │
│  │           │  │                                  │ │
│  └──────────┘  └──────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

- **Sidebar** (collapsible): Item type navigation links, recent collections. Becomes a drawer on mobile.
- **Main area**: Grid of collection cards (background color matches dominant item type) and item cards (border color matches type).
- **Item detail**: Opens in a slide-over drawer for quick viewing and editing.

### Responsiveness

- Desktop-first, mobile-usable
- Sidebar collapses to hamburger menu / drawer on small screens

### Micro-Interactions

- Smooth transitions on navigation and state changes
- Hover states on cards with subtle elevation shifts
- Toast notifications for create, update, delete, copy actions
- Loading skeleton placeholders during data fetches

---

## Route Structure

```
/                          → Dashboard (collections grid + recent items)
/items                     → All items
/items/snippets            → Items filtered by type: Snippet
/items/prompts             → Items filtered by type: Prompt
/items/commands            → Items filtered by type: Command
/items/notes               → Items filtered by type: Note
/items/files               → Items filtered by type: File
/items/images              → Items filtered by type: Image
/items/links               → Items filtered by type: Link
/collections               → All collections
/collections/[id]          → Single collection view
/search                    → Search results page
/settings                  → User settings & preferences
/settings/billing          → Stripe subscription management
/auth/signin               → Sign in (email + GitHub)
/auth/signup               → Register
```

---

## Entity Relationship Diagram

```
┌──────────┐       ┌──────────┐       ┌──────────────┐
│   User   │──1:N──│   Item   │──N:M──│  Collection  │
└──────────┘       └──────────┘       └──────────────┘
     │                  │                     │
     │ 1:N              │ N:1                 │
     ▼                  ▼                     │
┌──────────┐       ┌──────────┐               │
│ ItemType │       │TagsOnItem│               │
└──────────┘       └──────────┘               │
     ▲                  │                     │
     │ (custom)         │ N:1                 │
     │                  ▼                     │
   User            ┌──────────┐               │
                   │   Tag    │               │
                   └──────────┘               │
                                              │
                   ┌──────────────────┐       │
                   │ ItemCollection   │───────┘
                   │ (join table)     │
                   └──────────────────┘
```

- **User → Item**: One-to-many. A user owns many items.
- **User → Collection**: One-to-many. A user owns many collections.
- **User → ItemType**: One-to-many. A user can create custom types (system types have `userId: null`).
- **Item → ItemType**: Many-to-one. Every item has exactly one type.
- **Item ↔ Collection**: Many-to-many via `ItemCollection` join table.
- **Item ↔ Tag**: Many-to-many via `TagsOnItems` join table.
