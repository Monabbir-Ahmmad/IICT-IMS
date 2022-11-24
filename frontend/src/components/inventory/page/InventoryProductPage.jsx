import { Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import inventoryService from "../../../services/inventory.service";
import { currencyFormatter, statusColors } from "../../../utils/utilities";
import InventoryProductDirectPurchaseDetails from "../ui/InventoryProductDirectPurchaseDetails";
import InventoryProductPrinter from "../ui/InventoryProductPrinter";
import InventoryProductPurchaseDetails from "../ui/InventoryProductPurchaseDetails";

function InventoryProductPage() {
  const { id } = useParams();

  const [inventoryProduct, setInventoryProduct] = useState({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    getInventoryProduct();
  }, []);

  const getInventoryProduct = async () => {
    setInventoryProduct({ ...inventoryProduct, loading: true, error: null });
    try {
      const { data } = await inventoryService.get(id);
      setInventoryProduct({ ...inventoryProduct, data, loading: false });
    } catch (error) {
      setInventoryProduct({
        ...inventoryProduct,
        error: error.message,
        loading: false,
      });
    }
  };

  return (
    <Stack spacing={2}>
      <Stack
        spacing={2}
        direction={{ xs: "column", lg: "row" }}
        justifyContent={{ xs: "start", lg: "space-between" }}
        alignItems={{ xs: "start", lg: "center" }}
      >
        <Typography variant="h5">
          Product #{inventoryProduct.data?.id}{" "}
          <Chip
            variant="outlined"
            label={inventoryProduct.data?.status}
            color={statusColors[inventoryProduct.data?.status]}
          />
        </Typography>

        <InventoryProductPrinter inventoryProduct={inventoryProduct.data} />
      </Stack>

      <Paper variant="outlined">
        <Stack spacing={3} p={3}>
          <Typography variant="h6">Product Info</Typography>

          <Divider />

          <Typography variant={"body1"}>
            Name: <strong>{inventoryProduct.data?.name}</strong>
          </Typography>

          <Typography variant={"body1"}>
            Category: <strong>{inventoryProduct.data?.category}</strong>
          </Typography>

          <Typography variant={"body1"}>
            Manufacturer: <strong>{inventoryProduct.data?.manufacturer}</strong>
          </Typography>

          <Typography variant={"body1"}>
            Price:{" "}
            <strong>
              {currencyFormatter().format(inventoryProduct.data?.price)}
            </strong>
          </Typography>

          <Typography variant={"body1"}>
            Warranty Expiry Date:{" "}
            <strong>
              {inventoryProduct.data?.warrantyExpiryDate
                ? moment(inventoryProduct.data?.warrantyExpiryDate).format(
                    "Do MMMM, YYYY"
                  )
                : "N/A"}
            </strong>
          </Typography>

          <Typography variant={"body1"}>
            Details: <strong>{inventoryProduct.data?.details}</strong>
          </Typography>
        </Stack>
      </Paper>

      {inventoryProduct.data?.directPurchase && (
        <InventoryProductDirectPurchaseDetails
          purchase={inventoryProduct.data?.directPurchase}
        />
      )}

      {inventoryProduct.data?.purchaseOrder && (
        <InventoryProductPurchaseDetails
          purchaseOrder={inventoryProduct.data?.purchaseOrder}
        />
      )}
    </Stack>
  );
}
export default InventoryProductPage;
