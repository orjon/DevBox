export const currentUser = {
  id: 'user_1',
  name: 'John Doe',
  email: 'john@mail.com',
  image: null,
  isPro: false
}

export const itemTypes = [
  {
    id: 'type_snippet',
    name: 'Snippet',
    icon: 'Code',
    color: '#3b82f6',
    isSystem: true,
    userId: null
  },
  {
    id: 'type_prompt',
    name: 'Prompt',
    icon: 'Sparkles',
    color: '#8b5cf6',
    isSystem: true,
    userId: null
  },
  {
    id: 'type_command',
    name: 'Command',
    icon: 'Terminal',
    color: '#f97316',
    isSystem: true,
    userId: null
  },
  {
    id: 'type_note',
    name: 'Note',
    icon: 'StickyNote',
    color: '#fde047',
    isSystem: true,
    userId: null
  },
  {
    id: 'type_file',
    name: 'File',
    icon: 'File',
    color: '#6b7280',
    isSystem: true,
    userId: null
  },
  {
    id: 'type_image',
    name: 'Image',
    icon: 'Image',
    color: '#ec4899',
    isSystem: true,
    userId: null
  },
  {
    id: 'type_link',
    name: 'Link',
    icon: 'Link',
    color: '#10b981',
    isSystem: true,
    userId: null
  }
]

export const items = [
  {
    id: 'item_1',
    title: 'useDebounce Hook',
    contentType: 'code',
    content: `import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}`,
    description: 'Debounce hook for delaying values',
    language: 'typescript',
    itemTypeId: 'type_snippet',
    tags: ['react', 'hooks', 'typescript'],
    isFavorite: false,
    isPinned: true,
    lastUsedAt: new Date('2026-03-28T10:00:00Z'),
    createdAt: new Date('2026-03-20T09:00:00Z'),
    updatedAt: new Date('2026-03-28T10:00:00Z'),
    userId: 'user_1'
  },
  {
    id: 'item_2',
    title: 'Code Review Prompt',
    contentType: 'text',
    content: `You are an expert code reviewer. Review the following code for:
1. Bugs and potential issues
2. Performance optimizations
3. Best practices and readability`,
    description: 'Comprehensive code review prompt',
    language: null,
    itemTypeId: 'type_prompt',
    tags: ['code-review', 'ai'],
    isFavorite: false,
    isPinned: false,
    lastUsedAt: new Date('2026-03-27T14:00:00Z'),
    createdAt: new Date('2026-03-15T11:00:00Z'),
    updatedAt: new Date('2026-03-27T14:00:00Z'),
    userId: 'user_1'
  },
  {
    id: 'item_3',
    title: 'Docker Compose Up',
    contentType: 'text',
    content: `docker compose -f docker-compose.dev.yml up --build`,
    description: 'Start dev environment with rebuild',
    language: 'bash',
    itemTypeId: 'type_command',
    tags: ['docker', 'devops'],
    isFavorite: false,
    isPinned: true,
    lastUsedAt: new Date('2026-03-28T08:00:00Z'),
    createdAt: new Date('2026-03-10T08:00:00Z'),
    updatedAt: new Date('2026-03-28T08:00:00Z'),
    userId: 'user_1'
  },
  {
    id: 'item_4',
    title: 'Meeting Notes Template',
    contentType: 'text',
    content: `# Meeting Notes
Date: {{date}}
Attendees: {{names}}

## Agenda

## Action Items
- [ ]`,
    description: 'Template for structured meeting notes',
    language: null,
    itemTypeId: 'type_note',
    tags: ['template', 'meetings'],
    isFavorite: false,
    isPinned: false,
    lastUsedAt: new Date('2026-03-26T16:00:00Z'),
    createdAt: new Date('2026-03-05T10:00:00Z'),
    updatedAt: new Date('2026-03-26T16:00:00Z'),
    userId: 'user_1'
  },
  {
    id: 'item_7',
    title: 'useFetch Hook',
    contentType: 'code',
    content: `import { useState, useEffect } from "react";

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    fetch(url)
      .then((res) => res.json())
      .then((data) => !cancelled && setState({ data, loading: false, error: null }))
      .catch((err) => !cancelled && setState({ data: null, loading: false, error: err.message }));
    return () => { cancelled = true; };
  }, [url]);

  return state;
}`,
    description: 'Generic fetch hook with loading and error state',
    language: 'typescript',
    itemTypeId: 'type_snippet',
    tags: ['react', 'hooks', 'fetch'],
    isFavorite: true,
    isPinned: false,
    lastUsedAt: new Date('2026-03-29T11:00:00Z'),
    createdAt: new Date('2026-03-18T10:00:00Z'),
    updatedAt: new Date('2026-03-29T11:00:00Z'),
    userId: 'user_1'
  },
  {
    id: 'item_5',
    title: 'Git Commit Template',
    contentType: 'text',
    content: `git commit -m "feat({{scope}}): {{description}}"`,
    description: 'Conventional commit message format',
    language: 'bash',
    itemTypeId: 'type_command',
    tags: ['git', 'workflow'],
    isFavorite: false,
    isPinned: false,
    lastUsedAt: new Date('2026-03-28T09:30:00Z'),
    createdAt: new Date('2026-03-01T08:00:00Z'),
    updatedAt: new Date('2026-03-28T09:30:00Z'),
    userId: 'user_1'
  },
  {
    id: 'item_6',
    title: 'API Error Handler',
    contentType: 'code',
    content: `import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function handleApiError(error: unknown): NextResponse {
  if (error instanceof ZodError) {
    return NextResponse.json(
      { error: "Validation failed", details: error.flatten() },
      { status: 400 }
    );
  }
  return NextResponse.json(
    { error: "Internal server error" },
    { status: 500 }
  );
}`,
    description: 'Standardised error handling for API routes',
    language: 'typescript',
    itemTypeId: 'type_snippet',
    tags: ['nextjs', 'api', 'error-handling'],
    isFavorite: false,
    isPinned: false,
    lastUsedAt: new Date('2026-03-25T12:00:00Z'),
    createdAt: new Date('2026-03-12T14:00:00Z'),
    updatedAt: new Date('2026-03-25T12:00:00Z'),
    userId: 'user_1'
  },
  {
    id: 'item_8',
    title: 'Tailwind Dark Mode Setup',
    contentType: 'text',
    content: `Add 'dark' class to <html> element and use dark: prefix in Tailwind classes.`,
    description: 'Quick reference for Tailwind dark mode',
    language: null,
    itemTypeId: 'type_note',
    tags: ['tailwind', 'css', 'dark-mode'],
    isFavorite: true,
    isPinned: false,
    lastUsedAt: new Date('2026-03-30T09:00:00Z'),
    createdAt: new Date('2026-03-22T10:00:00Z'),
    updatedAt: new Date('2026-03-30T09:00:00Z'),
    userId: 'user_1'
  },
  {
    id: 'item_9',
    title: 'Zod Schema Validator',
    contentType: 'code',
    content: `import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().int().positive().optional(),
});

export type User = z.infer<typeof userSchema>;`,
    description: 'Reusable Zod schema for user validation',
    language: 'typescript',
    itemTypeId: 'type_snippet',
    tags: ['zod', 'validation', 'typescript'],
    isFavorite: false,
    isPinned: true,
    lastUsedAt: new Date('2026-03-31T08:00:00Z'),
    createdAt: new Date('2026-03-25T11:00:00Z'),
    updatedAt: new Date('2026-03-31T08:00:00Z'),
    userId: 'user_1'
  },
  {
    id: 'item_10',
    title: 'Prisma Find Many',
    contentType: 'code',
    content: `const users = await prisma.user.findMany({
  where: { active: true },
  orderBy: { createdAt: "desc" },
  take: 10,
});`,
    description: 'Paginated Prisma query with filter and sort',
    language: 'typescript',
    itemTypeId: 'type_snippet',
    tags: ['prisma', 'database'],
    isFavorite: false,
    isPinned: false,
    lastUsedAt: new Date('2026-03-24T14:00:00Z'),
    createdAt: new Date('2026-03-14T09:00:00Z'),
    updatedAt: new Date('2026-03-24T14:00:00Z'),
    userId: 'user_1'
  }
]

