import {
  Alert,
  Divider,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import directPurchaseService from "../../../services/directPurchase.service";
import DirectPurchaseDetailsProductTable from "../../distribution/ui/DirectPurchaseDetailsProductTable";
import { currencyFormatter } from "../../../utils/utilities";
import ImageViewer from "../../shared/imageViewer/ImageViewer";
import { IMAGE_HOST_URL } from "../../../constants/apiLinks";

function DirectPurchaseDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [purchase, setPurchase] = useState({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    getDirectPurchase();
  }, [id]);

  const getDirectPurchase = async () => {
    setPurchase({ ...purchase, loading: true, error: null });
    try {
      const { data } = await directPurchaseService.get(id);
      setPurchase({ ...purchase, data, loading: false });
    } catch (error) {
      setPurchase({
        ...purchase,
        error: error.message,
        loading: false,
      });
    }
  };

  const onProductsRowClick = (id) => {
    navigate(`/inventory/${id}`);
  };

  return (
    <Stack spacing={2}>
      {purchase.loading && <LinearProgress />}

      {purchase.error && <Alert severity="error">{purchase.error}</Alert>}

      <Typography variant="h5">Direct Purchase #{purchase.data?.id}</Typography>

      {purchase.data?.voucher && (
        <ImageViewer
          image={IMAGE_HOST_URL + purchase.data?.voucher?.fileName}
          buttonText="View Voucher"
          title="Voucher"
        />
      )}

      <Paper variant="outlined">
        <Stack spacing={3} p={3}>
          <Typography variant="h6">Purchase Details</Typography>

          <Divider />

          <Typography variant={"body1"}>
            Title: <strong>{purchase.data?.title}</strong>
          </Typography>

          <Typography variant={"body1"}>
            Category: <strong>{purchase.data?.category}</strong>
          </Typography>

          <Typography variant={"body1"}>
            Purchasing Date:{" "}
            <strong>
              {moment(purchase.data?.distributionDate).format("Do MMMM, YYYY")}
            </strong>
          </Typography>

          <Typography variant={"body1"}>
            Total Price:{" "}
            <strong>
              {currencyFormatter().format(purchase.data?.totalPrice)}
            </strong>
          </Typography>

          <Typography variant={"body1"}>
            Supplier Name: <strong>{purchase.data?.supplierName}</strong>
          </Typography>

          <Typography variant={"body1"}>
            Supplier Contact Number:{" "}
            <strong>{purchase.data?.supplierContact}</strong>
          </Typography>

          <Typography variant={"body1"}>
            Supplier Address: <strong>{purchase.data?.supplierAddress}</strong>
          </Typography>
        </Stack>
      </Paper>

      <Typography variant="h6">Products</Typography>

      <DirectPurchaseDetailsProductTable
        data={purchase.data?.products}
        onRowClick={onProductsRowClick}
      />
    </Stack>
  );
}
export default DirectPurchaseDetailsPage;
