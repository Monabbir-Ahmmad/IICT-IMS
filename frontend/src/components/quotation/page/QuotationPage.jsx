import { Alert, LinearProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import quotationService from "../../../services/quotation.service";
import { procurementRequestFilterDef } from "../../shared/searchFilter/filterData";
import SearchFilter from "../../shared/searchFilter/SearchFilter";
import QuotationListTable from "../ui/QuotationListTable";

function QuotationPage() {
  const navigate = useNavigate();

  const [procurementRequests, setProcurementRequests] = useState({
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
    getInventory(filter, sort, pagination.pageNumber);
  }, [filter, sort, pagination]);

  useEffect(() => {
    setPagination({ pageNumber: 0 });
  }, [filter, sort]);

  const onSortChange = (sortModel) => {
    setSort({
      sortColumn: procurementRequestFilterDef.find(
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
    setProcurementRequests({ ...procurementRequests, loading: true });
    try {
      const { data } = await quotationService.getProcurementRequestList(
        filter,
        sort,
        pagination.pageNumber
      );
      setProcurementRequests({
        data:
          pagination.pageNumber === 0
            ? data.data
            : [...procurementRequests.data, ...data.data],
        rowCount: data.totalCount,
        loading: false,
        error: null,
      });
    } catch (error) {
      setProcurementRequests({
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
      <Typography variant="h5">Requests For Quotation</Typography>

      {procurementRequests.error && (
        <Alert severity="error">{procurementRequests.error}</Alert>
      )}

      <div>
        <SearchFilter
          filterDef={procurementRequestFilterDef}
          onApply={onFilterApply}
          onClear={onFilterClear}
        />
        <QuotationListTable
          loading={procurementRequests.loading}
          data={procurementRequests.data}
          onRowOpenClick={onRowClick}
          onSortChange={onSortChange}
          onPageChange={onPageChange}
          pageNumber={pagination.pageNumber}
          rowCount={procurementRequests.rowCount}
          pageSize={20}
        />
      </div>
    </Stack>
  );
}
export default QuotationPage;
