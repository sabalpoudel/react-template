import styled from "@emotion/styled";
import { type Theme } from "@mui/material";

export const TableCompWrapper = styled.div<{ theme?: Theme }>`
  width: 100%;
  overflow: hidden;

  .MuiTableContainer-root {
    &::-webkit-scrollbar {
      width: 4px;
      background-color: #fff;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color: #aeaeae;
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(0 0 0 / 30%);
      background-color: #fff;
      border-radius: 6px;
    }
  }

  .table-comp-w {
    &-selected_actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      gap: 0.5rem;
      flex-wrap: wrap;

      &-items {
        display: flex;
        gap: 0.5rem;
        button {
          min-width: 30px;
          min-height: 30px;

          svg {
            height: 15px;
            width: 15px;
          }
        }
      }
    }
    &-table_head {
      &-row {
        &-cell {
          font-weight: bold;
          background-color: ${({ theme }) => theme.palette.grey[100]};
        }
      }
    }
    &-table_body {
      &-row {
        &-cell {
          color: ${({ theme }) => theme.palette.text.secondary};
          background-color: ${({ theme }) => theme.palette.common.white};

          button {
            margin-right: 0.5rem;
            min-width: 30px;
            min-height: 30px;
            svg {
              height: 15px;
              width: 15px;
            }
          }
        }
      }
    }
  }
`;
