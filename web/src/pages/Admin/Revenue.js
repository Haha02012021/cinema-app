import { Container } from "@mui/material";
import CustomTabs from "../../components/CustomTabs";
import SectionTitle from "../../components/SectionTitle";
import { useState } from "react";
import CustomTabPanel from "../../components/CustomTabPanel";
import Months from "../../partials/Admin/Revenue/Months";
import Days from "../../partials/Admin/Revenue/Days";
import Years from "../../partials/Admin/Revenue/Years";

export default function Revenue() {
  const [tabValue, setTabValue] = useState(0);

  const handleChangeTab = (e, newTabValue) => {
    setTabValue(newTabValue);
  };
  return (
    <Container>
      <SectionTitle title={"Doanh thu"} />
      <CustomTabs
        onChange={handleChangeTab}
        value={tabValue}
        tabs={[
          {
            label: "Ngày",
            index: 0,
          },
          {
            label: "Tháng",
            index: 1,
          },
          {
            label: "Năm",
            index: 3,
          },
        ]}
      />
      <CustomTabPanel innerPaddingX="0" value={tabValue} index={0}>
        <Days />
      </CustomTabPanel>
      <CustomTabPanel innerPaddingX="0" value={tabValue} index={1}>
        <Months />
      </CustomTabPanel>
      <CustomTabPanel innerPaddingX="0" value={tabValue} index={2}>
        <Years />
      </CustomTabPanel>
    </Container>
  );
}
