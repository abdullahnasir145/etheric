export const formatCurrency = (value: number | undefined | null): string => {
  if (typeof value !== "number") return "0.00";
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
  });
};
