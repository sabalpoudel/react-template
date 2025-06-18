"use client";

import styled from "@emotion/styled";
import { Skeleton } from "@mui/material";
import { breakpoint } from "@styles/mui/theme";

const LandingPageSkeletonWrapper = styled.div`
  width: 918px;
  margin-inline: auto;

  ${breakpoint("md")} {
    width: 100%;
    padding: 0 40px;
  }
  ${breakpoint("lg")} {
    padding: 0;
  }

  .lps-w {
    &-cover-image {
      height: 300px;

      ${breakpoint("sm")} {
        height: 200px;
      }
    }
  }

  .date-share {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .share-icons {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }

  .avatar-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .avatar-content {
      display: flex;
      gap: 0.5rem;
      align-items: center;

      .avatar-details {
        flex-direction: column;
      }
    }
  }
`;

export default function LandingPageSkeleton() {
  return (
    <LandingPageSkeletonWrapper className="lps-w">
      <div className="lps-w-cover-image">
        <Skeleton animation="wave" height={"100%"} />
      </div>

      <div className="date-share">
        <Skeleton animation="wave" height={20} width="20%" />

        <div className="share-icons">
          {Array.from({ length: 4 }).map((_, j) => (
            <Skeleton
              key={j}
              animation="wave"
              variant="circular"
              width={30}
              height={30}
            />
          ))}
        </div>
      </div>

      <Skeleton animation="wave" height={40} width="40%" />
      <div className="avatar-btn">
        <div className="avatar-content">
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
          <div className="avatar-details">
            <Skeleton animation="wave" height={20} width="10%" />
            <Skeleton animation="wave" height={20} width="10%" />
          </div>
        </div>

        <div className="btn">
          <Skeleton animation="wave" height={40} width="10%" />
        </div>
      </div>
    </LandingPageSkeletonWrapper>
  );
}
