import { Box, Skeleton } from "@mui/material";

const formArr = (v: number) => Array.from({ length: v });
type TProps = {
  row?: number;
  col?: number;
  className?: string;
};
export const TableSkeleton = (props: TProps) => {
  const { row = 5, col = 5, className } = props;
  return (
    <Box
      className={className}
      sx={{
        gap: "1rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {formArr(row).map((_, j) => (
        <Box
          key={j}
          sx={{
            gap: "1rem",
            display: "flex",
            flexDirection: "row",
          }}
        >
          {formArr(col).map((_, k) => (
            <Box sx={{ flex: 1 }} key={`${j}-${k}`}>
              <Skeleton height={50} animation="wave" variant="rectangular" />
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};
