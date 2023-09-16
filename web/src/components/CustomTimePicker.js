import { Box, Button, Divider, Modal, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import {
  LocalizationProvider,
  MultiSectionDigitalClock,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getRooms } from "../services/roomServices";

export default function CustomTimePicker({
  defaultValue = dayjs(new Date()),
  onSave,
  open,
  onClose,
}) {
  const [value, setValue] = useState({
    time: dayjs(new Date()),
  });
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getRoomsData();
  }, []);

  const getRoomsData = async () => {
    const roomsData = await getRooms();
    setRooms(roomsData);
  };
  const handleChange = (newValue) => {
    setValue((prev) => ({
      ...prev,
      time: newValue,
    }));
  };

  const handleSave = () => {
    onSave({
      time: dayjs(value.time).format("HH:mm"),
      room: value.room,
    });
  };

  const handleClickRoom = (roomId) => {
    setValue((prev) => ({
      ...prev,
      room: roomId,
    }));
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Stack
        sx={(theme) => ({
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: theme.palette.common.white,
          border: `1px solid ${grey[200]}`,
          zIndex: 2,
        })}
      >
        <Stack direction={"row"} gap={"2"}>
          <Stack gap={2} sx={{ pt: 2 }}>
            <Typography fontWeight={"medium"} textAlign={"center"}>
              Giờ chiếu
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DigitalClock", "MultiSectionDigitalClock"]}
              >
                <DemoItem>
                  <MultiSectionDigitalClock
                    value={value.time}
                    defaultValue={defaultValue}
                    ampm={false}
                    onChange={handleChange}
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </Stack>
          <Divider />
          <Stack gap={2} sx={{ py: 2, px: 2 }}>
            <Typography fontWeight={"medium"}>Phòng</Typography>
            {rooms.map((room) => {
              return (
                <Button
                  key={room.id}
                  variant={room.id === value.room ? "contained" : "outlined"}
                  sx={{ minWidth: "2.5rem", minHeight: "2.5rem", p: 0 }}
                  onClick={() => handleClickRoom(room.id)}
                >
                  {room.id}
                </Button>
              );
            })}
          </Stack>
        </Stack>
        <Button variant="contained" onClick={handleSave}>
          Lưu
        </Button>
      </Stack>
    </Modal>
  );
}
