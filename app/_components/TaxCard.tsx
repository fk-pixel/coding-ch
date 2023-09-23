import React from "react";
import { format } from "date-fns";
import { Box, Typography } from "@mui/material";
import { Item, Product } from "./TaxSalesTabPanel";

export interface TaxCardProps {
  index: number;
  basket: Item[];
  salesTaxes: number;
  total: number;
  onChangeBasket: () => Item[][];
}

export default function TaxCard(props: TaxCardProps): JSX.Element {
  const { basket, salesTaxes, total, index, onChangeBasket } = props;

  const date = format(new Date(), "dd/MM/yyyy");

  // React.useEffect(() => {
  //   onChangeBasket();
  // }, []);

  //const salesTaxes: number = 0;

  //const total: number = 0;

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
          <ul>
            {basket.length > 0 &&
              basket.map((x: Item) => (
                <li>
                  {x.piece} {x.productName} ({(x.piece * x.price).toFixed(2)} $)
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
          <Typography sx={{ fontWeight: 550 }}>{salesTaxes}</Typography>
        </Box>

        {/* TOTAL */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ fontWeight: 550 }}>TOTAL</Typography>
          <Typography sx={{ fontWeight: 550 }}>{total}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
