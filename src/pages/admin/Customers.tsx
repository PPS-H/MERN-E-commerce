import { ReactElement, useCallback } from "react";
import { Column } from "react-table";
import Table from "../../components/admin/Common/Table";
import { FaTrash } from "react-icons/fa";


const img = "https://randomuser.me/api/portraits/women/54.jpg";
const img2 = "https://randomuser.me/api/portraits/women/50.jpg";
interface ColumnsType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}

const arr: ColumnsType[] = [
  {
    avatar: (
      <img
        style={{
          borderRadius: "50%",
          height:"40px",
          width:"40px",
        }}
        src={img}
        alt="Shoes"
      />
    ),
    name: "Emily Palmer",
    email: "emily.palmer@example.com",
    gender: "female",
    role: "user",
    action: (
      <button>
        <FaTrash />
      </button>
    ),
  },

  {
    avatar: (
      <img
        style={{
          borderRadius: "50%",
          height:"40px",
          width:"40px",
        }}
        src={img2}
        alt="Shoes"
      />
    ),
    name: "May Scoot",
    email: "aunt.may@example.com",
    gender: "female",
    role: "user",
    action: (
      <button>
        <FaTrash />
      </button>
    ),
  },
];

const columns: Column<ColumnsType>[] = [
  { Header: "Avatar", accessor: "avatar" },
  { Header: "Name", accessor: "name" },
  { Header: "Email", accessor: "email" },
  { Header: "Gender", accessor: "gender" },
  { Header: "Role", accessor: "role" },
  { Header: "Action", accessor: "action" },
];

function Customers() {
  const CustomersTable = useCallback(
    Table<ColumnsType>(columns, arr, "px-3 py-5 m-3", "Customers", true),
    []
  );
  return (
    <div className="lg:col-span-4 px-5 py-4">
      <div className="mx-3 xsm:rounded xsm:shadow xsm:bg-white">
        {CustomersTable()}
      </div>
    </div>
  );
}

export default Customers;
