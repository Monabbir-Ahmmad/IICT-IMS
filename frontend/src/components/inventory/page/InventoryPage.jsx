import { Button, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import InventroyProductListTable from "../ui/InventoryProductListTable";
import { RiAddLine as AddIcon } from "react-icons/ri";

function InventoryPage() {
  const onRowDelete = (id) => {};

  const onRowClick = (id) => {};

  return (
    <Stack spacing={3}>
      <Button
        component={Link}
        to="./create"
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ alignSelf: "start" }}
      >
        Add new product
      </Button>

      <Typography variant="h5" sx={{ pt: 3 }}>
        Product list
      </Typography>

      <Paper variant="outlined">
        <InventroyProductListTable
          data={[]}
          onRowOpenClick={onRowClick}
          onRowDeleteClick={onRowDelete}
        />
      </Paper>
    </Stack>
  );
}
export default InventoryPage;
