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

export interface Item extends Product {
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

  //const basket: Map<string, Item> = new Map<string, Item>();
  // const baskets: Map<string, Basket> = new Map<string, Basket>();
  const [addToOther, setAddToOther] = React.useState<boolean>(false);
  const [baskets, setBaskets] = React.useState<Item[][]>([]);
  const [item, setItem] = React.useState<Item>({
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
  React.useEffect(() => {
    if (baskets.length > 0) {
      baskets;
    }
  }, []);

  // setShoppingBasket()
  // setMyState(...myState, {...[e.target.name]: e.target.value})

  //   () =>
  // ({
  //   ...myState,
  //   [e.target.name]: e.target.value
  // })

  // const onChangeB = (val) => {
  //   setBasket;
  // };

  const handleAdd = () => {
    // if (baskets.length < 1) {
    //   setBaskets(Array(1).fill([]));
    // }

    if (addToOther) {
      setBaskets((prev) => [...prev, [item]]);
    }

    if (!addToOther) {
      // setBaskets({ ...baskets, ...item });

      if (baskets.length === 0) {
        setBaskets(() => [[item]]);
      } else {
        const currentBasketIndex = baskets.length - 1;

        const currentBasket = baskets[
          currentBasketIndex
        ] as unknown as Array<object>;

        if (currentBasket?.length > 0) {
          currentBasket.push(item);
        }
        // onChangeBasket();
      }
    }
  };

  // function onChangeBasket(baskets) {
  //   return baskets;
  // }

  // const salesTaxes = baskets.flatMap((basket) =>
  //   basket.map((x) => {
  //     x.taxable && x.productSalesType === "import"
  //       ? x.piece * ((x.price * 10) / 100 + (x.price * 5) / 100)
  //       : x.taxable !== false && x.productSalesType === "import"
  //       ? x.piece * ((x.price * 5) / 100)
  //       : 0;
  //   })
  // );

  // const total = shoppingBasket.reduce((acc, val) => {
  //   acc.piece * acc.price + val.piece * val.price;
  // });

  const handleChange = (value: AutocompleteOption) => {
    const product = productData.find((x) => x.id === value.id);

    if (!product) throw Error;

    setItem((prev) => ({
      ...prev,
      id: product.id,
      productName: product.productName,
      taxable: product.taxable,
      price: product.price,
      salesType: product.salesType,
    }));
  };

  // React.useEffect(() => {
  //   onChangeBasket(baskets);
  // }, []);

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
                  setItem({
                    ...item,
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
              <Button variant="contained" onClick={() => handleAdd()}>
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
                salesTaxes={0}
                total={0}
                // onChangeBasket={onChangeBasket(basket)}
              />
            ))}
        </Box>
      )}
    </div>
  );
}
