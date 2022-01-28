import * as React from "react"
import { Link } from "gatsby"
import * as CurrencyFormat from "react-currency-format"
import styled from "styled-components"

import Layout from "../components/layout"
import Seo from "../components/seo"

const CurrencyHeaderRoot = styled.div`
  display: flex;
  margin-bottom: 20px;
`
const CurrencyHeaderTitle = styled.h1`
  margin: 0 0 0 20px;
`
const CurrencyHeaderLogo = styled.div`
  border-radius: 50px;
  height: 50px;
  width: 50px;
  overflow: hidden;
  border: 1px solid #e3e4e7;

  img {
    margin: 0;
    height: 100%;
    width: 100%;
  }
`
interface CurrencyHeaderProps {
  name: string
  logo: string
}

function CurrencyHeader({ name, logo }: CurrencyHeaderProps) {
  return (
    <CurrencyHeaderRoot>
      <CurrencyHeaderLogo>
        <img src={logo} />
      </CurrencyHeaderLogo>
      <CurrencyHeaderTitle>{name} </CurrencyHeaderTitle>
    </CurrencyHeaderRoot>
  )
}

const DetailItemRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;

  @media (max-width: 480px) {
    width: 100%;
  }
`
const DetailItemLabel = styled.div`
  font-size: 14px;
  font-weight: 700;
  line-height: 1.6;
  color: rgb(91, 97, 110);
`
const DetailItemValue = styled.div`
  font-size: 16px;
  font-weight: 400;
`

const DetailItems = styled.div`
  display: flex;
  flex-wrap: wrap;

  &:not(:first-of-type) {
    margin-top: 10px;
    border-top: 1px solid #dedfe2;
    padding-top: 10px;

    @media (max-width: 480px) {
      margin-top: 14px;
      padding-top: 14px;
    }
  }

  ${DetailItemRoot}:not(:last-of-type) {
    @media (max-width: 480px) {
      margin-bottom: 16px;
    }
  }
`

interface DetailItemProps {
  label: string
  value?: string
  children?: JSX.Element | string
}

function DetailItem({ label, value, children }: DetailItemProps) {
  return (
    <DetailItemRoot>
      <DetailItemLabel>{label}</DetailItemLabel>
      <DetailItemValue>{value || children}</DetailItemValue>
    </DetailItemRoot>
  )
}

const CurrencyDetails = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(91, 97, 110, 0.2);
  border-radius: 6px;
  padding: 20px;
`

const CurrencyDescRoot = styled.div``

interface CurrencyDescriptionProps {
  description: string
}
function CurrencyDescription({ description }: CurrencyDescriptionProps) {
  return (
    <CurrencyDescRoot>
      <p>{description}</p>
    </CurrencyDescRoot>
  )
}

const BackHomeLinkRoot = styled.div`
  margin-top: 20px;
  font-size: 14px;
`
function BackHomeLink() {
  return (
    <BackHomeLinkRoot>
      <Link to="/">Go back to the homepage</Link>
    </BackHomeLinkRoot>
  )
}

const UsingDSG = ({ serverData }) => (
  <Layout>
    <Seo title={serverData.name} />
    <CurrencyHeader name={serverData.name} logo={serverData.image} />

    {serverData.description && (
      <CurrencyDescription description={serverData.description} />
    )}

    <CurrencyDetails>
      <DetailItems>
        <DetailItem
          label={"Year Established"}
          value={serverData.year_established}
        />
        <DetailItem label={"Trust Score"} value={serverData.trust_score} />
        <DetailItem label={"Trust Rank"} value={serverData.trust_score_rank} />
        <DetailItem label={"Trade Volume"}>
          <CurrencyFormat
            value={serverData.trade_volume_24h_btc}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"BTC "}
            decimalScale={4}
          />
        </DetailItem>
      </DetailItems>

      <DetailItems>
        <DetailItem label={"Country"} value={serverData.country} />
        <DetailItem label={"Facebook"}>
          <a href={serverData.facebook_url}>Facebook</a>
        </DetailItem>

        <DetailItem label={"Twitter"}>
          <a href={`twitter.com/${serverData.twitter_handle}`}>Twitter</a>
        </DetailItem>
      </DetailItems>
    </CurrencyDetails>

    <BackHomeLink />
  </Layout>
)

export default UsingDSG

export async function getServerData({ params }) {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/exchanges/${params.id}`
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
