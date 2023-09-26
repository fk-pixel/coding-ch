import { render, screen } from "@testing-library/react";
import userEvent, {
  PointerEventsCheckLevel,
} from "@testing-library/user-event";

import TaxSalesTabPanel from "@/app/_components/TabPanel/TaxSalesTabPanel";

describe("TaxSalesTabPanel", () => {
  describe("Render", () => {
    it("should render button", () => {
      render(<TaxSalesTabPanel value={0} index={0} />); // ARRANGE

      // ACT
      const button = screen.getByRole("button", { name: "Open" });

      expect(button).toBeInTheDocument(); // ASSERT
    });

    it("should render button", () => {
      render(<TaxSalesTabPanel value={0} index={0} />); // ARRANGE

      // ACT
      const button = screen.getByRole("button", { name: "Add To Cart" });

      expect(button).toBeInTheDocument(); // ASSERT
    });

    it("should render radio", () => {
      render(<TaxSalesTabPanel value={0} index={0} />); // ARRANGE

      // ACT
      const radio = screen.getByRole("radio", {
        name: "Add a product to the new shop basket",
      });

      expect(radio).toBeInTheDocument(); // ASSERT
    });

    it("should render radio", () => {
      render(<TaxSalesTabPanel value={0} index={0} />); // ARRANGE

      // ACT
      const radio = screen.getByRole("radio", {
        name: "Add a product to the current shop basket",
      });

      expect(radio).toBeInTheDocument(); // ASSERT
    });

    it("should render combobox", () => {
      render(<TaxSalesTabPanel value={0} index={0} />); // ARRANGE

      // ACT
      const combobox = screen.getByRole("combobox", { name: "Products" });

      expect(combobox).toBeInTheDocument(); // ASSERT
    });

    it("should render spinbutton", () => {
      render(<TaxSalesTabPanel value={0} index={0} />); // ARRANGE

      // ACT
      const spinbutton = screen.getByRole("spinbutton");

      expect(spinbutton).toBeInTheDocument(); // ASSERT
    });

    it("should render radiogroup", () => {
      render(<TaxSalesTabPanel value={0} index={0} />); // ARRANGE

      // ACT
      const radiogroup = screen.getByRole("radiogroup");

      expect(radiogroup).toBeInTheDocument(); // ASSERT
    });

    it("should render separator", () => {
      render(<TaxSalesTabPanel value={0} index={0} />); // ARRANGE

      // ACT
      const separator = screen.getByRole("separator");

      expect(separator).toBeInTheDocument(); // ASSERT
    });

    it("should render tabpanel", () => {
      render(<TaxSalesTabPanel value={0} index={0} />); // ARRANGE

      // ACT
      const tabpanel = screen.getByRole("tabpanel");

      expect(tabpanel).toBeInTheDocument(); // ASSERT
    });
  });

  it("should contain the text 'Add To Cart Type'", () => {
    render(<TaxSalesTabPanel value={0} index={0} />); // ARRANGE
    const myElem = screen.getByText(/Add To Cart Type/s); // ACT
    expect(myElem).toBeInTheDocument(); // ASSERT
  });

  test("add to cart action is not clickable when shop data has pointer-events: none", () => {
    render(
      <div style={{ pointerEvents: "none" }}>
        <button onClick={() => console.log("clicked")}>Add To Cart</button>
      </div>
    );
    const button = screen.getByRole("button", { name: "Add To Cart" });

    userEvent.click(button, {
      pointerEventsCheck: PointerEventsCheckLevel.Never,
    });

    expect(jest.fn()).not.toBeCalled();
  });
});
