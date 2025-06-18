import styled from "@emotion/styled";
import type { Theme } from "@mui/material";

const SkeletonWrapper = styled.div<{ theme?: Theme }>`
  padding: 1rem;
  border: 1px solid;
  position: relative;
  border-color: ${({ theme }) => theme?.palette.background.default};
  background-color: ${({ theme }) => theme?.palette.background.default};
  .sw {
    &-pc {
      &-absolute {
        height: 32rem;
      }
      height: 32rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      &-header {
        gap: 1rem;
        height: 10%;
        display: flex;
        &-img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: ${({ theme }) => theme?.palette.grey[100]};
        }
        &-info {
          flex: 1;
          &-title {
            width: 50%;
            height: 1.5rem;
            background-color: ${({ theme }) => theme?.palette.grey[100]};
          }
          &-username {
            width: 70%;
            height: 1rem;
            margin-top: 0.5rem;
            background-color: ${({ theme }) => theme?.palette.grey[100]};
          }
        }
      }
      &-body {
        height: 80%;
        margin: 1rem 0;
        border-top: 2px solid;
        border-bottom: 2px solid;
        border-color: ${({ theme }) => theme?.palette.grey[100]};
        gap: 2rem;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        transition: all 1s ease-in;

        &-item {
          width: 75%;
          height: 2.5rem;
          transition: all 1s ease-in;
          background-color: ${({ theme }) => theme?.palette.grey[100]};
          animation: wave-animation 1s infinite linear;
          &:nth-child(1) {
            animation-delay: 0s;
          }

          &:nth-child(2) {
            animation-delay: 0.2s;
          }

          &:nth-child(3) {
            animation-delay: 0.4s;
          }

          &:nth-child(4) {
            animation-delay: 0.6s;
          }
        }
      }
      &-footer {
        gap: 1rem;
        height: 10%;
        display: flex;
        justify-content: space-between;
        &-item {
          width: 50px;
          height: 50px;
          background-color: ${({ theme }) => theme?.palette.grey[100]};
        }
      }
    }
  }
`;

export { SkeletonWrapper };
