import { Alert, Stack, Typography } from "@mui/material";
import InventroyProductListTable from "../ui/InventoryProductListTable";
import { useEffect } from "react";
import { useState } from "react";
import SearchFilter from "../../shared/searchFilter/SearchFilter";
import { inventoryFilterDef } from "../../shared/searchFilter/filterData";
import inventoryService from "../../../services/inventory.service";
import { useNavigate } from "react-router-dom";
import ProductStatusUpdaterDialog from "../ui/ProductStatusUpdaterDialog";
import { useDispatch } from "react-redux";
import { showSuccessAlert } from "../../../redux/actions/alertSnackbar.actions";

function InventoryPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inventoryList, setInventoryList] = useState({
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

  const [productToEdit, setProductToEdit] = useState();

  useEffect(() => {
    getInventory(filter, sort, pagination.pageNumber);
  }, [filter, sort, pagination]);

  useEffect(() => {
    setPagination({ pageNumber: 0 });
  }, [filter, sort]);

  const onRowClick = (id) => {
    navigate(`./${id}`);
  };

  const onSortChange = (sortModel) => {
    setSort({
      sortColumn: inventoryFilterDef.find(
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

  const getInventory = async () => {
    setInventoryList({ ...inventoryList, loading: true, error: null });
    try {
      const { data } = await inventoryService.getList(
        filter,
        sort,
        pagination.pageNumber
      );
      setInventoryList({
        data:
          pagination.pageNumber === 0
            ? data.data
            : [...inventoryList.data, ...data.data],
        rowCount: data.totalCount,
        loading: false,
        error: null,
      });
    } catch (error) {
      setInventoryList({
        data: [],
        rowCount: 0,
        loading: false,
        error: error.message,
      });
    }
  };

  const onStatusEditClick = (id) => {
    setProductToEdit(id);
  };

  const onStatusEditConfirm = async (id, status) => {
    setProductToEdit(null);
    setInventoryList({ ...inventoryList, loading: true, error: null });
    try {
      await inventoryService.updateProductStatus(id, status);
      setInventoryList({
        ...inventoryList,
        data: inventoryList.data.map((p) =>
          p.id === id ? { ...p, status } : p
        ),
        loading: false,
      });

      dispatch(showSuccessAlert("Product status updated successfully"));
    } catch (error) {
      setInventoryList({
        ...inventoryList,
        loading: false,
        error: error.message,
      });
    }
  };

  return (
    <Stack spacing={3}>
      {inventoryList.error && (
        <Alert severity="error">{inventoryList.error}</Alert>
      )}

      <ProductStatusUpdaterDialog
        open={!!productToEdit}
        onClose={() => setProductToEdit(null)}
        onConfirmStatusChange={onStatusEditConfirm}
        inventoryProductId={productToEdit}
      />

      <Typography variant="h5">Product list</Typography>

      <div>
        <SearchFilter
          filterDef={inventoryFilterDef}
          onApply={onFilterApply}
          onClear={onFilterClear}
        />

        <InventroyProductListTable
          loading={inventoryList.loading}
          data={inventoryList.data}
          onRowOpenClick={onRowClick}
          onSortChange={onSortChange}
          onPageChange={onPageChange}
          pageNumber={pagination.pageNumber}
          rowCount={inventoryList.rowCount}
          pageSize={20}
          onStatusEditClick={onStatusEditClick}
        />
      </div>
    </Stack>
  );
}
export default InventoryPage;
