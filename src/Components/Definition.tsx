interface DefinitionProps {
  def: string;
  isLoading?: boolean;
  error?: string | null;
}

export default function Definition({ def, isLoading = false, error }: DefinitionProps) {
  if (error) {
    return (
      <div className="p-2 mt-4 w-full border-solid border-2 border-red-600 rounded bg-red-900/20">
        <p className="text-sm text-red-400">Error: {error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-2 mt-4 w-full border-solid border-2 border-slate-600 rounded">
        <p className="text-sm text-slate-400">Loading definition...</p>
      </div>
    );
  }

  return (
    <div className="p-4 mt-4 w-full border-solid border-2 border-slate-600 rounded bg-slate-700/30">
      <p className="text-sm text-slate-200 leading-relaxed">
        {def || "Search for an abbreviation to see its definition."}
      </p>
    </div>
  );
}

