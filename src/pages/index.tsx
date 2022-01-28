import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { ExchangesList } from "../components/ExchangeList"

const IndexPage = ({ serverData }) => (
  <Layout>
    <Seo title="Home" />
    <ExchangesList exchanges={serverData} />
  </Layout>
)

export default IndexPage


export async function getServerData() {
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/exchanges?per_page=10&page=1`)

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
      props: {}
    }
  }
}