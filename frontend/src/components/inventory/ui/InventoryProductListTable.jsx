import { Button, Chip, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { useMemo } from "react";
import { currencyFormatter, statusColors } from "../../../utils/utilities";
import EmptyTableOverlay from "../../shared/dataTable/EmptyTableOverlay";
import RenderCellExpand from "../../shared/dataTable/RenderCellExpand";

function InventroyProductListTable({
  data = [],
  loading,
  onStatusEditClick,
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
        minWidth: 100,
      },
      {
        field: "name",
        headerName: "Name",
        renderCell: RenderCellExpand,
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
      },
      {
        field: "category",
        headerName: "Category",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
      },
      {
        field: "manufacturer",
        headerName: "Manufacturer",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
        renderCell: RenderCellExpand,
      },
      {
        field: "price",
        headerName: " Price",
        type: "number",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
        valueFormatter: ({ value }) => currencyFormatter().format(value),
      },
      {
        field: "warrantyExpiryDate",
        headerName: "Warranty Till",
        type: "date",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
        valueFormatter: ({ value }) =>
          value ? moment(value).format("MMM Do, YYYY") : "N/A",
      },
      {
        field: "status",
        headerName: "Status",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
        renderCell: ({ value }) => (
          <Chip variant="outlined" label={value} color={statusColors[value]} />
        ),
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        flex: 1,
        minWidth: 100,
        getActions: (params) => [
          <Button
            variant="contained"
            size="small"
            onClick={() => onStatusEditClick(params.row.id)}
          >
            Edit Status
          </Button>,
        ],
      },
    ],
    [onStatusEditClick]
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
        rowsPerPageOptions={[100]}
        autoPageSize
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

export default InventroyProductListTable;
