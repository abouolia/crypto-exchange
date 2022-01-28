import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const HeaderRoot = styled.header`
  margin-bottom: 2rem;
  background: rgb(22, 82, 240);
  height: 65px;
`

const HeaderContainer = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1rem 1.0875rem;
`

const HeaderSiteTitle = styled.h1`
  font-size: 25px;
  color: #fff;
  margin: 0;

  a {
    text-decoration: none;
    color: inherit;
  }
`

interface HeaderProps {
  siteTitle: string
}

const Header = ({ siteTitle }: HeaderProps) => (
  <HeaderRoot>
    <HeaderContainer>
      <HeaderSiteTitle>
        <Link to="/">{siteTitle}</Link>
      </HeaderSiteTitle>
    </HeaderContainer>
  </HeaderRoot>
)

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
