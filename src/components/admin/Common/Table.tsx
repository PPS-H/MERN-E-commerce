import {
  useTable,
  Column,
  TableOptions,
  useSortBy,
  usePagination,
} from "react-table";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";

function Table<T extends Object>(
  columns: Column<T>[],
  data: T[],
  containerClassName: string,
  heading: string,
  pagination?: boolean
) {
  return function TableComponent() {
    const options: TableOptions<T> = {
      columns,
      data,
      initialState: { pageSize: 6 },
    };
    const {
      getTableBodyProps,
      page,
      getTableProps,
      headerGroups,
      prepareRow,
      nextPage,
      previousPage,
      canNextPage,
      canPreviousPage,
      pageCount,
      state: { pageIndex },
    } = useTable(options, useSortBy, usePagination);

    return (
      <>
      <div className={`${containerClassName} ${pagination?"h-[600px]":""}`}>
        <div className="heading text-left">{heading}</div>
        <div className="overflow-x-scroll ">
        <table className="md:w-full w-[768px]" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroups) => (
              <tr {...headerGroups.getHeaderGroupProps()}>
                {headerGroups.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="text-left font-normal py-5 "
                  >
                    {" "}
                    {column.render("Header")}
                    {column.isSorted && (
                      <span>
                        {column.isSortedDesc ? (
                          <AiOutlineSortDescending className="inline-block" />
                        ) : (
                          <AiOutlineSortAscending className="inline-block" />
                        )}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="text-left border-b-2 border-b-gray-200 py-2"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
       
      </div>
      {pagination && (
          <div className="flex justify-center items-center p-5">
            <button
              disabled={!canPreviousPage}
              onClick={previousPage}
              className="bg-black text-white rounded-lg shadow px-3 py-2"
            >
              Previous
            </button>
            <span className="m-3 font-semibold">{`${pageIndex + 1} of ${pageCount}`}</span>
            <button
              disabled={!canNextPage}
              onClick={nextPage}
              className=" bg-black text-white rounded-lg shadow px-3 py-2"
            >
              Next
            </button>
          </div>
        )}
      </>
    );
  };
}

export default Table;
