import { Column } from "react-table";
import Table from "../Common/Table";

interface ColumnsType {
  _id: string;
  quantity: number;
  discount: number;
  amount: number;
  status: string;
}
/**
 * Creating Columns (Headers of table) array.
 * accessor is just a umique id of each header
 */
const columns: Column<ColumnsType>[] = [
  { Header: "Id", accessor: "_id" },
  { Header: "Quanitty", accessor: "quantity" },
  { Header: "Discount", accessor: "discount" },
  { Header: "Amount", accessor: "amount" },
  { Header: "Status", accessor: "status" },
];

function DashboardTable({ data }: { data: ColumnsType[] }) {
  return Table<ColumnsType>(columns, data, "px-3 py-5 m-3", "Latest Transaction")();
}

export default DashboardTable;
