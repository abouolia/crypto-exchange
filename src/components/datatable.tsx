import React from "react"
import styled from "styled-components"
import { useTable } from "react-table"
import { Align } from "../common"

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
const TD = styled.td<TDInterface>`
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
const TH = styled.th<THInterface>`
  padding: 10px 30px;
  border-bottom: 1px solid rgba(91, 97, 110, 0.2);
  vertical-align: top;
  font-weight: 400;
  font-size: 14px;

  ${props =>
    props.textAlign &&
    `
    text-align: ${props.textAlign};
  `}
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
              <TH {...column.getHeaderProps()} textAlign={column.textAlign}>
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
                    {...cell.getCellProps()}
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
  )
}
