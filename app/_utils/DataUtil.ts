export function getNamedSalesType(salesType: string): string {
  return salesType === "import" ? "imported " : "";
}

export function getNamedPrice(price: number): string {
  return ` at ${price}`;
}

export function getEventSubData(eventData: string): {
  eventName: string;
  duration: string;
} {
  const digitRegex = /[0-9]/;

  const foundDigit = eventData.match(digitRegex);

  const indexDigit = eventData.indexOf(foundDigit);

  const eventName = eventData.slice(0, indexDigit).trim();

  const stringDuration = eventData.slice(indexDigit);

  const foundMin = stringDuration.match("min");

  const indexMin = stringDuration.indexOf(foundMin);

  const duration = stringDuration.slice(0, indexMin);

  return { eventName, duration };
}
