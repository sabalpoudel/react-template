import styled from "@emotion/styled";
import { type Theme } from "@mui/material";

const FileRelatedModalsWrapper = styled.div<{ theme?: Theme }>`
  gap: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  text-align: center;
  align-items: center;

  .fr-mw {
    &-content {
      gap: 1rem;
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  }
`;
export { FileRelatedModalsWrapper };
