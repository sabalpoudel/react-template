import { Box, Skeleton } from "@mui/material";

type TProps = {
  width?: number;
  height?: number;
  length?: number;
};

export const FollowCardSkeleton = (props: TProps) => {
  const { width = "10rem", height = "12rem", length = 3 } = props;

  return (
    <>
      {Array.from({ length }).map((_, j) => (
        <Box
          key={j}
          sx={{
            width,
            height,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          }}
        >
          <Skeleton variant="rounded" width={"100%"} height={"50%"} />
          <Skeleton
            variant="text"
            sx={{ fontSize: "1rem", width: "80%", marginInline: "auto" }}
          />
          <Skeleton
            variant="text"
            sx={{ fontSize: "0.8rem", width: "60%", marginInline: "auto" }}
          />
          <Skeleton variant="rounded" width={"100%"} height={40} />
        </Box>
      ))}
    </>
  );
};
