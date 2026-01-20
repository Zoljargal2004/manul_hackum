export function ChildrenList({
  childrenNodes,
  onSelect,
}: {
  childrenNodes: { id: string }[];
  onSelect: (id: string) => void;
}) {
  if (!childrenNodes.length) {
    return (
      <p className="text-sm text-muted-foreground text-center">
        Хүүхэд элемент байхгүй
      </p>
    );
  }

  return (
    <div className="grid gap-2">
      {childrenNodes.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelect(c.id)}
          className="rounded-xl border px-3 py-2 text-left text-sm transition hover:bg-accent"
        >
          {c.id}
        </button>
      ))}
    </div>
  );
}
