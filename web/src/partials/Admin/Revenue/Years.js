import { useEffect, useState } from "react";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import dayjs from "dayjs";
import { getRevenue } from "../../../utils/revenue";
import { formatNumber } from "../../../utils/number";
import { LineChart } from "@mui/x-charts/LineChart";
import CustomDateRange from "../../../components/CustomDateRange";

export default function Years() {
  const [startDate, setStartDate] = useState(dayjs().add(-5, "y"));
  const [endDate, setEndDate] = useState(dayjs());
  const [data, setData] = useState();
  const theme = useTheme();
  const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    getData();
  }, [startDate, endDate]);

  const getData = async () => {
    const rs = await getRevenue({
      type: "year",
      start: startDate,
      end: endDate,
    });

    const revenues = [];

    let date = startDate;

    while (!date.isAfter(endDate, "year")) {
      const existR = rs?.find((r) => date.isSame(r.date, "year"));

      if (existR) {
        revenues.push(existR);
      } else {
        revenues.push({
          date,
          total: 0,
          count: 0,
        });
      }

      date = date.add(1, "year");
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
        views={["year"]}
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
                    return dayjs(item.date).year();
                  }),
                ],
                scaleType: "point",
                label: "Năm",
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
