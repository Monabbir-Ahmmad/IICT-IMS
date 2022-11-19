import { Alert, Button, Stack, Typography } from "@mui/material";
import InventroyProductListTable from "../ui/InventoryProductListTable";
import { useEffect } from "react";
import { RiAddFill as AddIcon } from "react-icons/ri";
import { useState } from "react";
import InventoryProductDetailsDialog from "../ui/InventoryProductDetailsDialog";
import SearchFilter from "../../shared/searchFilter/SearchFilter";
import { inventoryFilterDef } from "../../shared/searchFilter/filterData";
import inventoryService from "../../../services/inventory.service";

function InventoryPage() {
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

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [inventoryProductId, setInventoryProductId] = useState(null);

  useEffect(() => {
    getInventory(filter, sort, pagination.pageNumber);
  }, [filter, sort, pagination]);

  useEffect(() => {
    setPagination({ pageNumber: 0 });
  }, [filter, sort]);

  const onRowClick = (id) => {
    setInventoryProductId(id);
    setOpenDetailsDialog(true);
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
    setInventoryList({ ...inventoryList, loading: true });
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

  return (
    <Stack spacing={3}>
      <InventoryProductDetailsDialog
        open={openDetailsDialog}
        onClose={() => setOpenDetailsDialog(false)}
        inventoryProductId={inventoryProductId}
      />

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ alignSelf: "start" }}
      >
        Add Directly Purchased Products
      </Button>

      {inventoryList.error && (
        <Alert severity="error">{inventoryList.error}</Alert>
      )}

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
        />
      </div>
    </Stack>
  );
}
export default InventoryPage;
