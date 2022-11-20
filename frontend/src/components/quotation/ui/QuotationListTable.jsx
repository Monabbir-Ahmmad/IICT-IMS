import { Chip, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EmptyTableOverlay from "../../shared/dataTable/EmptyTableOverlay";
import RenderCellExpand from "../../shared/dataTable/RenderCellExpand";
import { currencyFormatter, statusColors } from "../../../utils/utilities";
import moment from "moment/moment";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useCallback } from "react";

function QuotationListTable({
  data = [],
  loading,
  onRowOpenClick,
  onSortChange,
  onPageChange,
  rowCount,
  pageNumber,
  pageSize,
}) {
  const { userAuth } = useSelector((state) => state.userLogin);

  const getStatus = useCallback(
    (quotations = []) => {
      const quotationOffered = quotations?.find(
        (quotation) => quotation.supplier.id === Number(userAuth.id)
      );

      if (quotationOffered?.accepted) return "Offer Accepted";
      else if (quotationOffered) return "Offer Sent";
      else return "Not Offered";
    },
    [userAuth.id]
  );

  const columns = useMemo(
    () => [
      {
        field: "title",
        headerName: "Title",
        flex: 1,
        minWidth: 100,
        headerAlign: "center",
        align: "center",
        renderCell: RenderCellExpand,
      },
      {
        field: "createdBy",
        headerName: "Created By",
        flex: 1,
        minWidth: 100,
        headerAlign: "center",
        align: "center",
        valueGetter: ({ row }) => row.createdBy.username,
        renderCell: RenderCellExpand,
      },
      {
        field: "createdAt",
        headerName: "Issue Date",
        type: "date",
        flex: 1,
        minWidth: 100,
        headerAlign: "center",
        align: "center",
        valueFormatter: ({ value }) => moment(value).format("MMM Do, YYYY"),
      },
      {
        field: "deadline",
        headerName: "Deadline",
        type: "date",
        flex: 1,
        minWidth: 100,
        headerAlign: "center",
        align: "center",
        valueFormatter: ({ value }) => moment(value).format("MMM Do, YYYY"),
      },
      {
        field: "estimatedTotalPrice",
        headerName: "Estimated Total Price",
        type: "number",
        flex: 1,
        minWidth: 100,
        headerAlign: "center",
        align: "center",
        valueFormatter: ({ value }) => currencyFormatter().format(value),
      },
      {
        field: "quotedTotalPrice",
        headerName: "Offered Total Price",
        type: "number",
        flex: 1,
        minWidth: 100,
        headerAlign: "center",
        align: "center",
        sortable: false,
        valueGetter: (params) =>
          params.row.quotations?.find(
            (quotation) => quotation.supplier.id === Number(userAuth.id)
          )?.quotedTotalPrice,
        valueFormatter: ({ value }) =>
          value ? currencyFormatter().format(value) : "N/A",
      },
      {
        field: "status",
        headerName: "Status",
        flex: 1,
        minWidth: 100,
        headerAlign: "center",
        align: "center",
        sortable: false,
        valueGetter: (params) => getStatus(params.row.quotations),
        renderCell: ({ value }) => (
          <Chip variant="outlined" label={value} color={statusColors[value]} />
        ),
      },
    ],
    [getStatus, userAuth.id]
  );

  return (
    <Paper variant="outlined" sx={{ height: 650 }}>
      <DataGrid
        rows={data}
        columns={columns}
        disableSelectionOnClick
        disableColumnMenu
        loading={loading}
        sortingMode="server"
        rowsPerPageOptions={[5]}
        page={pageNumber}
        rowCount={rowCount}
        pageSize={pageSize}
        components={{
          NoRowsOverlay: EmptyTableOverlay,
        }}
        onSortModelChange={onSortChange}
        onRowClick={(params) => onRowOpenClick(params.id)}
        onPageChange={onPageChange}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}

export default QuotationListTable;
