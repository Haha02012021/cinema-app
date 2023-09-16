import { Container, Stack } from "@mui/material";
import EnhancedTable from "../../components/EnhancedTable";
import { useCallback, useContext, useEffect, useState } from "react";
import UserFilter from "../../partials/Admin/Users/UserFilter";
import { filterUsers } from "../../utils/users";
import DeleteAlert from "../../partials/Admin/Users/DeleteAlert";
import { LoadingContext } from "../../contexts/LoadingProvider";

const headCells = [
  {
    id: "id",
    order: true,
    numeric: true,
    label: "ID",
  },
  {
    id: "fullname",
    order: true,
    numeric: true,
    label: "Họ và tên",
  },
  {
    id: "email",
    order: true,
    numeric: true,
    label: "Thư điện tử",
  },
  {
    id: "phonenumber",
    order: true,
    numeric: true,
    label: "Số điện thoại",
  },
  {
    id: "sex",
    order: false,
    numeric: false,
    label: "Giới tính",
  },
  {
    id: "birthday",
    order: true,
    numeric: true,
    label: "Ngày sinh",
  },
  {
    id: "amount",
    order: true,
    numeric: true,
    label: "Đã mua (vé)",
  },
  {
    id: "toMoney",
    order: true,
    numeric: true,
    label: "Thành tiền",
  },
];

export default function Users() {
  const [rows, setRows] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [deleteUser, setDeleteUser] = useState(false);
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    !deleteUser && getUsersData();
  }, [deleteUser]);

  const getUsersData = async () => {
    setLoading(true);
    const movies = await filterUsers({});
    setLoading(false);
    setRows(movies);
  };

  const renderTable = useCallback(() => {
    return (
      <EnhancedTable
        title={"Danh sách nguời dùng"}
        headCells={headCells}
        rows={rows}
        onDeleteAll={handleDeleteAll}
        onSelectRow={handleSelectUser}
        defaultSelected={selectedIds}
        toobarChildren={<UserFilter onFilter={handleFilter} />}
      />
    );
  }, [rows]);

  const handleFilter = async (filter) => {
    const users = await filterUsers(filter);
    setRows(users);
  };

  const handleDeleteAll = () => {
    setDeleteUser(true);
  };

  const handleSelectUser = (selected) => {
    setSelectedIds(selected);
  };

  const handleCloseDeleteUserAlert = (isDeleted) => {
    setDeleteUser(false);
  };

  return (
    <Container>
      <Stack gap={2}>{renderTable()}</Stack>
      <DeleteAlert
        open={deleteUser}
        onClose={handleCloseDeleteUserAlert}
        userIds={selectedIds}
      />
    </Container>
  );
}
