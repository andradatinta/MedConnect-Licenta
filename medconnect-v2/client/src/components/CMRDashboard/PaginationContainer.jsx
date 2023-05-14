import React from "react";
import { Box, Pagination, PaginationItem } from "@mui/material";

const PaginationContainer = ({ page, totalSearchedUsers, limit, setPage }) => {
  const totalPages = Math.ceil(totalSearchedUsers / limit);

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
          totalSearchedUsers > 0 && limit > 0
            ? Math.ceil(totalSearchedUsers / limit)
            : 0
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
