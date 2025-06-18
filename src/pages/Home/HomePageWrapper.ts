import styled from "@emotion/styled";
import type { Theme } from "@mui/material";

export const HomePageWrapper = styled.div<{ theme?: Theme }>`
  background-color: ${({ theme }) => theme.palette.common.white};

  .hpw {
    &-header {
      text-align: center;
    }
  }
`;
