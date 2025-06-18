import { SkeletonWrapper } from "./SkeletonWrapper";

const repeat = [1, 2, 3, 4];
export const PostCardSkeleton = () => {
  return (
    <SkeletonWrapper className="sw-pc">
      <div className="sw-pc-absolute">
        <div className="sw-pc">
          <div className="sw-pc-header">
            <div className="sw-pc-header-img"></div>
            <div className="sw-pc-header-info">
              <div className="sw-pc-header-info-title"></div>
              <div className="sw-pc-header-info-username"></div>
            </div>
          </div>
          <div className="sw-pc-body">
            {repeat.map((i) => (
              <div key={i} className="sw-pc-body-item" />
            ))}
          </div>
          <div className="sw-pc-footer">
            {repeat.map((i) => (
              <div key={i} className="sw-pc-footer-item" />
            ))}
          </div>
        </div>
      </div>
    </SkeletonWrapper>
  );
};
