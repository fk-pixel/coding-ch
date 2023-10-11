import * as React from "react";
import Error from "next/error";
import {
  Box,
  TextField,
  Autocomplete,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Button,
  Tooltip,
} from "@mui/material";

import { AutocompleteOption } from "../../_common/Types";
import { getNamedPrice, getNamedSalesType } from "../../_utils/DataUtil";
import TaxCard from "../Card/TaxCard";
import productData from "../../data/products.json";

export interface Product {
  id: number;
  productName: string;
  taxable: boolean;
  price: number;
  salesType: string;
}

export interface Shopping extends Product {
  piece: number;
  date: Date;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const PRODUCT_OPTIONS = productData.map((x) => ({
  id: x.id,
  label:
    getNamedSalesType(x.salesType) + x.productName + getNamedPrice(x.price),
}));

export default function TaxSalesTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  const [addToOther, setAddToOther] = React.useState<boolean>(false);
  const [baskets, setBaskets] = React.useState<Shopping[][]>([]);
  const [shopping, setShopping] = React.useState<Shopping>({
    id: 0,
    productName: "",
    taxable: false,
    salesType: "",
    price: 0,
    piece: 0,
    date: new Date(),
  });

  const handleAdd = () => {
    if (addToOther) {
      setBaskets((prev) => [...prev, [{ ...shopping, date: new Date() }]]);
      setAddToOther(false);
    }

    if (!addToOther) {
      if (baskets.length === 0) {
        setBaskets(() => [[{ ...shopping, date: new Date() }]]);
      } else {
        const currentBasketIndex = baskets.length - 1;

        const currentBasket = baskets[currentBasketIndex];

        currentBasket.push({ ...shopping, date: new Date() });

        setBaskets((prev) => [...prev]);
      }
    }
  };

  const handleChange = (value: AutocompleteOption) => {
    const product = productData.find((x) => x.id === value.id);

    if (!product) throw Error;

    if (value) {
      setShopping((prev) => ({
        ...prev,
        id: product.id,
        productName: product.productName,
        taxable: product.taxable,
        price: product.price,
        salesType: product.salesType,
        date: new Date(),
      }));
    }
  };

  const error = shopping.piece < 0;

  return (
    <div
      key={0}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Box display={"block"} width={550}>
            <Box>
              <FormControl sx={{ marginBottom: 3 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Add To Cart Type
                </FormLabel>
                <RadioGroup
                  key={"addToCartType"}
                  name="addToCartType"
                  onChange={() => setAddToOther(!addToOther)}
                  row
                  defaultValue="current"
                  value={addToOther ? "addOther" : "current"}
                >
                  <Tooltip title="Add a product to the new shop basket">
                    <FormControlLabel
                      key={"addOther"}
                      value="addOther"
                      control={<Radio />}
                      label="Add Other"
                    />
                  </Tooltip>
                  <Tooltip title="Add a product to the current shop basket">
                    <FormControlLabel
                      key={"current"}
                      value="current"
                      control={<Radio />}
                      label="Current"
                    />
                  </Tooltip>
                </RadioGroup>
              </FormControl>
            </Box>

            <Box sx={{ display: "flex" }}>
              <Autocomplete
                id="productName"
                key={"productName"}
                fullWidth
                options={PRODUCT_OPTIONS}
                disableClearable
                onChange={(_, v) => (v !== null ? handleChange(v) : null)}
                getOptionLabel={(o) => o.label || ""}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    id="productName"
                    name="productName"
                    label="Products"
                  />
                )}
              />
              <TextField
                id="piece"
                key={"piece"}
                name="piece"
                onChange={(e) => {
                  setShopping({
                    ...shopping,
                    piece: Number(e.target.value),
                  });
                }}
                error={error}
                helperText={error ? "Piece cannot be less than zero" : ""}
                type="number"
                placeholder="Piece"
              />
            </Box>

            <Box
              sx={{
                marginTop: 6,
                marginBottom: 3,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                key={"addToCart"}
                variant="contained"
                disabled={!shopping.productName || shopping.piece < 1}
                onClick={() => handleAdd()}
              >
                Add To Cart
              </Button>
            </Box>
          </Box>

          <Divider />

          {baskets.length > 0 &&
            baskets.map((basket, index) => (
              <TaxCard
                key={`${index}-tax-card`}
                index={index}
                basket={basket}
              />
            ))}
        </Box>
      )}
    </div>
  );
}
