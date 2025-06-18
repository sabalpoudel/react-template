import { Box, Skeleton } from "@mui/material";

const arr = Array.from({ length: 6 });
export const PostLikeSkeleton = () => {
  return (
    <>
      {arr.map((_, j) => (
        <Box
          key={j}
          sx={{
            gap: "1rem",
            width: "90%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Skeleton
            width={40}
            height={40}
            animation="wave"
            variant="circular"
          />
          <Box sx={{ flex: 1 }}>
            <Skeleton
              height={10}
              width="80%"
              animation="wave"
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="40%" />
          </Box>
        </Box>
      ))}
    </>
  );
};
