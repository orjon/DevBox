import Link from "next/link";
import { Star } from "lucide-react";

interface ItemType {
  id: string;
  name: string;
  color: string;
}

interface Collection {
  id: string;
  name: string;
  description: string;
  isFavorite: boolean;
  itemIds: string[];
}

interface CollectionCardProps {
  collection: Collection;
  itemTypes: ItemType[];
  itemTypeBreakdown: { typeId: string; count: number }[];
}

export function CollectionCard({ collection, itemTypes, itemTypeBreakdown }: CollectionCardProps) {
  return (
    <Link
      href={`/collections/${collection.id}`}
      className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4 hover:border-border/80 hover:bg-card/80 transition-colors"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-medium text-sm text-foreground leading-tight">{collection.name}</span>
        {collection.isFavorite && (
          <Star className="h-4 w-4 shrink-0 fill-yellow-400 text-yellow-400" />
        )}
      </div>

      <p className="text-xs text-muted-foreground line-clamp-2 flex-1">{collection.description}</p>

      <div className="flex items-center justify-between mt-auto pt-1">
        <div className="flex flex-wrap gap-1">
          {itemTypeBreakdown.map(({ typeId, count }) => {
            const type = itemTypes.find((t) => t.id === typeId);
            if (!type) return null;
            return (
              <span
                key={typeId}
                className="inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium"
                style={{ backgroundColor: `${type.color}22`, color: type.color }}
              >
                {type.name} {count}
              </span>
            );
          })}
        </div>
        <span className="text-xs text-muted-foreground shrink-0">
          {collection.itemIds.length} {collection.itemIds.length === 1 ? "item" : "items"}
        </span>
      </div>
    </Link>
  );
}
