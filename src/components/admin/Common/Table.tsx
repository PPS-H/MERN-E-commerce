import { useTable, Column, TableOptions } from "react-table";

function Table<T extends Object>(
  columns: Column<T>[],
  data: T[],
  containerClassName: string,
  heading: string
) {
  return function TableComponent() {
    const options: TableOptions<T> = { columns, data };
    const { getTableBodyProps, rows, getTableProps, headerGroups, prepareRow } =
      useTable(options);
    console.log(headerGroups);

    return (
      <div className={containerClassName}>
        <div className="text-gray-400 tracking-widest text-lg capitalize my-1">{heading}</div>
        <table className="w-full h-full mx-4 my-4" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroups) => (
              <tr {...headerGroups.getHeaderGroupProps()}>
                {headerGroups.headers.map((column) => (
                  <th {...column.getHeaderProps()} className="text-left font-normal py-5">
                    {" "}
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {
              rows.map((row)=>{
                prepareRow(row);
                return(
                  <tr {...row.getRowProps()}>
                    {
                      row.cells.map((cell)=>(
                        <td {...cell.getCellProps()} className="text-left border-b-2 border-b-gray-200 py-2">{cell.render("Cell")}</td>
                      ))
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  };
}

export default Table;
