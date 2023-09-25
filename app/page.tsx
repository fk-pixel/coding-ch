"use client";

import React from "react";
import styles from "./page.module.css";
import { Box, Tabs, Tab } from "@mui/material";

import TaxSalesTabPanel from "./_components/TabPanel/TaxSalesTabPanel";

export default function Home() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  return (
    <main className={styles.main}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", marginBottom: 6 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Sales Taxes" {...a11yProps(0)} />
          {/* <Tab label="Conference Track Management" {...a11yProps(1)} /> */}
          {/* <Tab label="Merchant's Guide To The Galaxy" {...a11yProps(2)} /> */}
        </Tabs>
      </Box>
      <>
        <TaxSalesTabPanel value={value} index={0}></TaxSalesTabPanel>
        {/* <ConferenceManagementTabPanel value={value} index={1}>
          Conference Track Management
        </ConferenceManagementTabPanel> */}
        {/* <CustomTabPanel value={value} index={2}>
          Merchant's Guide To The Galaxy
        </CustomTabPanel> */}
      </>
    </main>
  );
}
