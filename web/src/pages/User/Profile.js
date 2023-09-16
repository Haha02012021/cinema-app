import { Breadcrumbs, Container, Typography } from "@mui/material";
import { useState } from "react";
import CustomTabs from "../../components/CustomTabs";
import CustomLink from "../../components/CustomLink";
import CustomTabPanel from "../../components/CustomTabPanel";
import UserInfoForm from "../../partials/User/Profile/UserInfoForm";
import Transactions from "../../partials/User/Profile/Transactions";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { type } = useParams();
  const [tabValue, setTabValue] = useState(
    type === "info" ? 0 : type === "transactions" ? 1 : -1,
  );

  const handleChangeTab = (e, newValueTab) => {
    setTabValue(newValueTab);
  };
  return (
    <Container>
      <Breadcrumbs>
        <CustomLink to={"/"}>Trang chủ</CustomLink>
        <Typography>Cá nhân</Typography>
      </Breadcrumbs>
      <CustomTabs
        value={tabValue}
        onChange={handleChangeTab}
        tabs={[
          {
            label: "Thông tin cá nhân",
            index: 0,
          },
          {
            label: "Giao dịch của tôi",
            index: 1,
          },
        ]}
      />
      <CustomTabPanel value={tabValue} index={0} innerPaddingX="0">
        <UserInfoForm />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={1} innerPaddingX="0">
        <Transactions />
      </CustomTabPanel>
    </Container>
  );
}
