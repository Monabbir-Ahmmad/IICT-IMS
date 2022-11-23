import {
  Alert,
  Divider,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import inventoryService from "../../../services/inventory.service";
import ReceiveDetailsProductTable from "../ui/ReceiveDetailsProductTable";

function ReceiveReturnDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [receiveReturn, setReceiveReturn] = useState({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    getInventoryProduct();
  }, []);

  const getInventoryProduct = async () => {
    setReceiveReturn({ ...receiveReturn, loading: true, error: null });
    try {
      const { data } = await inventoryService.getReceiveReturn(id);
      setReceiveReturn({ ...receiveReturn, data, loading: false });
    } catch (error) {
      setReceiveReturn({
        ...receiveReturn,
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
      {receiveReturn.loading && <LinearProgress />}

      {receiveReturn.error && (
        <Alert severity="error">{receiveReturn.error}</Alert>
      )}

      <Typography variant="h5">Receive #{receiveReturn.data?.id}</Typography>

      <Paper variant="outlined">
        <Stack spacing={3} p={3}>
          <Typography variant="h6">Details</Typography>

          <Divider />

          <Typography variant={"body1"}>
            Receiver: <strong>{receiveReturn.data?.receiverName}</strong>
          </Typography>

          <Typography variant={"body1"}>
            Returner: <strong>{receiveReturn.data?.receivedFromName}</strong>
          </Typography>

          <Typography variant={"body1"}>
            Receiving Date:{" "}
            <strong>
              {moment(receiveReturn.data?.receivingDate).format(
                "Do MMMM, YYYY"
              )}
            </strong>
          </Typography>

          <Typography variant={"body1"}>
            Received Item count:{" "}
            <strong>{receiveReturn.data?.products?.length}</strong>
          </Typography>
        </Stack>
      </Paper>

      <Typography variant="h6">Products</Typography>
      <ReceiveDetailsProductTable
        data={receiveReturn.data?.products}
        onRowClick={onProductsRowClick}
      />
    </Stack>
  );
}
export default ReceiveReturnDetailsPage;
