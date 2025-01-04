export default function formatToCurrency(
  value: number,
  currency: string
): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currency,
  }).format(value);
}
