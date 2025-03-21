import { RiskLevel } from "@/lib/bet-types";

interface BetDetailsGridProps {
  ev?: string | number;
  confidence?: number;
  units?: number;
  riskScore?: RiskLevel;
}

export function BetDetailsGrid({
  ev,
  confidence,
  units,
  riskScore
}: BetDetailsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 mb-4">
      <div className="p-4 bg-muted/50 rounded-lg">
        <div className="text-muted-foreground mb-1">EV</div>
        <div className="font-medium">{ev || "N/A"}</div>
      </div>
      <div className="p-4 bg-muted/50 rounded-lg">
        <div className="text-muted-foreground mb-1">Confidence</div>
        <div className="font-medium">{confidence ? `${confidence}/10` : "N/A"}</div>
      </div>
      <div className="p-4 bg-muted/50 rounded-lg">
        <div className="text-muted-foreground mb-1">Units</div>
        <div className="font-medium">{units || "N/A"}</div>
      </div>
      <div className="p-4 bg-muted/50 rounded-lg">
        <div className="text-muted-foreground mb-1">Risk Score</div>
        <div className="font-medium">{riskScore || "N/A"}</div>
      </div>
    </div>
  );
}
