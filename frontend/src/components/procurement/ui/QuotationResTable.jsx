import { Button, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { useMemo } from "react";
import { currencyFormatter } from "../../../utils/utilities";

function QuotationResTable({ data = [], onQuotationAccept }) {
  const columns = useMemo(
    () => [
      {
        field: "supplierId",
        headerName: "Supplier Id",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
        valueGetter: (params) => params.row.supplier.id,
      },
      {
        field: "supplierName",
        headerName: "Supplier Name",
        flex: 1,
        minWidth: 100,
        headerAlign: "center",
        align: "center",
        valueGetter: (params) => params.row.supplier.companyName,
      },
      {
        field: "createdAt",
        headerName: "Created At",
        type: "date",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
        valueFormatter: ({ value }) => moment(value).format("MMM Do, YYYY"),
      },
      {
        field: "quotedTotalPrice",
        headerName: "Quoted Total Price",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
        valueFormatter: ({ value }) => currencyFormatter().format(value),
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
            onClick={() => onQuotationAccept(params.row)}
          >
            Accept
          </Button>,
        ],
      },
    ],
    [onQuotationAccept]
  );

  return (
    <Paper variant="outlined">
      <DataGrid
        autoHeight
        rows={data}
        columns={columns}
        disableSelectionOnClick
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
export default QuotationResTable;
