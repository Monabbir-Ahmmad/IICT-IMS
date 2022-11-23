import {
  Alert,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInventoryProduct } from "../../../redux/actions/inventory.actions";
import moment from "moment";
import { currencyFormatter, statusColors } from "../../../utils/utilities";

function InventoryProductDetailsDialog({ open, onClose, inventoryProductId }) {
  const dispatch = useDispatch();

  const { loading, error, inventoryProduct } = useSelector(
    (state) => state.inventoryProductDetails
  );

  useEffect(() => {
    if (inventoryProductId && open)
      dispatch(getInventoryProduct(inventoryProductId));
  }, [dispatch, inventoryProductId, open]);

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
      <DialogTitle>
        Product ID: <strong>{inventoryProduct?.id}</strong>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          {loading && <LinearProgress />}

          {error && <Alert severity="error">{error}</Alert>}

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

          <Typography variant="body1">
            Product Status:{" "}
            <Chip
              variant="outlined"
              label={inventoryProduct?.status}
              color={statusColors[inventoryProduct?.status]}
            />
          </Typography>

          <Typography variant="body1">
            Product Details: <strong>{inventoryProduct?.details}</strong>
          </Typography>

          {inventoryProduct?.currentDistribution && (
            <>
              <Divider />

              <Typography variant="h6">Current Distribution Details</Typography>

              <Typography variant="body1">
                Distribution ID:{" "}
                <strong>{inventoryProduct?.currentDistribution?.id}</strong>
              </Typography>

              <Typography variant="body1">
                Distributor:{" "}
                <strong>
                  {inventoryProduct?.currentDistribution?.distributorName}
                </strong>
              </Typography>

              <Typography variant="body1">
                Distributed To:{" "}
                <strong>
                  {inventoryProduct?.currentDistribution?.distributedToName}
                </strong>
              </Typography>

              <Typography variant="body1">
                Distribution Date:{" "}
                <strong>
                  {moment(
                    inventoryProduct?.currentDistribution?.distributionDate
                  ).format("Do MMMM, YYYY")}
                </strong>
              </Typography>

              <Typography variant="body1">
                Distribution Room:{" "}
                <strong>
                  {inventoryProduct?.currentDistribution?.distributionRoom}
                </strong>
              </Typography>
            </>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
export default InventoryProductDetailsDialog;
