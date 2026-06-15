const adminDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "numeric",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function formatAdminDate(value: Date | string) {
  return adminDateFormatter.format(new Date(value));
}
