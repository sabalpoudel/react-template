import { Box, Skeleton } from "@mui/material";

type TProps = {
  width?: number;
  height?: number;
  length?: number;
};

export const ProductCardSkeleton = (props: TProps) => {
  const { width = "100%", height = "25rem", length = 4 } = props;

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
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <Skeleton variant="rounded" width={"100%"} height={"50%"} />
          <Box sx={{ padding: "1rem" }}>
            <Box
              sx={{
                display: "flex",
                gap: "0.5rem",
                marginBottom: "1rem",
              }}
            >
              <Skeleton variant="circular" width={"30px"} height={"30px"} />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem", width: "50%" }}
              />
            </Box>
            <Skeleton
              variant="text"
              sx={{ fontSize: "0.8rem", width: "100%" }}
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: "0.8rem", width: "80%" }}
            />

            <Box sx={{ marginTop: "1rem" }}>
              <Skeleton
                variant="text"
                sx={{ fontSize: "0.8rem", width: "20%" }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "0.8rem", width: "60%" }}
              />
            </Box>
          </Box>
        </Box>
      ))}
    </>
  );
};
