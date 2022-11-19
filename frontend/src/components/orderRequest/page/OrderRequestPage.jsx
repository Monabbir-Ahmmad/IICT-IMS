import { Alert, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import purchaseOrderService from "../../../services/purchaseOrder.service";
import { orderRequestFilterDef } from "../../shared/searchFilter/filterData";
import SearchFilter from "../../shared/searchFilter/SearchFilter";
import OrderRequestTable from "../ui/OrderRequestTable";

function OrderRequestPage() {
  const navigate = useNavigate();

  const [orderRequests, setOrderRequests] = useState({
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
      sortColumn: orderRequestFilterDef.find(
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
    setOrderRequests({ ...orderRequests, loading: true });
    try {
      const { data } = await purchaseOrderService.getOrderRequestList(
        filter,
        sort,
        pagination.pageNumber
      );
      setOrderRequests({
        data:
          pagination.pageNumber === 0
            ? data.data
            : [...orderRequests.data, ...data.data],
        rowCount: data.totalCount,
        loading: false,
        error: null,
      });
    } catch (error) {
      setOrderRequests({
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
      <Typography variant="h5">Order Requests</Typography>

      {orderRequests.error && (
        <Alert severity="error">{orderRequests.error}</Alert>
      )}

      <div>
        <SearchFilter
          filterDef={orderRequestFilterDef}
          onApply={onFilterApply}
          onClear={onFilterClear}
        />

        <OrderRequestTable
          data={orderRequests.data}
          loading={orderRequests.loading}
          onRowOpenClick={onRowClick}
          onSortChange={onSortChange}
          onPageChange={onPageChange}
          pageNumber={pagination.pageNumber}
          rowCount={orderRequests.rowCount}
          pageSize={20}
        />
      </div>
    </Stack>
  );
}
export default OrderRequestPage;
