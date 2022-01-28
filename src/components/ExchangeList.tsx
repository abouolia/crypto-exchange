import React from "react"
import styled from "styled-components"
import * as CurrencyFormat from "react-currency-format"
import { navigate } from "gatsby"
import { DataTable } from "./datatable"
import { Tag } from "./Tags"
import { Align } from "../common"
import { Column } from "react-table"

const ExchangeListRoot = styled.div``

const useExchangeListColumns = (): Column[] => {
  return React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: NameCell,
      },
      {
        Header: "Trust Rank",
        accessor: "trustRank",
        Cell: TrustRankCell,
      },
      {
        Header: "Trade Volume",
        accessor: "trade_volume_24h_btc",
        Cell: TradeVolumeCell,
        textAlign: Align.Right,
      },
    ],
    []
  )
}

const CoinCellRoot = styled.div``
const CoinCellTitle = styled.div`
  font-size: 16px;
`
const CoinCellLogo = styled.div`
  border-radius: 35px;
  width: 35px;
  height: 35px;
  overflow: hidden;
  margin-right: 12px;
`

const CoinCellAnchor = styled.a`
  display: flex;
  text-decoration: none;
  color: inherit;
  align-items: center;

  &:hover ${CoinCellTitle} {
    color: #000;
  }
`

function NameCell({ value, row: { original } }) {
  return (
    <CoinCellRoot>
      <CoinCellAnchor href={"#"}>
        <CoinCellLogo>
          <img src={original.image} />
        </CoinCellLogo>

        <CoinCellTitle>{original.name}</CoinCellTitle>
      </CoinCellAnchor>
    </CoinCellRoot>
  )
}

function TradeVolumeCell({ value }) {
  return (
    <CurrencyFormat
      value={value}
      displayType={"text"}
      thousandSeparator={true}
      prefix={"BTC "}
      decimalScale={4}
    />
  )
}

function TrustRankCell({ value }) {
  return <Tag>High</Tag>
}

export function ExchangesList({ exchanges }) {
  const columns = useExchangeListColumns()

  // Handle change the route once the pagination or page size change.
  const handleFetchData = React.useCallback(({ pageIndex, pageSize }) => {
    const pageNumber = pageIndex + 1

    navigate(`/?page=${pageNumber}`)
  }, [])

  return (
    <ExchangeListRoot>
      <DataTable
        columns={columns}
        data={exchanges}
        pagination={true}
        manualPagination={true}
        onFetchData={handleFetchData}
        controlledPagesCount={999999}
      />
    </ExchangeListRoot>
  )
}
