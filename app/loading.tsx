export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-2 border-border" />
          <div
            className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary"
            style={{ animationDuration: "0.8s" }}
          />
        </div>
        <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
