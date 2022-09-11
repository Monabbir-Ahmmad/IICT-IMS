import { Chip, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { MdDelete as DeleteIcon } from "react-icons/md";
import EmptyTableOverlay from "../../shared/dataTable/EmptyTableOverlay";
import RenderCellExpand from "../../shared/dataTable/RenderCellExpand";
import { currencyFormatter } from "../../../utils/utilities";
import moment from "moment/moment";
import { useMemo } from "react";

function ProcurementListTable({ data = [], onRowDeleteClick, onRowOpenClick }) {
  const columns = useMemo(
    () => [
      {
        field: "id",
        headerName: "ID",
        width: 100,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "title",
        headerName: "Title",
        width: 300,
        renderCell: RenderCellExpand,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "category",
        headerName: "Category",
        width: 200,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "issueingDate",
        headerName: "Issue Date",
        width: 150,
        type: "date",
        headerAlign: "center",
        align: "center",
        valueFormatter: ({ value }) => moment(value).format("MMM Do, YYYY"),
      },
      {
        field: "tenderDeadline",
        headerName: "Deadline",
        width: 150,
        type: "date",
        headerAlign: "center",
        align: "center",
        valueFormatter: ({ value }) => moment(value).format("MMM Do, YYYY"),
      },
      {
        field: "estimatedTotalPrice",
        headerName: "Estimated Total Price",
        valueFormatter: ({ value }) => currencyFormatter().format(value),
        type: "number",
        width: 200,
        headerAlign: "center",
        align: "center",
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
          <IconButton color="error" onClick={() => onRowDeleteClick(params.id)}>
            <DeleteIcon size={24} />
          </IconButton>,
        ],
      },
    ],
    [onRowDeleteClick]
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
        onRowClick={(params) => onRowOpenClick(params.id)}
        sx={{ border: 0 }}
      />
    </div>
  );
}

export default ProcurementListTable;
