import styled from "@emotion/styled";
import type { Theme } from "@mui/material";

export const AccordionCompWrapper = styled.div<{ theme?: Theme }>`
  .accordion {
    width: 100%;

    &-item {
      &-title {
        padding: 10px 0;
        cursor: pointer;
        font-weight: bold;
        display: flex;
        font-size: 1rem;
        align-items: center;
        justify-content: space-between;

        &-text {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }
      }

      &-content {
        opacity: 1;
        padding: 0 10px;
        overflow: hidden;
        transition: max-height 0.3s ease, opacity 0.2s ease-in-out;
        &:not([aria-hidden="false"]) {
          opacity: 0;
        }
      }
    }
  }
`;
