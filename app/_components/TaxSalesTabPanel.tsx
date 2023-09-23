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

import productData from "../data/products.json";
import TaxCard from "./TaxCard";
import { getNamedPrice, getNamedSalesType } from "../_utils/DataUtils";
import Error from "next/error";
import { AutocompleteOption } from "../_common/Types";

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

  // const handleChange = (e: { target: { name: any; value: any } }) => {
  //   if (typeof e.target.value !== "object") {
  //     setProduct((prev) => ({
  //       ...prev,
  //       [e.target.name]: e.target.value,
  //     }));
  //   }
  // };

  // React.useEffect(() => {
  //   if (baskets.length > 0) {
  //     baskets;
  //   }
  // }, []);

  // const onChangeB = (val) => {
  //   setBasket;
  // };

  const handleAdd = () => {
    if (addToOther) {
      setBaskets((prev) => [...prev, [sale]]);
    }

    if (!addToOther) {
      if (baskets.length === 0) {
        setBaskets(() => [[sale]]);
      } else {
        const currentBasketIndex = baskets.length - 1;

        const currentBasket = baskets[
          currentBasketIndex
        ] as unknown as Array<object>;

        if (currentBasket?.length > 0) {
          currentBasket.push(sale);
        }
        //onChangeBasket();
      }
    }
  };

  console.log(sale);
  // function onChangeBasket(baskets) {
  //   return baskets;
  // }

  const handleChange = (value: AutocompleteOption) => {
    const product = productData.find((x) => x.id === value.id);

    if (!product) throw Error;

    setSale((prev) => ({
      ...prev,
      id: product.id,
      productName: product.productName,
      taxable: product.taxable,
      price: product.price,
      salesType: product.salesType,
    }));
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
                  onChange={() => setAddToOther(!addToOther)}
                  row
                  defaultValue="current"
                  name="addToCartType"
                >
                  <Tooltip title="Add a product to the new shop basket">
                    <FormControlLabel
                      key={1}
                      value="addOther"
                      control={<Radio />}
                      label="Add Other"
                    />
                  </Tooltip>
                  <Tooltip title="Add a product to the current shop basket">
                    <FormControlLabel
                      key={2}
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
                key={3}
                fullWidth
                options={PRODUCT_OPTIONS}
                onChange={(_, v) => (v !== null ? handleChange(v) : null)}
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
                key={4}
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
                key={index}
                index={index}
                basket={basket}
                // onChangeBasket={onChangeBasket}
              />
            ))}
        </Box>
      )}
    </div>
  );
}
