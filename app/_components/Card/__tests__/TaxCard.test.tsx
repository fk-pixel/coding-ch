import { render, screen } from "@testing-library/react";

import { formatDate, getCalculatedPrice } from "@/app/_utils/CardUtil";
import TaxCard from "@/app/_components/Card/TaxCard";

const mockBasket = [
  {
    id: 0,
    productName: "Book",
    taxable: false,
    price: 10.99,
    salesType: "export",
    date: new Date(),
    piece: 1,
  },
];

describe("TaxCard", () => {
  describe("Render", () => {
    it("should render products in a list", () => {
      render(<TaxCard basket={mockBasket} index={0} />); // ARRANGE

      // ACT
      const ul = screen.getByRole("list");

      expect(ul).toBeInTheDocument(); // ASSERT
    });

    it("should render products in a list item", () => {
      render(<TaxCard basket={mockBasket} index={0} />); // ARRANGE

      // ACT
      const li = screen.getByRole("listitem");

      expect(li).toBeInTheDocument(); // ASSERT
    });
  });

  describe("Functions in CardUtil", () => {
    it("price should have transformed by calculate with 0,05 rounded and by return sales taxes", () => {
      expect(getCalculatedPrice("import", true, 47.5)).toStrictEqual({
        newPrice: 54.65,
        saleTax: 7.15,
      });
    });

    it("formated date must be separated according to day, month, year and hours", () => {
      expect(formatDate(new Date("Thu Oct 12 2023 14:57:34"))).toBe(
        "12/10/2023, 14:57"
      );
    });
  });

  it("should contain the text 'Shopping Basket'", () => {
    render(<TaxCard basket={[]} index={0} />); // ARRANGE
    const myElem = screen.getByText(/Shopping Basket/s); // ACT
    expect(myElem).toBeInTheDocument(); // ASSERT
  });

  it("should contain the text 'Sales Taxes'", () => {
    render(<TaxCard basket={[]} index={0} />); // ARRANGE
    const myElem = screen.getByText(/Sales Taxes/s); // ACT
    expect(myElem).toBeInTheDocument(); // ASSERT
  });

  it("should contain the text 'TOTAL'", () => {
    render(<TaxCard basket={[]} index={0} />); // ARRANGE
    const myElem = screen.getByText(/TOTAL/s); // ACT
    expect(myElem).toBeInTheDocument(); // ASSERT
  });
});
