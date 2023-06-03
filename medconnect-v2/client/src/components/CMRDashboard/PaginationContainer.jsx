import { React, useMemo } from "react";
import { Box, Pagination, PaginationItem } from "@mui/material";

const PaginationContainer = ({ page, totalResults, limit, setPage }) => {
  const totalPages = useMemo(
    () => Math.ceil(totalResults / limit),
    [totalResults, limit]
  );

  console.log("totalPages:", totalPages);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      padding="1rem"
      marginTop="0.5rem"
    >
      <Pagination
        page={page}
        count={
          totalResults > 0 && limit > 0 ? Math.ceil(totalResults / limit) : 0
        }
        size="small"
        shape="rounded"
        renderItem={(item) => <PaginationItem {...item} color="primary" />}
        onChange={handleChange}
      />
    </Box>
  );
};

export default PaginationContainer;
