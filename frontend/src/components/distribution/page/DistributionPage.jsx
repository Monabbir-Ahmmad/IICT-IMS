import {
  Alert,
  Button,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { RiUploadFill as DistributeIcon } from "react-icons/ri";
import DistributionHistoryTable from "../ui/DistributionHistoryTable";
import { useEffect, useState } from "react";
import inventoryService from "../../../services/inventory.service";
import SearchFilter from "../../shared/searchFilter/SearchFilter";

function DistributionPage() {
  const [distributionHistory, setDistributionHistory] = useState({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await inventoryService.getDistributionHistory();
        setDistributionHistory({
          data: res.data,
          loading: false,
          error: null,
        });
      } catch (error) {
        setDistributionHistory({
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
        to="./distribute"
        variant="contained"
        startIcon={<DistributeIcon />}
        sx={{ alignSelf: "start" }}
      >
        Distribute Products
      </Button>

      <Typography variant="h5">Distribution History</Typography>

      {distributionHistory.loading && <LinearProgress />}

      {distributionHistory.error && (
        <Alert severity="error">{distributionHistory.error}</Alert>
      )}

      <div>
        <SearchFilter />

        <DistributionHistoryTable data={distributionHistory.data} />
      </div>
    </Stack>
  );
}
export default DistributionPage;
