import React from "react"
import styled from "styled-components"
import { useTable } from "react-table"

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
const TD = styled.td`
  padding: 14px 30px 14px 0px;
`
const Tbody = styled.tbody`
  ${TD} {
    padding: 14px 30px;
    border: 0;
  }
  ${TR} {
    &:hover {
      background-color: rgba(50, 53, 61, 0.02);
    }
  }
`
const TH = styled.th`
  padding: 10px 30px 10px 0px;
  border-bottom: 1px solid rgba(91, 97, 110, 0.2);
  text-align: center;
  vertical-align: top;
  font-weight: 400;
  font-size: 14px;
`

export function DataTable({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    })

  // Render the UI for your table
  return (
    <TableRoot {...getTableProps()}>
      <Thead>
        {headerGroups.map(headerGroup => (
          <TR {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TH {...column.getHeaderProps()}>{column.render("Header")}</TH>
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
                return <TD {...cell.getCellProps()}>{cell.render("Cell")}</TD>
              })}
            </TR>
          )
        })}
      </Tbody>
    </TableRoot>
  )
}
