/**
 * It integrates a sales type into the new data as 'imported' if it is 'import'.
 *
 * @param   salesType  The sales type according to export or import as string
 * @returns A string.
 */
export function getNamedSalesType(salesType: string): string {
  return salesType === "import" ? "imported " : "";
}

/**
 * It manipulates the sales price with 'at' in options
 *
 * @param   price  The sales price as string.
 * @returns A string.
 */
export function getNamedPrice(price: number): string {
  return ` at ${price}`;
}
