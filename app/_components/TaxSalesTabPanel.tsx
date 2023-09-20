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
} from "@mui/material";
import TaxCard from "./TaxCard";

interface Product {
  productName?: string;
  productType?: "import" | "export" | "unknown";
  taxable?: boolean;
  piece?: number;
  price?: number;
}

interface TabPanelProps extends Product {
  children?: React.ReactNode;
  index: number;
  value: number;
}
export default function TaxSalesTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  const [shoppingBasket, setShoppingBasket] = React.useState<Product[]>([]);

  const INVENTORY_OPTIONS = [
    { id: "book", label: "Book" },
    { id: "chocolateBar", label: "Chocolate bar" },
    { id: "boxOfChocolates", label: "Box of Chocolates" },
    { id: "musicCD", label: "Music CD" },
    { id: "bottleOfPerfume", label: "Bottle of Perfume" },
    { id: "packetOfHeadache", label: "Packet of Headache" },
  ];

  const handleCalculate = () => {
    alert(shoppingBasket);
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          {/* <Typography>{children}</Typography> */}
          <Box display={"flex"}>
            <Autocomplete
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Products" />
              )}
              options={INVENTORY_OPTIONS}
            />
            <TextField id="productionPiece" type="number" placeholder="Piece" />
            <TextField id="productionPrice" type="number" placeholder="Price" />
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Production Type
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="export"
                name="productionType"
              >
                <FormControlLabel
                  value="export"
                  control={<Radio />}
                  label="Export"
                />
                <FormControlLabel
                  value="import"
                  control={<Radio />}
                  label="Import"
                />
              </RadioGroup>
            </FormControl>
            <>
              <Button onClick={handleCalculate}>Calculate</Button>
            </>
          </Box>

          <Divider />

          {shoppingBasket.length > 0 ? (
            shoppingBasket.map((x, i) => (
              <TaxCard
                key={i}
                index={i}
                productName={x.productName ?? ""}
                piece={x.piece ?? 0}
                price={x.price ?? 0}
                productType={x.productType ?? "unknown"}
                taxable={x.taxable ?? false}
              />
            ))
          ) : (
            <></>
          )}
        </Box>
      )}
    </div>
  );
}
