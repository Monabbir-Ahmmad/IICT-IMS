import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getInventoryProduct } from "../../../redux/actions/inventory.actions";
import { Alert, LinearProgress, Stack } from "@mui/material";

function InventoryProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, error, inventoryProduct } = useSelector(
    (state) => state.inventoryProductDetails
  );

  useEffect(() => {
    // fetch product details
    dispatch(getInventoryProduct(id));
  }, [dispatch, id]);

  return (
    <Stack spacing={2}>
      {loading && <LinearProgress />}

      {error && <Alert severity="error">{error}</Alert>}

      <div>{inventoryProduct?.id}</div>
    </Stack>
  );
}
export default InventoryProductDetailsPage;
