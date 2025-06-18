import styled from "@emotion/styled";
import { type Theme } from "@mui/material";

const EmptyAreaWrapper = styled.div<{ theme?: Theme; iconWidth?: string }>`
  .eaw {
    &-container {
      text-align: center;
      &-h2 {
      }
      &-h3 {
      }
      &-icon {
        max-width: 100%;
        width: ${({ iconWidth }) => iconWidth};
      }
      &-goBack {
        &-btn {
        }
      }
    }
  }
`;

export { EmptyAreaWrapper };
