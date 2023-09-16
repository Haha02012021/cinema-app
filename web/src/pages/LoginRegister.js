import { Box, Container, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import CustomTabPanel from "../components/CustomTabPanel";
import LoginForm from "../partials/LoginRegister/LoginForm";
import RegisterForm from "../partials/LoginRegister/RegisterForm";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function LoginRegister() {
  const [currentTabValue, setCurrentTabValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setCurrentTabValue(newValue);
  };
  return (
    <Container>
      <Box
        sx={(theme) => ({
          maxWidth: "44%",
          mx: "auto",
          border: 1,
          borderColor: "divider",
          [theme.breakpoints.down("sm")]: {
            maxWidth: "98%",
          },
        })}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={currentTabValue}
            onChange={handleChangeTab}
            aria-label="basic tabs example"
            variant="fullWidth"
          >
            <Tab label="Đăng nhập" {...a11yProps(0)} sx={{ py: "1.25rem" }} />
            <Tab label="Đăng ký" {...a11yProps(1)} sx={{ py: "1.25rem" }} />
          </Tabs>
        </Box>
        <CustomTabPanel value={currentTabValue} index={0} innerPaddingY="1rem">
          <LoginForm />
        </CustomTabPanel>
        <CustomTabPanel value={currentTabValue} index={1} innerPaddingY="1rem">
          <RegisterForm
            setCurrentTabValue={(value) => setCurrentTabValue(value)}
          />
        </CustomTabPanel>
      </Box>
    </Container>
  );
}
