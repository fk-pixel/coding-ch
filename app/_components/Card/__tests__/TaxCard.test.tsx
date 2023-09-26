import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

const mockSetBasket = jest.fn();

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
