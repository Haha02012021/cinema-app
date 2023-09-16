import { useEffect, useState } from "react";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import dayjs from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import { getRevenue } from "../../../utils/revenue";
import { LineChart } from "@mui/x-charts/LineChart";
import { formatNumber } from "../../../utils/number";
import CustomDateRange from "../../../components/CustomDateRange";

dayjs.extend(quarterOfYear);
export default function Months() {
  const [startDate, setStartDate] = useState(dayjs().startOf("quarter"));
  const [endDate, setEndDate] = useState(dayjs().endOf("quarter"));
  const [data, setData] = useState();
  const theme = useTheme();
  const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    getData();
  }, [startDate, endDate]);

  const getData = async () => {
    const rs = await getRevenue({
      type: "month",
      start: startDate,
      end: endDate,
    });

    const revenues = [];

    let date = startDate;

    while (!date.isAfter(endDate, "month")) {
      const existR = rs.find((r) => date.isSame(r.date, "month"));

      if (existR) {
        revenues.push(existR);
      } else {
        revenues.push({
          date,
          total: 0,
          count: 0,
        });
      }

      date = date.add(1, "month");
    }

    setData(revenues);
  };

  const handleChangeStartDate = (newValue) => {
    setStartDate(newValue);
  };

  const handleChangeEndDate = (newValue) => {
    setEndDate(newValue);
  };
  return (
    <>
      <CustomDateRange
        views={["month", "year"]}
        startDate={startDate}
        endDate={endDate}
        onChangeStartDate={handleChangeStartDate}
        onChangeEndDate={handleChangeEndDate}
        format={"MM/YYYY"}
      />
      <Stack direction={"row"} justifyContent={"center"}>
        {data && (
          <LineChart
            xAxis={[
              {
                data: [
                  ...data.map((item) => {
                    return dayjs(item.date).month() + 1;
                  }),
                ],
                scaleType: "point",
                label: "Tháng",
              },
            ]}
            series={[
              {
                label: "Tổng doanh thu",
                data: [
                  ...data.map((item) => {
                    return item.total;
                  }),
                ],
                curve: "linear",
                valueFormatter: (v) => `${formatNumber(v)} VNĐ`,
              },
            ]}
            width={matchDownSm ? 500 : 1000}
            height={500}
          />
        )}
      </Stack>
    </>
  );
}
