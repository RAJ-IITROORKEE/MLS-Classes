import { Construction } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ComingSoonPageProps {
  title: string;
  description?: string;
  icon?: React.ElementType;
}

export function ComingSoonPage({
  title,
  description,
  icon: Icon = Construction,
}: ComingSoonPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>

      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 py-24 px-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-5">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <Badge variant="secondary" className="mb-3">
          Coming Soon
        </Badge>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-sm">
          This section is currently under development and will be available soon.
        </p>
      </div>
    </div>
  );
}
