import { Box, Button, Paper, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { BiPlus as AddIcon } from "react-icons/bi";
import { Link } from "react-router-dom";
import ProductSearch from "../components/product/ProductSearch";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "category",
    headerName: "Category",
    width: 200,
  },
  {
    field: "subCategory",
    headerName: "Sub-Category",
    width: 200,
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 200,
  },
  {
    field: "warranty",
    headerName: "Warranty Till",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 200,
  },
];

const rows = [
  {
    id: 1,
    category: "Category 1",
    subCategory: "Sub-Category 1",
    name: "Name 1",
    description: "Description 1",
    status: "Status 1",
    warranty: "01 Jan, 2024",
    price: "2000",
  },
  {
    id: 2,
    category: "Category 2",
    subCategory: "Sub-Category 2",
    name: "Name 2",
    description: "Description 2",
    status: "Status 2",
    warranty: "01 Jan, 2024",
    price: "2400",
  },
  {
    id: 3,
    category: "Category 3",
    subCategory: "Sub-Category 3",
    name: "Name 3",
    description: "Description 3",
    status: "Status 3",
    warranty: "01 Jan, 2024",
    price: "1400",
  },
  {
    id: 4,
    category: "Category 4",
    subCategory: "Sub-Category 4",
    name: "Name 4",
    description: "Description 4",
    status: "Status 4",
    warranty: "01 Jan, 2024",
    price: "2000",
  },
  {
    id: 5,
    category: "Category 5",
    subCategory: "Sub-Category 5",
    name: "Name 5",
    description: "Description 5",
    status: "Status 5",
    warranty: "01 Jan, 2024",
    price: "3000",
  },
  {
    id: 6,
    category: "Category 6",
    subCategory: "Sub-Category 6",
    name: "Name 6",
    description: "Description 6",
    status: "Status 6",
    warranty: "01 Jan, 2024",
    price: "2500",
  },
];

function ProductPage() {
  return (
    <Stack spacing={2}>
      <Box display={"flex"} gap={2}>
        <ProductSearch />

        <Button
          component={Link}
          to={"./add"}
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ ml: "auto" }}
        >
          Add product
        </Button>
      </Box>

      <Paper variant="outlined" sx={{ height: 700, width: 1 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          disableSelectionOnClick
          disableColumnFilter
          sortingMode={"server"}
          onSortModelChange={(e) => console.log(e)}
          sx={{ boxShadow: 0, border: 0 }}
        />
      </Paper>
    </Stack>
  );
}

export default ProductPage;
