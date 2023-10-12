import { format } from "date-fns";

/**
 * It is used for date manipulations. Provides date format with time detail
 *
 * @param   date  As a date type
 * @returns A string.
 */
export function formatDate(date: Date): string {
  const formatedDate = format(date, "dd/MM/yyyy, HH:mm");

  return formatedDate;
}

/**
 * It gives the tax amount and the final price of the sale, depending on whether a product is a taxable product.
 * In the calculation, the decimal part is rounded according to the percentile.
 *
 * @param   salesType  The sales type according to export or import as string
 * @param   taxable  Indicates whether a product is taxable or not
 * @param   price  The sales price information
 * @returns an calculated object for price and saleTax.
 */
export function getCalculatedPrice(
  salesType: string,
  taxable: boolean,
  price: number
): { newPrice: number; saleTax: number } {
  const calculatedPrice = taxable
    ? salesType === "import"
      ? setIntegerArgument(price + (price * 10) / 100 + (price * 5) / 100)
      : setIntegerArgument(price + (price * 10) / 100)
    : salesType === "import"
    ? setIntegerArgument(price + (price * 5) / 100)
    : price;

  const roundedPrice = calculatedPrice.toFixed(2);
  const newPrice = Number(roundedPrice);

  const roundedSaleTax = (newPrice - price).toFixed(2);
  const saleTax = Number(roundedSaleTax);

  return { newPrice, saleTax };
}

function setIntegerArgument(price: number) {
  const factor = Math.pow(10, decimalPlaces(price));

  const remainder = ((price * factor) % (0.05 * factor)) / factor;

  const result =
    remainder < 0.026
      ? Math.ceil(price * 20) / 20
      : Math.ceil(price * 100) / 100;

  return result;
}

function decimalPlaces(n: number) {
  const s = "" + +n;

  const match = /(?:\.(\d+))?(?:[eE]([+\-]?\d+))?$/.exec(s);

  if (!match) {
    return 0;
  }

  return Math.max(
    0,
    (match[1] == "0" ? 0 : (match[1] || "").length) - (Number(match[2]) || 0)
  );
}
