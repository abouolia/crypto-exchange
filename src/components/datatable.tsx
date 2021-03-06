import React from "react"
import styled from "styled-components"
import { Column, useTable, usePagination, useAsyncDebounce } from "react-table"
import { Align } from "../common"

const DataTableRoot = styled.div`
  max-width: 100%;
  overflow: auto;
`
const TableRoot = styled.table`
  width: 100%;
  padding: 0px;
  border-spacing: 0px;
  border-collapse: separate;
  caption-side: top;
  border-radius: 12px;

  border: 1px solid rgba(91, 97, 110, 0.2);
  border-radius: 12px;
`

const TR = styled.tr``
const Thead = styled.thead`
  ${TR}:first-child {
    border-top: 1px solid 1px solid var(--line);
  }
`

interface TDInterface {
  textAlign: Align
}
export const TD = styled.td<TDInterface>`
  padding: 14px 30px 14px 0px;

  ${props =>
    props.textAlign &&
    `
    text-align: ${props.textAlign};
  `}
`
const Tbody = styled.tbody`
  ${TD} {
    padding: 14px 30px;
    border: 0;

    @media (max-width: 769px) {
      padding: 8px 20px;
    }
  }
  ${TR} {
    &:hover {
      background-color: rgba(50, 53, 61, 0.02);
    }
  }
`
interface THInterface {
  textAlign: Align
}
export const TH = styled.th<THInterface>`
  padding: 10px 30px;
  border-bottom: 1px solid rgba(91, 97, 110, 0.2);
  vertical-align: top;
  font-weight: 400;
  font-size: 14px;
  text-align: inherit;
  text-align: -webkit-match-parent;
  white-space: nowrap;

  @media (max-width: 769px) {
    padding: 8px 20px;
  }

  ${props =>
    props.textAlign &&
    `
    text-align: ${props.textAlign};
  `}
`

const Pagination = styled.div`
  margin-top: 20px;

  button + button {
    margin-left: 10px;
  }
`

interface DataTableProps {
  columns: Column[]
  data: Object[]
  pagination?: boolean
  manualPagination?: boolean
  controlledPagesCount?: number
  onFetchData?: (context: { pageIndex: number; pageSize: number }) => void
  className?: string
}

export function DataTable({
  columns,
  data,
  pagination,
  manualPagination,
  onFetchData,
  controlledPagesCount,
  className,
}: DataTableProps) {
  // Use the state and functions returned from useTable to build your UI
  const instance = useTable(
    {
      columns,
      data,
      manualPagination,
      pageCount: controlledPagesCount,
    },
    usePagination
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,

    state: { pageIndex, pageSize },
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
  } = instance

  // Debounce our onFetchData call for 100ms
  const onFetchDataDebounced = useAsyncDebounce(onFetchData, 100)

  // When the these table states changes, fetch new data!
  React.useEffect(() => {
    // Every change will call our debounced function
    onFetchDataDebounced({ pageIndex, pageSize })
    // Only the last call after the 100ms debounce is over will be fired!
  }, [onFetchDataDebounced, pageIndex, pageSize])

  // Render the UI for your table
  return (
    <DataTableRoot className={className}>
      <TableRoot {...getTableProps()}>
        <Thead>
          {headerGroups.map(headerGroup => (
            <TR {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TH
                  {...column.getHeaderProps({
                    className: column.className,
                  })}
                  textAlign={column.textAlign}
                >
                  {column.render("Header")}
                </TH>
              ))}
            </TR>
          ))}
        </Thead>

        <Tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <TR {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <TD
                      textAlign={cell.column.textAlign}
                      {...cell.getCellProps({
                        className: cell.column.className,
                      })}
                    >
                      {cell.render("Cell")}
                    </TD>
                  )
                })}
              </TR>
            )
          })}
        </Tbody>
      </TableRoot>

      {pagination && (
        <Pagination>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            + Previous Page +{" "}
          </button>

          <button onClick={() => nextPage()} disabled={!canNextPage}>
            + Next Page +{" "}
          </button>
        </Pagination>
      )}
    </DataTableRoot>
  )
}
