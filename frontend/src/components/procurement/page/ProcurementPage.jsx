import { Alert, Button, Stack, Typography } from "@mui/material";
import { RiAddLine as AddIcon } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import ProcurementListItem from "../ui/ProcurementListTable";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import SearchFilter from "../../shared/searchFilter/SearchFilter";
import procurementService from "../../../services/procurement.service";
import { procurementFilterDef } from "../../shared/searchFilter/filterData";
import {
  showErrorAlert,
  showSuccessAlert,
} from "../../../redux/actions/alertSnackbar.actions";

function ProcurementPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [procurements, setProcurements] = useState({
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
    getProcurements();
  }, [filter, sort, pagination]);

  useEffect(() => {
    setPagination({ pageNumber: 0 });
  }, [filter, sort]);

  const onSortChange = (sortModel) => {
    setSort({
      sortColumn: procurementFilterDef.find(
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

  const getProcurements = async () => {
    setProcurements({ ...procurements, loading: true, error: null });
    try {
      const { data } = await procurementService.getList(
        filter,
        sort,
        pagination.pageNumber
      );
      setProcurements({
        ...procurements,
        data:
          pagination.pageNumber === 0
            ? data.data
            : [...procurements.data, ...data.data],
        rowCount: data.totalCount,
        loading: false,
      });
    } catch (error) {
      setProcurements({
        ...procurements,
        rowCount: 0,
        loading: false,
        error: error.message,
      });
    }
  };

  const onRowDelete = async (id) => {
    setProcurements({
      ...procurements,
      loading: true,
      error: null,
    });

    try {
      await procurementService.delete(id);
      setProcurements({
        ...procurements,
        loading: false,
        data: procurements.data.filter((p) => p.id !== id),
        rowCount: procurements.rowCount - 1,
      });

      dispatch(showSuccessAlert("Procurement deleted successfully"));
    } catch (error) {
      setProcurements({
        ...procurements,
        loading: false,
        error: error.message,
      });

      dispatch(showErrorAlert(error.message));
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
        Create a new procurement
      </Button>

      <Typography variant="h5">Procurement list</Typography>

      {procurements.error && (
        <Alert severity="error">{procurements.error}</Alert>
      )}

      <div>
        <SearchFilter
          filterDef={procurementFilterDef}
          onApply={onFilterApply}
          onClear={onFilterClear}
        />
        <ProcurementListItem
          data={procurements.data}
          onRowOpenClick={onRowClick}
          onRowDeleteClick={onRowDelete}
          loading={procurements.loading}
          onSortChange={onSortChange}
          onPageChange={onPageChange}
          pageNumber={pagination.pageNumber}
          rowCount={procurements.rowCount}
          pageSize={25}
        />
      </div>
    </Stack>
  );
}

export default ProcurementPage;
