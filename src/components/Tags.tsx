import React from "react"
import styled from "styled-components"

const TagRoot = styled.div`
  display: inline-block;
  padding: 0.25em 0.4em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;

  padding-right: 0.6em;
  padding-left: 0.6em;
  border-radius: 10rem;

  color: #fff;
  background-color: #007bff;
`

interface TagProps {
  intent?: string
  children: JSX.Element | string
}

export function Tag({ children }: TagProps) {
  return <TagRoot>{children}</TagRoot>
}
