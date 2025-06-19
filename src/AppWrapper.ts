import styled from "@emotion/styled";
import { MAX_WIDTH } from "./_style/mui/constant";

export const AppWrapper = styled.div`
  --max-screen-width: ${MAX_WIDTH};

  width: 100%;
  margin: auto;
  overflow: hidden;
  max-width: var(--max-screen-width);
`;
