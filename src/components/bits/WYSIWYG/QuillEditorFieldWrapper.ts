import styled from "@emotion/styled";
import { type Theme } from "@mui/material";

const QuillEditorFieldWrapper = styled.div<{ theme?: Theme }>`
  .qe-fw {
    width: 100%;

    &-label {
      display: block;
      font-size: 0.8rem;
      margin-bottom: 0.1rem;
      &-error {
        color: ${({ theme }) => theme.palette.error.main};
      }
    }
    &-div {
      position: relative;
      &-quill {
        width: 100%;
        resize: none;
        border: 1px solid;
        border-radius: ${({ theme }) => theme.shape.borderRadius}px;
        border-color: ${({ theme }) => theme.palette.text.disabled};
        &:focus-within {
          border-width: 2px;
          border-color: ${({ theme }) => theme.palette.primary.main};
        }

        &-border {
          &-disabled {
            opacity: 0.8;
            cursor: not-allowed;
            border-color: ${({ theme }) => theme.palette.text.disabled};
          }
          &-error {
            border-color: ${({ theme }) => theme.palette.error.main};
          }
          &-primary {
            border-color: ${({ theme }) => theme.palette.primary.main};
          }
        }
        &-icon {
          &-start {
            padding-left: 2.25rem;
          }
          &-end {
            padding-right: 1.75rem;
          }
        }
      }
      &-icon {
        &-start {
          top: 0;
          bottom: 0;
          left: 0;
          display: flex;
          position: absolute;
          align-items: center;
          padding-left: 0.5rem;
          pointer-events: none;
        }
        &-end {
          top: 0;
          bottom: 0;
          right: 0;
          display: flex;
          position: absolute;
          align-items: center;
          padding-right: 0.5rem;
        }
      }
    }
    &-helper {
      padding-right: 0.5rem;
    }
  }
`;

export { QuillEditorFieldWrapper };
