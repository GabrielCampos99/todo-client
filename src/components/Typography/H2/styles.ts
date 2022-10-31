import styled, { css } from "styled-components"
import { H2Props } from "./H2"

export const H2Styled = styled.h2<Pick<H2Props, "fontSizeCustom" | "colorCustom">>`
  ${({ fontSizeCustom }) => css`
    font-size: ${fontSizeCustom ? fontSizeCustom : "1.6rem"};
  `}
`
