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
import DistributionDetailsProductTable from "../ui/DistributionDetailsProductTable";

function DistributionDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [distribution, setDistribution] = useState({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    getInventoryProduct();
  }, []);

  const getInventoryProduct = async () => {
    setDistribution({ ...distribution, loading: true, error: null });
    try {
      const { data } = await inventoryService.getDistribution(id);
      setDistribution({ ...distribution, data, loading: false });
    } catch (error) {
      setDistribution({
        ...distribution,
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
      {distribution.loading && <LinearProgress />}

      {distribution.error && (
        <Alert severity="error">{distribution.error}</Alert>
      )}

      <Typography variant="h5">
        Distribution #{distribution.data?.id}
      </Typography>

      <Paper variant="outlined">
        <Stack spacing={3} p={3}>
          <Typography variant="h6">Details</Typography>

          <Divider />

          <Typography variant={"body1"}>
            Distributor: <strong>{distribution.data?.distributorName}</strong>
          </Typography>

          <Typography variant={"body1"}>
            Distributee: <strong>{distribution.data?.distributedToName}</strong>
          </Typography>

          <Typography variant={"body1"}>
            Distribution Date:{" "}
            <strong>
              {moment(distribution.data?.distributionDate).format(
                "Do MMMM, YYYY"
              )}
            </strong>
          </Typography>

          <Typography variant={"body1"}>
            Distribution Room:{" "}
            <strong>{distribution.data?.distributionRoom}</strong>
          </Typography>

          <Typography variant={"body1"}>
            Distributed Item count:{" "}
            <strong>{distribution.data?.products?.length}</strong>
          </Typography>
        </Stack>
      </Paper>

      <Typography variant="h6">Products</Typography>
      <DistributionDetailsProductTable
        data={distribution.data?.products}
        onRowClick={onProductsRowClick}
      />
    </Stack>
  );
}
export default DistributionDetailsPage;
