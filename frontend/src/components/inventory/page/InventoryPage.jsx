import { Button, LinearProgress, Stack, Typography } from "@mui/material";
import {
  RiUploadFill as DistributeIcon,
  RiDownloadFill as ReturnReceiveIcon,
} from "react-icons/ri";
import InventroyProductListTable from "../ui/InventoryProductListTable";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getInventoryList } from "../../../redux/actions/inventory.action";

function InventoryPage() {
  const dispatch = useDispatch();

  const { inventoryList, loading } = useSelector(
    (state) => state.inventoryList
  );

  useEffect(() => {
    dispatch(getInventoryList());
  }, [dispatch]);

  const onRowDelete = (id) => {};

  const onRowClick = (id) => {};

  return (
    <Stack spacing={3}>
      <Stack direction={"row"} spacing={3}>
        <Button
          component={Link}
          to="./distribute"
          variant="contained"
          startIcon={<DistributeIcon />}
        >
          Distribute Products
        </Button>

        <Button
          component={Link}
          to="./receive"
          variant="contained"
          startIcon={<ReturnReceiveIcon />}
        >
          Receive Returned Products
        </Button>
      </Stack>

      {loading && <LinearProgress />}

      <Typography variant="h5">Product list</Typography>

      <InventroyProductListTable
        data={inventoryList}
        onRowOpenClick={onRowClick}
        onRowDeleteClick={onRowDelete}
      />
    </Stack>
  );
}
export default InventoryPage;
