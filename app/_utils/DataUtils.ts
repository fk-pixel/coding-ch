export function getNamedSalesType(salesType: string): string {
  return salesType === "import" ? "imported " : "";
}

export function getNamedPrice(price: number): string {
  return ` at ${price}`;
}
