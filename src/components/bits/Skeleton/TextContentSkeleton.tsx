import styled from "@emotion/styled";
import { Skeleton } from "@mui/material";

const TextContentSkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .tcs-w {
    &-content {
      background-color: #fff;
    }
  }
`;

export default function TextContentSkeleton() {
  return (
    <TextContentSkeletonWrapper className="tcs-w">
      <div className="tcs-w-content">
        <div>
          <Skeleton width={200} />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </div>
        <br />
        <div>
          <Skeleton width={200} />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </div>
      </div>
    </TextContentSkeletonWrapper>
  );
}
