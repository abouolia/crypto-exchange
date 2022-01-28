import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { ExchangesList } from "../components/exchangeList"

const IndexPage = ({ serverData }) => (
  <Layout>
    <Seo title="Home" />
    <ExchangesList exchanges={serverData} />
  </Layout>
)

export default IndexPage

export async function getServerData({ query }) {
  const parsedQuery = {
    page: 1,
    pageSize: 10,
    ...query,
  }
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/exchanges?per_page=${parsedQuery.pageSize}&page=${parsedQuery.page}`
    )

    if (!res.ok) {
      throw new Error(`Response failed`)
    }
    return {
      props: await res.json(),
    }
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {},
    }
  }
}
