import { Stack, useMediaQuery, useTheme } from "@mui/material";
import CustomDateField from "../../../components/CustomDateField";
import { getDate, getDateToDisplay } from "../../../utils/date";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getRevenue } from "../../../utils/revenue";
import { LineChart } from "@mui/x-charts/LineChart";
import { formatNumber } from "../../../utils/number";
import CustomDateRange from "../../../components/CustomDateRange";

export default function Days() {
  const [startDate, setStartDate] = useState(dayjs().startOf("w"));
  const [endDate, setEndDate] = useState(dayjs().endOf("w"));
  const [data, setData] = useState();
  const theme = useTheme();
  const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    getData();
  }, [startDate, endDate]);

  const getData = async () => {
    const rs = await getRevenue({
      type: "date",
      start: startDate,
      end: endDate,
    });

    const revenues = [];

    let date = startDate;

    while (!date.isAfter(endDate, "date")) {
      const existR = rs.find((r) => date.isSame(r.date, "date"));

      if (existR) {
        revenues.push(existR);
      } else {
        revenues.push({
          date: date.format("YYYY-MM-DD"),
          total: 0,
          count: 0,
        });
      }

      date = date.add(1, "day");
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
        startDate={startDate}
        endDate={endDate}
        onChangeStartDate={handleChangeStartDate}
        onChangeEndDate={handleChangeEndDate}
      />
      <Stack direction={"row"} justifyContent={"center"}>
        {data && (
          <LineChart
            xAxis={[
              {
                data: [
                  ...data.map((item) => {
                    return dayjs(item.date).date();
                  }),
                ],
                scaleType: "point",
                label: "Ngày",
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
