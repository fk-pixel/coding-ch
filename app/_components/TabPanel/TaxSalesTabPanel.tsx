import * as React from "react";
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

import productData from "../../data/products.json";
import TaxCard from "../Card/TaxCard";
import { getNamedPrice, getNamedSalesType } from "../../_utils/DataUtil";
import Error from "next/error";
import { AutocompleteOption } from "../../_common/Types";

export interface Product {
  id: number;
  productName: string;
  taxable: boolean;
  price: number;
  salesType: string;
}

export interface Sale extends Product {
  piece: number;
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
  const [baskets, setBaskets] = React.useState<Sale[][]>([]);
  const [sale, setSale] = React.useState<Sale>({
    id: 0,
    productName: "",
    taxable: false,
    salesType: "",
    price: 0,
    piece: 0,
  });

  const handleAdd = () => {
    if (addToOther) {
      setBaskets((prev) => [...prev, [sale]]);
    }

    if (!addToOther) {
      if (baskets.length === 0) {
        setBaskets(() => [[sale]]);
      } else {
        const currentBasketIndex = baskets.length - 1;

        const currentBasket = baskets[currentBasketIndex];

        currentBasket.push(sale);

        setBaskets((prev) => [...prev]);
      }
    }
  };

  const handleChange = (value: AutocompleteOption) => {
    const product = productData.find((x) => x.id === value.id);

    if (!product) throw Error;

    if (value) {
      setSale((prev) => ({
        ...prev,
        id: product.id,
        productName: product.productName,
        taxable: product.taxable,
        price: product.price,
        salesType: product.salesType,
      }));
    }
  };

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
                  setSale({
                    ...sale,
                    piece: Number(e.target.value),
                  });
                }}
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
                disabled={!sale.productName || sale.piece === 0}
                onClick={() => handleAdd()}
              >
                Add To Cart
              </Button>
            </Box>
          </Box>

          <Divider />

          {baskets.length > 0 &&
            baskets.flatMap((basket, index) => (
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
