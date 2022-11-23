import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { useMemo } from "react";
import EmptyTableOverlay from "../../shared/dataTable/EmptyTableOverlay";
import RenderCellExpand from "../../shared/dataTable/RenderCellExpand";

function DistributionHistoryTable({
  data = [],
  loading,
  onRowOpenClick,
  onSortChange,
  onPageChange,
  rowCount,
  pageNumber,
  pageSize,
}) {
  const columns = useMemo(
    () => [
      {
        field: "id",
        headerName: "ID",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
      },
      {
        field: "distributorName",
        headerName: "Distributor Name",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
        renderCell: RenderCellExpand,
      },
      {
        field: "distributedToName",
        headerName: "Distributee Name",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
        renderCell: RenderCellExpand,
      },
      {
        field: "distributionDate",
        headerName: "Distribution Date",
        type: "date",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
        valueFormatter: ({ value }) =>
          value ? moment(value).format("MMM Do, YYYY") : "N/A",
      },
      {
        field: "distributionRoom",
        headerName: "Distribution Room",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
        valueFormatter: ({ value }) => (value ? value : "N/A"),
      },
      {
        field: "products",
        headerName: "Product Count",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
        sortable: false,
        valueGetter: ({ row }) => row.products.length,
      },
    ],
    []
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

export default DistributionHistoryTable;
