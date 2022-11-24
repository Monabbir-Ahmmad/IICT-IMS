import { Alert, Button, Stack, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { RiDownloadFill as ReturnReceiveIcon } from "react-icons/ri";
import ReceiveReturnHistoryTable from "../ui/ReceiveReturnHistoryTable";
import { useEffect, useState } from "react";
import inventoryService from "../../../services/inventory.service";
import SearchFilter from "../../shared/searchFilter/SearchFilter";
import { receiveReturnHistoryFilterDef } from "../../shared/searchFilter/filterData";

function ReceiveReturnPage() {
  const navigate = useNavigate();

  const [receiveReturnHistory, setReceiveReturnHistory] = useState({
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
      sortColumn: receiveReturnHistoryFilterDef.find(
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
      const { data } = await inventoryService.getReceiveReturnHistory(
        filter,
        sort,
        pagination.pageNumber
      );
      setReceiveReturnHistory({
        data: data.data,
        rowCount: data.rowCount,
        loading: false,
        error: null,
      });
    } catch (error) {
      setReceiveReturnHistory({
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
        to="./receive"
        variant="contained"
        startIcon={<ReturnReceiveIcon />}
        sx={{ alignSelf: "start" }}
      >
        Receive Returned Products
      </Button>

      <Typography variant="h5">Receive Return History</Typography>

      {receiveReturnHistory.error && (
        <Alert severity="error">{receiveReturnHistory.error}</Alert>
      )}

      <div>
        <SearchFilter
          filterDef={receiveReturnHistoryFilterDef}
          onApply={onFilterApply}
          onClear={onFilterClear}
        />
        <ReceiveReturnHistoryTable
          loading={receiveReturnHistory.loading}
          data={receiveReturnHistory.data}
          onRowOpenClick={onRowClick}
          onSortChange={onSortChange}
          onPageChange={onPageChange}
          pageNumber={pagination.pageNumber}
          rowCount={receiveReturnHistory.rowCount}
          pageSize={20}
        />
      </div>
    </Stack>
  );
}
export default ReceiveReturnPage;
