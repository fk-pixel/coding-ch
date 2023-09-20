import React from "react";
import { format } from "date-fns";

export interface TaxCardProps {
  productName: string;
  piece: number;
  price: number;
  productType: "import" | "export" | "unknown";
  taxable: boolean;
  index: number;
}

export default function TaxCard(props: TaxCardProps): JSX.Element {
  const { productName, productType, taxable, piece, index } = props;

  const date = format(new Date(), "dd/MM/yyyy");

  const salesTaxes: number = 0;

  const total: number = 0;

  return (
    <>
      {/* ShoppingBasket */}
      <div>
        <p>Shopping basket {index}</p>
        <p>created at: {date}</p>
      </div>

      {/* Products */}
      <ul>
        <li>{productName}</li>
      </ul>

      {/* Sales Taxes */}
      <div>
        <p>Sales Taxes:</p>
        <p>{salesTaxes}</p>
      </div>

      {/* TOTAL */}
      <div>
        <p>Sales Taxes:</p>
        <p>{total}</p>
      </div>
    </>
  );
}
