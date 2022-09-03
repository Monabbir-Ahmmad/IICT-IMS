import { Box, Button, IconButton, InputBase, Paper } from "@mui/material";
import React from "react";
import { BiSearch as SearchIcon, BiFilter as FilterIcon } from "react-icons/bi";

function ProductSearch() {
  return (
    <Box display={"flex"} gap={2}>
      <Paper
        variant="outlined"
        sx={{
          p: "2px 2px",
          display: "flex",
          alignItems: "center",
          justifySelf: "start",
          maxWidth: 500,
          width: 1,
        }}
      >
        <IconButton color={"primary"}>
          <SearchIcon />
        </IconButton>
        <InputBase placeholder="Search product" sx={{ px: 2, flex: 1 }} />
      </Paper>

      <Button size="large" variant="contained" startIcon={<FilterIcon />}>
        Filter
      </Button>
    </Box>
  );
}

export default ProductSearch;
