import { Chip, IconButton, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { MdDelete as DeleteIcon } from "react-icons/md";
import EmptyTableOverlay from "../../shared/dataTable/EmptyTableOverlay";
import RenderCellExpand from "../../shared/dataTable/RenderCellExpand";
import { currencyFormatter } from "../../../utils/utilities";
import moment from "moment/moment";
import { useCallback, useMemo } from "react";

function ProcurementListTable({ data = [], onRowDeleteClick, onRowOpenClick }) {
  const getStatus = useCallback((quotations = []) => {
    const offerAccepted = quotations?.find(
      (quotation) => quotation?.accepted === true
    );

    if (offerAccepted) return "Offer Accepted";
    else if (quotations?.length > 0) return "Offers Received";
    else return "Pending";
  }, []);

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
        valueGetter: ({ row }) => getStatus(row?.quotations),
        renderCell: ({ value }) => (
          <Chip
            variant="outlined"
            label={value}
            color={
              value === "Offer Accepted"
                ? "success"
                : value === "Offers Received"
                ? "info"
                : "warning"
            }
          />
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
    [getStatus, onRowDeleteClick]
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

export default ProcurementListTable;
