import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { useMemo } from "react";
import EmptyTableOverlay from "../../shared/dataTable/EmptyTableOverlay";
import RenderCellExpand from "../../shared/dataTable/RenderCellExpand";

function ReceiveReturnHistoryTable({ data = [], onRowOpenClick }) {
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
        field: "receiverName",
        headerName: "Receiver Name",
        renderCell: RenderCellExpand,
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
      },
      {
        field: "receivedFromName",
        headerName: "Returner Name",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
      },
      {
        field: "receivingDate",
        headerName: "Receiving Date",
        type: "date",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
        valueFormatter: ({ value }) =>
          value ? moment(value).format("MMM Do, YYYY") : "N/A",
      },
      {
        field: "products",
        headerName: "Product Count",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
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
        components={{
          NoRowsOverlay: EmptyTableOverlay,
        }}
        onRowClick={(params) => onRowOpenClick(params.id)}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}

export default ReceiveReturnHistoryTable;
