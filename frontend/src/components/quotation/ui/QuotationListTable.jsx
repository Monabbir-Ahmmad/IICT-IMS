import { Button, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EmptyTableOverlay from "../../shared/dataTable/EmptyTableOverlay";
import RenderCellExpand from "../../shared/dataTable/RenderCellExpand";
import { currencyFormatter } from "../../../utils/utilities";
import moment from "moment/moment";
import { useMemo } from "react";

function QuotationListTable({ data = [], onRowOpenClick }) {
  const columns = useMemo(
    () => [
      {
        field: "title",
        headerName: "Title",
        width: 300,
        headerAlign: "center",
        align: "center",
        renderCell: RenderCellExpand,
      },
      {
        field: "createdAt",
        headerName: "Issue Date",
        type: "date",
        width: 150,
        headerAlign: "center",
        align: "center",
        valueFormatter: ({ value }) => moment(value).format("MMM Do, YYYY"),
      },
      {
        field: "deadline",
        headerName: "Deadline",
        type: "date",
        width: 150,
        headerAlign: "center",
        align: "center",
        valueFormatter: ({ value }) => moment(value).format("MMM Do, YYYY"),
      },
      {
        field: "estimatedTotalPrice",
        headerName: "Estimated Total Price",
        type: "number",
        width: 200,
        headerAlign: "center",
        align: "center",
        valueFormatter: ({ value }) => currencyFormatter().format(value),
      },
      {
        field: "quotedTotalPrice",
        headerName: "Offered Total Price",
        type: "number",
        width: 200,
        headerAlign: "center",
        align: "center",
        valueFormatter: ({ value }) =>
          value ? currencyFormatter().format(value) : "N/A",
      },
      {
        field: "status",
        headerName: "Status",
        width: 150,
        headerAlign: "center",
        align: "center",
        renderCell: (props) => (
          <Chip
            variant="outlined"
            label={props.value || "Pending"}
            color={props.value === "Completed" ? "success" : "warning"}
          />
        ),
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        getActions: (params) => [
          <Button variant="contained" onClick={() => onRowOpenClick(params.id)}>
            Open
          </Button>,
        ],
      },
    ],
    [onRowOpenClick]
  );

  return (
    <div style={{ height: 650, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        disableSelectionOnClick
        components={{
          NoRowsOverlay: EmptyTableOverlay,
        }}
        sx={{ border: 0 }}
      />
    </div>
  );
}

export default QuotationListTable;
