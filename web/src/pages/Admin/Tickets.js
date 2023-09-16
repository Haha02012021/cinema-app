import { Container } from "@mui/material";
import EnhancedTable from "../../components/EnhancedTable";
import { useCallback, useContext, useEffect, useState } from "react";
import { filterTickets } from "../../utils/tickets";
import TicketDetail from "../../partials/Admin/Tickets/TicketDetail";
import { LoadingContext } from "../../contexts/LoadingProvider";

const headCells = [
  {
    id: "id",
    numeric: true,
    order: true,
    label: "ID",
  },
  {
    id: "tid",
    numeric: false,
    order: false,
    label: "Mã vé",
  },
  {
    id: "fullname",
    numeric: false,
    order: false,
    label: "Họ và tên",
  },
  {
    id: "email",
    numeric: false,
    order: false,
    label: "Email đặt",
  },
  {
    id: "movieTitle",
    numeric: false,
    order: false,
    label: "Phim",
  },
  {
    id: "showTime",
    numeric: false,
    order: false,
    label: "Suất chiếu",
  },
  {
    id: "seats",
    numeric: false,
    order: false,
    label: "Ghế",
  },
  {
    id: "toMoney",
    numeric: true,
    order: true,
    label: "Thành tiền",
  },
  {
    id: "createdAt",
    numeric: true,
    order: true,
    label: "Ngày đặt",
  },
  {
    id: "paymentMethod",
    label: "Phương thức thanh toán",
  },
  {
    id: "actions",
    label: "Thao tác",
  },
];

export default function Tickets() {
  const [rows, setRows] = useState([]);
  const [selectedTicketId, setSelectedTicketId] = useState(0);
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    getTicketsData();
  }, []);

  const getTicketsData = async () => {
    setLoading(true);
    const tickets = await filterTickets({});
    setLoading(false);
    setRows(tickets);
  };

  const renderTable = useCallback(() => {
    return (
      <EnhancedTable
        title={"Danh sách vé"}
        headCells={headCells}
        rows={rows}
        hasFilter={false}
        onSeeDetailRow={handelSeeDetailRow}
        defaultSelected={[]}
      />
    );
  }, [rows]);

  const handelSeeDetailRow = (ticketId) => {
    setSelectedTicketId(ticketId);
  };

  const handleCloseDetail = () => {
    setSelectedTicketId(0);
  };
  return (
    <>
      <Container>{renderTable()}</Container>
      {selectedTicketId && (
        <TicketDetail
          open={selectedTicketId}
          onClose={handleCloseDetail}
          ticketId={selectedTicketId}
        />
      )}
    </>
  );
}
