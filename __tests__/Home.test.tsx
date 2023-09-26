import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  describe("Render", () => {
    it("should render main", () => {
      render(<Home />); // ARRANGE

      // ACT
      const main = screen.getByRole("main");

      expect(main).toBeInTheDocument(); // ASSERT
    });

    it("should render tablist", () => {
      render(<Home />); // ARRANGE

      // ACT
      const tablist = screen.getByRole("tablist", {
        name: "basic tabs example",
      });

      expect(tablist).toBeInTheDocument(); // ASSERT
    });

    it("should render tab", () => {
      render(<Home />); // ARRANGE

      // ACT
      const tab = screen.getByRole("tab", {
        name: "Sales Taxes",
      });

      expect(tab).toBeInTheDocument(); // ASSERT
    });

    it("should render tabpanel", () => {
      render(<Home />); // ARRANGE

      // ACT
      const tabpanel = screen.getByRole("tabpanel", {
        name: "Sales Taxes",
      });

      expect(tabpanel).toBeInTheDocument(); // ASSERT
    });
  });

  it("should contain the text 'Sales'", () => {
    render(<Home />); // ARRANGE
    const myElem = screen.getByText(/Sales/s); // ACT
    expect(myElem).toBeInTheDocument(); // ASSERT
  });
});
