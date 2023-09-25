import { format } from "date-fns";

/**
 * It is used for date manipulations. Provides date format with time detail
 *
 * @param   date  As a date type
 * @returns A string.
 */
export function formatDate(date: Date): string {
  const formatedDate = format(date, "dd/MM/yyyy,  HH:mm");

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
): { roundedPrice: number; saleTax: number } {
  const newPrice = taxable
    ? salesType === "import"
      ? setIntegerArgument(price + (price * 10) / 100 + (price * 5) / 100)
      : setIntegerArgument(price + (price * 10) / 100)
    : salesType === "import"
    ? setIntegerArgument(price + (price * 5) / 100)
    : price;

  const roundedNewPrice = newPrice.toFixed(2);

  const roundedPrice = Number(roundedNewPrice);

  const saleTax = Number(roundedNewPrice) - price;

  return { roundedPrice, saleTax };
}

function setIntegerArgument(price: number) {
  return Math.ceil(price * 20 - 0.05) / 20;
}
