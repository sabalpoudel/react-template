import { Box, Skeleton } from "@mui/material";

type TProps = {
  size?: number;
  length?: number;
};
export const FilesSkeleton = (props: TProps) => {
  const { size = 200, length = 12 } = props;
  return (
    <Box
      sx={{
        gap: "1rem",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {Array.from({ length }).map((_, j) => (
        <Skeleton key={j} variant="rounded" width={size} height={size} />
      ))}
    </Box>
  );
};
