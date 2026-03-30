"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function TopBar() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background px-4">
      <span className="text-sm font-semibold text-foreground">DevBox</span>
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search items..." className="pl-9 bg-muted border-0" />
      </div>
      <div className="ml-auto">
        <Button size="sm">+ New Item</Button>
      </div>
    </header>
  );
}
