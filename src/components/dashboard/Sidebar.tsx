"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutGrid,
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image,
  Link2,
  Star,
  Plus,
  Settings,
  User,
  ChevronDown,
  Folder,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { collections, items, currentUser, itemTypes } from "@/data/mock-data";

type IconComponent = React.ComponentType<{ className?: string; style?: React.CSSProperties }>;

const ICON_MAP: Record<string, IconComponent> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image,
  Link: Link2,
};

export interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const totalItemCount = items.length;

const typeItemCounts: Record<string, number> = Object.fromEntries(
  itemTypes.map((t) => [t.id, items.filter((i) => i.itemTypeId === t.id).length])
);

const collectionItemCounts: Record<string, number> = Object.fromEntries(
  collections.map((c) => [c.id, c.itemIds.length])
);

const favoriteCollections = collections.filter((c) => c.isFavorite);
const otherCollections = collections.filter((c) => !c.isFavorite);

const recentItems = [...items]
  .sort((a, b) => b.lastUsedAt.getTime() - a.lastUsedAt.getTime())
  .slice(0, 3);

export function Sidebar({ collapsed, onToggleCollapse }: SidebarProps) {
  const [openSections, setOpenSections] = useState({
    types: true,
    collections: true,
    recent: true,
  });

  const toggle = (key: keyof typeof openSections) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <aside
      className={cn(
        "flex flex-col bg-sidebar border-r border-sidebar-border overflow-hidden shrink-0",
        "transition-all duration-300 ease-in-out",
        collapsed ? "w-14" : "w-56",
      )}
    >
      <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">

        {/* ── Navigation + collapse toggle ── */}
        <div className="p-2">
          {collapsed ? (
            <div className="flex justify-center py-1">
              <button
                onClick={onToggleCollapse}
                className="rounded-md p-1.5 text-sidebar-foreground/40 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                aria-label="Expand sidebar"
              >
                <PanelLeft className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between px-2 pb-1 pt-0.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/40">
                Navigation
              </span>
              <button
                onClick={onToggleCollapse}
                className="rounded-md p-0.5 text-sidebar-foreground/40 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                aria-label="Collapse sidebar"
              >
                <PanelLeftClose className="h-4 w-4" />
              </button>
            </div>
          )}
          <NavItem href="/dashboard" icon={<LayoutGrid className="h-4 w-4 shrink-0" />} collapsed={collapsed}>
            Dashboard
          </NavItem>
        </div>

        {/* ── Types ── */}
        <div className="px-2 pb-2">
          {collapsed ? (
            <SectionDivider />
          ) : (
            <SectionHeader label="Types" open={openSections.types} onToggle={() => toggle("types")} />
          )}
          {(collapsed || openSections.types) && (
            <>
              <NavItem href="/items" icon={<LayoutGrid className="h-4 w-4 shrink-0" />} collapsed={collapsed} count={totalItemCount}>
                All Items
              </NavItem>
              {itemTypes.map((type) => {
                const Icon = ICON_MAP[type.icon] ?? File;
                return (
                  <NavItem
                    key={type.id}
                    href={`/items/${type.name.toLowerCase()}s`}
                    icon={<Icon className="h-4 w-4 shrink-0" style={{ color: type.color }} />}
                    collapsed={collapsed}
                    count={typeItemCounts[type.id]}
                  >
                    {type.name}s
                  </NavItem>
                );
              })}
            </>
          )}
        </div>

        {/* ── Collections ── */}
        <div className="px-2 pb-2">
          {collapsed ? (
            <SectionDivider />
          ) : (
            <SectionHeader label="Collections" open={openSections.collections} onToggle={() => toggle("collections")} />
          )}
          {(collapsed || openSections.collections) && (
            <>
              {favoriteCollections.map((col) => (
                <NavItem
                  key={col.id}
                  href={`/collections/${col.id}`}
                  icon={<Star className="h-4 w-4 shrink-0 fill-yellow-400 text-yellow-400" />}
                  collapsed={collapsed}
                  count={collectionItemCounts[col.id]}
                >
                  {col.name}
                </NavItem>
              ))}
              {otherCollections.map((col) => (
                <NavItem
                  key={col.id}
                  href={`/collections/${col.id}`}
                  icon={<Folder className="h-4 w-4 shrink-0 text-sidebar-foreground/40" />}
                  collapsed={collapsed}
                  count={collectionItemCounts[col.id]}
                >
                  {col.name}
                </NavItem>
              ))}
              {!collapsed && (
                <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-foreground">
                  <Plus className="h-4 w-4 shrink-0" />
                  New Collection
                </button>
              )}
            </>
          )}
        </div>

        {/* ── Recent ── */}
        <div className="px-2 pb-2">
          {collapsed ? (
            <SectionDivider />
          ) : (
            <SectionHeader label="Recent" open={openSections.recent} onToggle={() => toggle("recent")} />
          )}
          {(collapsed || openSections.recent) &&
            recentItems.map((item) => {
              const type = itemTypes.find((t) => t.id === item.itemTypeId);
              const Icon = type ? (ICON_MAP[type.icon] ?? File) : File;
              const color = type?.color;
              const count = type ? typeItemCounts[type.id] : undefined;
              return (
                <NavItem
                  key={item.id}
                  href={`/items/${item.id}`}
                  icon={<Icon className="h-4 w-4 shrink-0" style={color ? { color } : undefined} />}
                  collapsed={collapsed}
                  count={count}
                >
                  {item.title}
                </NavItem>
              );
            })}
        </div>

        <div className="flex-1" />

        {/* ── User area ── */}
        <div className={cn("flex items-center gap-2 border-t border-sidebar-border p-3", collapsed && "justify-center px-1")}>
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sidebar-primary">
            <User className="h-4 w-4 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && (
            <>
              <span className="flex-1 truncate text-sm text-sidebar-foreground">{currentUser.name}</span>
              <button className="text-sidebar-foreground/40 hover:text-sidebar-foreground" aria-label="Settings">
                <Settings className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}

function SectionHeader({ label, open, onToggle }: { label: string; open: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className="flex w-full items-center justify-between px-2 pb-1 pt-0.5">
      <span className="text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/40">{label}</span>
      <ChevronDown className={cn("h-3 w-3 text-sidebar-foreground/40 transition-transform duration-200", !open && "-rotate-90")} />
    </button>
  );
}

function SectionDivider() {
  return <div className="my-1 mx-2 border-t border-sidebar-border" />;
}

function NavItem({
  href, icon, children, collapsed, count,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  collapsed: boolean;
  count?: number;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        collapsed && "justify-center px-0",
      )}
    >
      {icon}
      {!collapsed && (
        <>
          <span className="flex-1 truncate">{children}</span>
          {count !== undefined && (
            <span className="ml-auto tabular-nums text-xs text-sidebar-foreground/40">{count}</span>
          )}
        </>
      )}
    </Link>
  );
}
