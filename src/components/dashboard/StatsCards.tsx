import { Layers, Folder, Star, Heart } from "lucide-react";

interface Stat {
  label: string;
  value: number;
  icon: React.ReactNode;
}

export function StatsCards({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 xl:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-lg border border-border bg-card p-4 flex items-center gap-3">
          <div className="text-muted-foreground">{stat.icon}</div>
          <div>
            <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function buildStats(
  itemCount: number,
  collectionCount: number,
  favoriteItemCount: number,
  favoriteCollectionCount: number,
): Stat[] {
  return [
    { label: "Items", value: itemCount, icon: <Layers className="h-5 w-5" /> },
    { label: "Collections", value: collectionCount, icon: <Folder className="h-5 w-5" /> },
    { label: "Favourite Items", value: favoriteItemCount, icon: <Heart className="h-5 w-5" /> },
    { label: "Favourite Collections", value: favoriteCollectionCount, icon: <Star className="h-5 w-5" /> },
  ];
}
