import { Alert, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import purchaseOrderService from "../../../services/purchaseOrder.service";
import { purchaseOrderFilterDef } from "../../shared/searchFilter/filterData";
import SearchFilter from "../../shared/searchFilter/SearchFilter";
import PurchaseOrderTable from "../ui/PurchaseOrderTable";

function PurchaseOrderPage() {
  const navigate = useNavigate();

  const [purchaseOrders, setPurchaseOrders] = useState({
    data: [],
    rowCount: 0,
    loading: false,
    error: null,
  });

  const [filter, setFilter] = useState();
  const [sort, setSort] = useState();
  const [pagination, setPagination] = useState({
    pageNumber: 0,
  });

  useEffect(() => {
    getOrders();
  }, [filter, sort, pagination]);

  useEffect(() => {
    setPagination({ pageNumber: 0 });
  }, [filter, sort]);

  const onSortChange = (sortModel) => {
    setSort({
      sortColumn: purchaseOrderFilterDef.find(
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

  const getOrders = async () => {
    setPurchaseOrders({ ...purchaseOrders, loading: true });
    try {
      const { data } = await purchaseOrderService.getList(
        filter,
        sort,
        pagination.pageNumber
      );
      setPurchaseOrders({
        data:
          pagination.pageNumber === 0
            ? data.data
            : [...purchaseOrders.data, ...data.data],
        rowCount: data.totalCount,
        loading: false,
        error: null,
      });
    } catch (error) {
      setPurchaseOrders({
        data: [],
        rowCount: 0,
        loading: false,
        error: error.message,
      });
    }
  };

  const onRowClick = (id) => {
    navigate("./" + id);
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Purchase Orders</Typography>

      {purchaseOrders.error && (
        <Alert severity="error">{purchaseOrders.error}</Alert>
      )}

      <div>
        <SearchFilter
          filterDef={purchaseOrderFilterDef}
          onApply={onFilterApply}
          onClear={onFilterClear}
        />
        <PurchaseOrderTable
          data={purchaseOrders.data}
          onRowOpenClick={onRowClick}
          loading={purchaseOrders.loading}
          onSortChange={onSortChange}
          onPageChange={onPageChange}
          pageNumber={pagination.pageNumber}
          rowCount={purchaseOrders.rowCount}
          pageSize={25}
        />
      </div>
    </Stack>
  );
}
export default PurchaseOrderPage;
