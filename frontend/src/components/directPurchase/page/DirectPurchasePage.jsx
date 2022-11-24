import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { RiAddFill as AddIcon } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import directPurchaseService from "../../../services/directPurchase.service";
import { directPurchaseFilterDef } from "../../shared/searchFilter/filterData";
import SearchFilter from "../../shared/searchFilter/SearchFilter";
import DirectPurchaseTable from "../ui/DirectPurchaseTable";

function DirectPurchasePage() {
  const navigate = useNavigate();

  const [purchases, setPurchases] = useState({
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
    getPurchases();
  }, [filter, sort, pagination]);

  useEffect(() => {
    setPagination({ pageNumber: 0 });
  }, [filter, sort]);

  const onSortChange = (sortModel) => {
    setSort({
      sortColumn: directPurchaseFilterDef.find(
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

  const getPurchases = async () => {
    setPurchases({ ...purchases, loading: true, error: null });
    try {
      const { data } = await directPurchaseService.getList(
        filter,
        sort,
        pagination.pageNumber
      );
      setPurchases({
        ...purchases,
        data:
          pagination.pageNumber === 0
            ? data.data
            : [...purchases.data, ...data.data],
        rowCount: data.totalCount,
        loading: false,
      });
    } catch (error) {
      setPurchases({
        ...purchases,
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
    <Stack spacing={3}>
      <Button
        component={Link}
        to="./create"
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ alignSelf: "start" }}
      >
        Add Directly Purchased Products
      </Button>

      <Typography variant="h5">Direct Purchases</Typography>

      <div>
        <SearchFilter
          filterDef={directPurchaseFilterDef}
          onApply={onFilterApply}
          onClear={onFilterClear}
        />

        <DirectPurchaseTable
          loading={purchases.loading}
          data={purchases.data}
          onRowOpenClick={onRowClick}
          onSortChange={onSortChange}
          onPageChange={onPageChange}
          pageNumber={pagination.pageNumber}
          rowCount={purchases.rowCount}
          pageSize={20}
        />
      </div>
    </Stack>
  );
}
export default DirectPurchasePage;
