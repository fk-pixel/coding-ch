import React from "react";
import { Box, Typography } from "@mui/material";

import { Shopping } from "../TabPanel/TaxSalesTabPanel";
import { formatDate, getCalculatedPrice } from "../../_utils/CardUtil";

export interface TaxCardProps {
  index: number;
  basket: Shopping[];
}

const TaxCardStyle = {
  mainBox: {
    marginTop: 5,
    width: "100%",
    borderRadius: 4,
    boxShadow: "0 4px 20px 0 rgba(0, 0, 0,.14)",
  },
  cardContent: {
    display: "flex",
    paddingBottom: 6,
  },
  shoppingBasket: {
    marginRight: 4,
    padding: 1,
    borderRight: "1px solid #dddd",
    borderRadius: 3,
  },
  shoppingBasketText: {
    fontSize: 28,
    display: "flex",
    justifyContent: "center",
    backgroundColor: "floralwhite",
  },
  products: {
    display: "block",
    padding: 1,
    fontSize: 12,
  },
  cardFooter: {
    backgroundColor: "coral",
    color: "white",
    display: "block",
    padding: 1,
    borderTop: "1px solid #dddd",
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
  },
  cardFooterBox: {
    display: "flex",
    justifyContent: "space-between",
  },
  cardFooterText: {
    fontWeight: 550,
  },
  cardFooterDate: {
    fontSize: 12,
    display: "flex",
    justifyContent: "flex-end",
  },
};

export default function TaxCard(props: TaxCardProps): JSX.Element {
  const { basket, index } = props;

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
    <Box sx={TaxCardStyle.mainBox}>
      {/* Card Content */}
      <Box sx={TaxCardStyle.cardContent}>
        {/* Shopping Basket */}
        <Box display={"block"} sx={TaxCardStyle.shoppingBasket}>
          <Typography>Shopping Basket </Typography>
          <Typography sx={TaxCardStyle.shoppingBasketText}>
            {" "}
            {index + 1}
          </Typography>
        </Box>
        {/* Products */}
        <Box sx={TaxCardStyle.products}>
          <ul key={`${index + 1}-basket-list`}>
            {basket.length > 0 &&
              basket.map((x: Shopping, i: number) => (
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
      <Box sx={TaxCardStyle.cardFooter}>
        {/* Sales Taxes */}
        <Box sx={TaxCardStyle.cardFooterBox}>
          <Typography sx={TaxCardStyle.cardFooterText}>Sales Taxes</Typography>
          <Typography sx={TaxCardStyle.cardFooterText}>
            {salesTaxes.toFixed(2)} $
          </Typography>
        </Box>
        {/* TOTAL */}
        <Box sx={TaxCardStyle.cardFooterBox}>
          <Typography sx={TaxCardStyle.cardFooterText}>TOTAL</Typography>
          <Typography sx={TaxCardStyle.cardFooterText}>
            {total.toFixed(2)} $
          </Typography>
        </Box>
        {basket.map((x: Shopping, i: number) => (
          <Typography key={i} sx={TaxCardStyle.cardFooterDate}>
            {i === 0
              ? "created at: "
              : i === basket.length - 1
              ? "updated at: "
              : ""}
            {i === 0 || i === basket.length - 1 ? formatDate(x.date) : ""}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
