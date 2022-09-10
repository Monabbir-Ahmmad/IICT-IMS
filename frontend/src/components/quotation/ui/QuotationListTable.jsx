import { Button, Chip } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { MdDelete as DeleteIcon } from "react-icons/md";
import EmptyTableOverlay from "../../shared/dataTable/EmptyTableOverlay";
import RenderCellExpand from "../../shared/dataTable/RenderCellExpand";
import { currencyFormatter } from "../../../utils/utilities";
import moment from "moment/moment";
import { useMemo } from "react";

function QuotationListTable({ data = [] }) {
  const columns = useMemo(
    () => [
      {
        field: "title",
        headerName: "Title",
        width: 300,
        renderCell: RenderCellExpand,
      },
      {
        field: "issueDate",
        headerName: "Issue Date",
        width: 150,
        type: "date",
        valueFormatter: ({ value }) => moment(value).format("MMM Do, YYYY"),
      },
      {
        field: "tenderingDeadline",
        headerName: "Deadline",
        width: 150,
        type: "date",
        valueFormatter: ({ value }) => moment(value).format("MMM Do, YYYY"),
      },
      {
        field: "estimatedTotalPrice",
        headerName: "Estimated Total Price",
        valueFormatter: ({ value }) => currencyFormatter().format(value),
        type: "number",
        width: 200,
      },
      {
        field: "offeredTotalPrice",
        headerName: "Offered Total Price",
        valueFormatter: ({ value }) =>
          value ? currencyFormatter().format(value) : "N/A",
        type: "number",
        width: 200,
      },
      {
        field: "status",
        headerName: "Status",
        width: 150,
        renderCell: (props) => (
          <Chip
            variant="outlined"
            label={props.value}
            color={props.value === "Completed" ? "success" : "warning"}
          />
        ),
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        getActions: (params) => [
          <Button variant="contained" onClick={() => console.log(params.id)}>
            Open
          </Button>,
        ],
      },
    ],
    []
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
