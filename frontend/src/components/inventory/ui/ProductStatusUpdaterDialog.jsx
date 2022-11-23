import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInventoryProduct } from "../../../redux/actions/inventory.actions";
import moment from "moment";
import { currencyFormatter } from "../../../utils/utilities";
import { UpdatableStatus } from "../../../constants/enums";

function ProductStatusUpdaterDialog({
  open,
  onClose,
  onConfirmStatusChange,
  inventoryProductId,
}) {
  const dispatch = useDispatch();

  const { loading, error, inventoryProduct } = useSelector(
    (state) => state.inventoryProductDetails
  );

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (inventoryProductId && open)
      dispatch(getInventoryProduct(inventoryProductId));
  }, [dispatch, inventoryProductId, open]);

  useEffect(() => {
    if (inventoryProduct && UpdatableStatus.includes(inventoryProduct.status))
      setStatus(inventoryProduct.status);
  }, [inventoryProduct]);

  const onConfirm = () => {
    onConfirmStatusChange(inventoryProductId, status);
  };

  return (
    <Dialog
      fullWidth
      maxWidth={"sm"}
      scroll={"paper"}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { bgcolor: "background.paper", backgroundImage: "none" },
      }}
    >
      <DialogTitle>Update Product Status</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2}>
          {loading && <LinearProgress />}

          {error && <Alert severity="error">{error}</Alert>}

          <Typography variant="body1">
            Product ID: <strong>{inventoryProduct?.id}</strong>
          </Typography>

          <Typography variant="body1">
            Product Name: <strong>{inventoryProduct?.name}</strong>
          </Typography>

          <Typography variant="body1">
            Product Category: <strong>{inventoryProduct?.category}</strong>
          </Typography>

          <Typography variant="body1">
            Product Manufacturer:{" "}
            <strong>{inventoryProduct?.manufacturer}</strong>
          </Typography>

          <Typography variant="body1">
            Product Price:{" "}
            <strong>
              {currencyFormatter().format(inventoryProduct?.price)}
            </strong>
          </Typography>

          <Typography variant="body1">
            Product Warranty Expiry Date:{" "}
            <strong>
              {inventoryProduct?.warrantyExpiryDate
                ? moment(inventoryProduct?.warrantyExpiryDate).format(
                    "Do MMMM, YYYY"
                  )
                : "N/A"}
            </strong>
          </Typography>

          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value)}
            >
              {UpdatableStatus.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={onConfirm} disabled={!status}>
          Confirm Status Change
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default ProductStatusUpdaterDialog;
