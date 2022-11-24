import { Alert, Button, Stack, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { RiUploadFill as DistributeIcon } from "react-icons/ri";
import DistributionHistoryTable from "../ui/DistributionHistoryTable";
import { useEffect, useState } from "react";
import inventoryService from "../../../services/inventory.service";
import SearchFilter from "../../shared/searchFilter/SearchFilter";
import { distributorHistoryFilterDef } from "../../shared/searchFilter/filterData";

function DistributionPage() {
  const navigate = useNavigate();

  const [distributionHistory, setDistributionHistory] = useState({
    data: [],
    rowCount: 0,
    loading: true,
    error: null,
  });

  const [filter, setFilter] = useState();
  const [sort, setSort] = useState();
  const [pagination, setPagination] = useState({
    pageNumber: 0,
  });

  useEffect(() => {
    getDistributionHistory();
  }, [filter, sort, pagination]);

  useEffect(() => {
    setPagination({ pageNumber: 0 });
  }, [filter, sort]);

  const onRowClick = (id) => {
    navigate(`./${id}`);
  };

  const onSortChange = (sortModel) => {
    setSort({
      sortColumn: distributorHistoryFilterDef.find(
        (f) => f.field === sortModel[0]?.field
      )?.key,
      sortDirection: sortModel[0]?.sort,
    });
  };

  const onFilterApply = (filter) => {
    setFilter(filter);
  };

  const onFilterClear = () => {
    setFilter(null);
  };

  const onPageChange = (page) => {
    setPagination({
      pageNumber: page,
    });
  };

  const getDistributionHistory = async () => {
    try {
      const { data } = await inventoryService.getDistributionHistory(
        filter,
        sort,
        pagination.pageNumber
      );
      setDistributionHistory({
        data: data.data,
        rowCount: data.rowCount,
        loading: false,
        error: null,
      });
    } catch (error) {
      setDistributionHistory({
        data: [],
        rowCount: 0,
        loading: false,
        error: error.message,
      });
    }
  };

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

      {distributionHistory.error && (
        <Alert severity="error">{distributionHistory.error}</Alert>
      )}

      <div>
        <SearchFilter
          filterDef={distributorHistoryFilterDef}
          onApply={onFilterApply}
          onClear={onFilterClear}
        />

        <DistributionHistoryTable
          loading={distributionHistory.loading}
          data={distributionHistory.data}
          onRowOpenClick={onRowClick}
          onSortChange={onSortChange}
          onPageChange={onPageChange}
          pageNumber={pagination.pageNumber}
          rowCount={distributionHistory.rowCount}
          pageSize={25}
        />
      </div>
    </Stack>
  );
}
export default DistributionPage;
