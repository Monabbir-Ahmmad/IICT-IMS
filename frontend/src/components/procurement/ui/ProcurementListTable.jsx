import { Chip, IconButton, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { MdDelete as DeleteIcon } from "react-icons/md";
import EmptyTableOverlay from "../../shared/dataTable/EmptyTableOverlay";
import RenderCellExpand from "../../shared/dataTable/RenderCellExpand";
import { currencyFormatter, statusColors } from "../../../utils/utilities";
import moment from "moment/moment";
import { useMemo } from "react";

function ProcurementListTable({
  data = [],
  loading,
  onRowDeleteClick,
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
        field: "title",
        headerName: "Title",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
        renderCell: RenderCellExpand,
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
        field: "createdBy",
        headerName: "Created By",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
        valueGetter: ({ row }) => row.createdBy?.username,
        renderCell: RenderCellExpand,
      },
      {
        field: "createdAt",
        headerName: "Issue Date",
        type: "date",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
        valueFormatter: ({ value }) => moment(value).format("MMM Do, YYYY"),
      },
      {
        field: "deadline",
        headerName: "Deadline",
        type: "date",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
        valueFormatter: ({ value }) => moment(value).format("MMM Do, YYYY"),
      },
      {
        field: "estimatedTotalPrice",
        headerName: "Estimated Total Price",
        type: "number",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
        valueFormatter: ({ value }) => currencyFormatter().format(value),
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
          <IconButton color="error" onClick={() => onRowDeleteClick(params.id)}>
            <DeleteIcon size={24} />
          </IconButton>,
        ],
      },
    ],
    [onRowDeleteClick]
  );

  return (
    <Paper variant="outlined" sx={{ height: 650 }}>
      <DataGrid
        rows={data}
        columns={columns}
        disableSelectionOnClick
        components={{
          NoRowsOverlay: EmptyTableOverlay,
        }}
        onRowClick={(params) => onRowOpenClick(params.id)}
        disableColumnMenu
        loading={loading}
        sortingMode="server"
        rowsPerPageOptions={[5]}
        page={pageNumber}
        rowCount={rowCount}
        pageSize={pageSize}
        onSortModelChange={onSortChange}
        onPageChange={onPageChange}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}

export default ProcurementListTable;
