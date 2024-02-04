import { ReactElement, useEffect, useState } from "react";
import { Column } from "react-table";
import Table from "../../components/admin/Common/Table";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  useDeleteUserMutation,
  useGetAllUserQuery,
} from "../../redux/api/userApi";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";
import { responseToast } from "../../components/utils/features";

interface ColumnsType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}

const columns: Column<ColumnsType>[] = [
  { Header: "Avatar", accessor: "avatar" },
  { Header: "Name", accessor: "name" },
  { Header: "Email", accessor: "email" },
  { Header: "Gender", accessor: "gender" },
  { Header: "Role", accessor: "role" },
  { Header: "Action", accessor: "action" },
];

function Customers() {
  const [rows, setRows] = useState<ColumnsType[]>([]);
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { data, isError, isLoading,refetch } = useGetAllUserQuery(user!._id);
  if (isError) return toast.error("Unable to fetch user accounts");

  const [deleteUser] = useDeleteUserMutation();
  const handleDeleteUser = async (userId: string) => {
    try {
      const res = await deleteUser({ userId, adminId: user!._id });
      responseToast(res, null, "");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data) {
      setRows(
        data.users.map((item) => {
          return {
            avatar: (
              <img
                style={{
                  borderRadius: "50%",
                  height: "40px",
                  width: "40px",
                }}
                src={item.photo}
                alt={item.name}
              />
            ),
            name: item.name,
            email: item.email,
            gender: item.gender,
            role: item.role,
            action: (
              <button
                onClick={() => {
                  handleDeleteUser(item._id);
                }}
              >
                <FaTrash />
              </button>
            ),
          };
        })
      );
    }
  }, [data]);

  const CustomersTable = Table<ColumnsType>(
    columns,
    rows,
    "px-3 py-5 m-3",
    "Customers",
    rows.length > 6,
    true
  )();
  return (
    <div className="lg:col-span-4 px-5 py-4">
      <div className="mx-3 xsm:rounded xsm:shadow xsm:bg-white">
        {isLoading ? <Loader width="100%" length={30} /> : CustomersTable}
      </div>
    </div>
  );
}

export default Customers;
