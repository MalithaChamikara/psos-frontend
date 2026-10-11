const money = new Intl.NumberFormat("en-LK", {
  style: "currency",
  currency: "LKR",
});

export const formatMoney = (value: number): string => money.format(value);

export function formatDate(value: string): string {
  const utc = value.endsWith("Z") ? value : `${value}Z`;
  return new Date(utc).toLocaleString();
}