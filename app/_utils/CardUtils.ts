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
