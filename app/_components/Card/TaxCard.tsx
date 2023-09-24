import React from "react";
import { format } from "date-fns";
import { Box, Typography } from "@mui/material";
import { Sale } from "../TabPanel/TaxSalesTabPanel";
import { getCalculatedPrice } from "../../_utils/CardUtil";

export interface TaxCardProps {
  index: number;
  basket: Sale[];
}

export default function TaxCard(props: TaxCardProps): JSX.Element {
  const { basket, index } = props;

  const date = format(new Date(), "dd/MM/yyyy");

  const salesTaxes: number = basket
    .map((x) => getCalculatedPrice(x.salesType, x.taxable, x.price).saleTax)
    .reduce((acc, val) => acc + val, 0);

  const total: number = basket
    .map(
      (x) =>
        getCalculatedPrice(x.salesType, x.taxable, x.price).roundedPrice *
        x.piece
    )
    .reduce((acc, val) => acc + val, 0);

  return (
    /* Main Card */
    <Box
      sx={{
        marginTop: 5,
        width: "100%",
        borderRadius: 4,
        boxShadow: "0 4px 20px 0 rgba(0, 0, 0,.14)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          paddingBottom: 6,
        }}
      >
        {/* ShoppingBasket */}
        <Box
          display={"block"}
          sx={{
            marginRight: 4,
            padding: 1,
            borderRight: "1px solid #dddd",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>Shopping basket {index + 1}</Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 50, color: "gray" }}>
            created at: {date}
          </Typography>
        </Box>

        {/* Products */}
        <Box sx={{ display: "block", padding: 1, fontSize: 12 }}>
          <ul key={`${index + 1}-basket-list`}>
            {basket.length > 0 &&
              basket.map((x: Sale, i: number) => (
                <li key={i}>
                  {x.piece} {x.productName} (
                  {x.piece *
                    getCalculatedPrice(x.salesType, x.taxable, x.price)
                      .roundedPrice}{" "}
                  $)
                </li>
              ))}
          </ul>
        </Box>
      </Box>

      {/* Card Footer */}
      <Box
        sx={{
          backgroundColor: "coral",
          color: "white",
          display: "block",
          padding: 1,
          borderTop: "1px solid #dddd",
          borderBottomRightRadius: 4,
          borderBottomLeftRadius: 4,
        }}
      >
        {/* Sales Taxes */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontWeight: 550 }}>Sales Taxes</Typography>
          <Typography sx={{ fontWeight: 550 }}>
            {salesTaxes.toFixed(2)} $
          </Typography>
        </Box>

        {/* TOTAL */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ fontWeight: 550 }}>TOTAL</Typography>
          <Typography sx={{ fontWeight: 550 }}>{total.toFixed(2)} $</Typography>
        </Box>
      </Box>
    </Box>
  );
}
