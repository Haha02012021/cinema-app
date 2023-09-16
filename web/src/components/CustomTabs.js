import { Box, Tab, Tabs } from "@mui/material";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function CustomTabs({ onChange, value, tabs }) {
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={value}
        onChange={onChange}
        aria-label="basic tabs example"
        indicatorColor="secondary"
      >
        {tabs.map((tab) => {
          return (
            <Tab key={tab.index} label={tab.label} {...a11yProps(tab.index)} />
          );
        })}
      </Tabs>
    </Box>
  );
}
