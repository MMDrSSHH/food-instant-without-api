const currencyFormatter = Intl.NumberFormat("en-US");

export function formatCurrency(value) {
  return currencyFormatter.format(value);
}
