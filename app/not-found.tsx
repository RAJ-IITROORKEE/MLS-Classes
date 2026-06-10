import { StatusPage } from "@/components/status-page";

export default function NotFound() {
  return (
    <StatusPage
      variant="not-found"
      title="Page does not exist"
      description="The page you are looking for may have been moved, removed, or never existed. You can go back to the previous page or return home."
    />
  );
}
