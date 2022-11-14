import {
  Alert,
  Button,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { RiDownloadFill as ReturnReceiveIcon } from "react-icons/ri";
import ReceiveReturnHistoryTable from "../ui/ReceiveReturnHistoryTable";
import { useEffect, useState } from "react";
import inventoryService from "../../../services/inventory.service";
import SearchFilter from "../../shared/searchFilter/SearchFilter";

function ReceiveReturnPage() {
  const [receiveReturnHistory, setReceiveReturnHistory] = useState({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await inventoryService.getReceiveReturnHistory();
        setReceiveReturnHistory({
          data: res.data,
          loading: false,
          error: null,
        });
      } catch (error) {
        setReceiveReturnHistory({
          data: [],
          loading: false,
          error: error.message,
        });
      }
    })();
  }, []);

  return (
    <Stack spacing={3}>
      <Button
        component={Link}
        to="./receive"
        variant="contained"
        startIcon={<ReturnReceiveIcon />}
        sx={{ alignSelf: "start" }}
      >
        Receive Returned Products
      </Button>

      <Typography variant="h5">Receive Return History</Typography>

      {receiveReturnHistory.loading && <LinearProgress />}

      {receiveReturnHistory.error && (
        <Alert severity="error">{receiveReturnHistory.error}</Alert>
      )}

      <div>
        <SearchFilter />
        <ReceiveReturnHistoryTable data={receiveReturnHistory.data} />
      </div>
    </Stack>
  );
}
export default ReceiveReturnPage;