export const collections = [
  {
    id: 'col_1',
    name: 'React Patterns',
    description: 'Reusable hooks and patterns for building components',
    isFavorite: true,
    defaultTypeId: 'type_snippet',
    itemIds: ['item_1', 'item_6', 'item_7'],
    createdAt: new Date('2026-03-01T08:00:00Z'),
    updatedAt: new Date('2026-03-28T10:00:00Z'),
    userId: 'user_1'
  },
  {
    id: 'col_2',
    name: 'AI Prompts Library',
    description: 'Collection of AI prompts for various tasks',
    isFavorite: false,
    defaultTypeId: 'type_prompt',
    itemIds: ['item_2'],
    createdAt: new Date('2026-03-05T09:00:00Z'),
    updatedAt: new Date('2026-03-27T14:00:00Z'),
    userId: 'user_1'
  },
  {
    id: 'col_3',
    name: 'Terminal Aliases',
    description: 'Shell and command line tools for productivity',
    isFavorite: false,
    defaultTypeId: 'type_command',
    itemIds: ['item_3', 'item_5'],
    createdAt: new Date('2026-03-08T10:00:00Z'),
    updatedAt: new Date('2026-03-28T09:30:00Z'),
    userId: 'user_1'
  },
  {
    id: 'col_4',
    name: 'Interview Prep',
    description: 'Technical interview questions and answers',
    isFavorite: true,
    defaultTypeId: 'type_note',
    itemIds: ['item_4'],
    createdAt: new Date('2026-03-10T11:00:00Z'),
    updatedAt: new Date('2026-03-26T16:00:00Z'),
    userId: 'user_1'
  }
]
