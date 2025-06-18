import styled from "@emotion/styled";
import type { Theme } from "@mui/material";

const ViewLargeFilesSliderWrapper = styled.div<{ theme?: Theme }>`
  .vlf-sw {
  }
`;
const ViewLargeFilesSliderContentWrapper = styled.div<{ theme?: Theme }>`
  width: 100%;
  height: 100%;
  .vlf-sw-modal-content {
    &-swiper {
      width: 100%;
      height: 100%;
      &-item {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        &-file {
          gap: 1rem;
          width: 250px;
          height: 250px;
          display: flex;
          padding: 1rem;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          border-radius: ${({ theme }) => theme?.shape.borderRadius}px;
          &-title {
            color: ${({ theme }) => theme?.palette.common.white};
          }
          &-button {
            text-align: center;
          }
        }
      }
    }
  }
`;

export { ViewLargeFilesSliderWrapper, ViewLargeFilesSliderContentWrapper };
