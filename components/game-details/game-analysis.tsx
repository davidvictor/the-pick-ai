import { MarkdownRenderer } from "@/components/ui/markdown-renderer";

interface GameAnalysisProps {
  content: string;
}

export function GameAnalysis({ content }: GameAnalysisProps) {
  if (!content) {
    return (
      <div className="bg-background rounded-lg border p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold mb-4">Game Analysis</h2>
        <div className="text-muted-foreground">No analysis available for this game.</div>
      </div>
    );
  }
  
  return (
    <div className="">
      <h2 className="text-lg md:text-xl font-semibold mb-4">Game Analysis</h2>
      <div className="bg-background rounded-lg border p-4 md:p-6">
        <MarkdownRenderer 
          content={content} 
          tableClassName="table-highlight-row" // Apply custom table styling
          className="text-base"
        />
      </div>
    </div>
  );
}
