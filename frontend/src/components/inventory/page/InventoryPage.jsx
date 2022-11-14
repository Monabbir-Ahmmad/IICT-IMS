import { Button, LinearProgress, Stack, Typography } from "@mui/material";
import InventroyProductListTable from "../ui/InventoryProductListTable";
import { useEffect } from "react";
import { RiAddFill as AddIcon } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getInventoryList } from "../../../redux/actions/inventory.actions";
import { useState } from "react";
import InventoryProductDetailsDialog from "../ui/InventoryProductDetailsDialog";
import SearchFilter from "../../shared/searchFilter/SearchFilter";

function InventoryPage() {
  const dispatch = useDispatch();

  const { inventoryList, loading } = useSelector(
    (state) => state.inventoryList
  );

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [inventoryProductId, setInventoryProductId] = useState(null);

  useEffect(() => {
    dispatch(getInventoryList());
  }, [dispatch]);

  const onRowClick = (id) => {
    setInventoryProductId(id);
    setOpenDetailsDialog(true);
  };

  return (
    <Stack spacing={3}>
      <InventoryProductDetailsDialog
        open={openDetailsDialog}
        onClose={() => setOpenDetailsDialog(false)}
        inventoryProductId={inventoryProductId}
      />

      {loading && <LinearProgress />}

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ alignSelf: "start" }}
      >
        Add Directly Purchased Products
      </Button>

      <Typography variant="h5">Product list</Typography>

      <div>
        <SearchFilter />

        <InventroyProductListTable
          data={inventoryList}
          onRowOpenClick={onRowClick}
        />
      </div>
    </Stack>
  );
}
export default InventoryPage;
