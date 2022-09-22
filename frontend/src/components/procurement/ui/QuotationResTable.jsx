import { Button } from "@mui/material";
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
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "supplierName",
        headerName: "Supplier Name",
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "createdAt",
        headerName: "Created At",
        flex: 1,
        type: "date",
        headerAlign: "center",
        align: "center",
        valueFormatter: ({ value }) => moment(value).format("MMM Do, YYYY"),
      },
      {
        field: "quotedTotalPrice",
        headerName: "Quoted Total Price",
        flex: 1,
        headerAlign: "center",
        align: "center",
        valueFormatter: ({ value }) => currencyFormatter().format(value),
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        flex: 1,
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
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        disableSelectionOnClick
        sx={{ border: 0 }}
      />
    </div>
  );
}
export default QuotationResTable;
