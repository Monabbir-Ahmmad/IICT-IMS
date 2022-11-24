import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { useMemo } from "react";
import { currencyFormatter } from "../../../utils/utilities";
import RenderCellExpand from "../../shared/dataTable/RenderCellExpand";

function CustomFooterComponent({ data }) {
  return (
    <Stack alignItems={"center"}>
      <Divider sx={{ width: "100%" }} />
      <Typography variant="body1" sx={{ p: 2 }}>
        Total Price:{" "}
        <strong>
          {currencyFormatter().format(
            data?.reduce((acc, p) => acc + p.totalPrice, 0)
          )}
        </strong>
      </Typography>
    </Stack>
  );
}

function OrderDeliveryProductTable({
  data = [],
  deliveryNotSent,
  onEditProductClick,
}) {
  const columns = useMemo(
    () => [
      {
        field: "name",
        headerName: "Name",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
        renderCell: RenderCellExpand,
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
        field: "details",
        headerName: "Details",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
        renderCell: RenderCellExpand,
      },
      {
        field: "warrantyExpiryDate",
        headerName: "Warranty Expiry Date",
        type: "date",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
        valueFormatter: ({ value }) =>
          value ? moment(value).format("MMM Do, YYYY") : "N/A",
      },
      {
        field: "unitPrice",
        headerName: "Unit Price",
        type: "number",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
        valueFormatter: ({ value }) =>
          value ? currencyFormatter().format(value) : "Required",
      },
      {
        field: "quantity",
        headerName: "Quantity",
        type: "number",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
      },
      {
        field: "totalPrice",
        headerName: "Subtotal Price",
        type: "number",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
        valueFormatter: ({ value }) =>
          value ? currencyFormatter().format(value) : "Required",
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
            disabled={!deliveryNotSent}
            onClick={() => onEditProductClick(params.row)}
          >
            Edit
          </Button>,
        ],
      },
    ],
    [deliveryNotSent, onEditProductClick]
  );

  return (
    <Paper variant="outlined">
      <DataGrid
        autoHeight
        disableColumnMenu
        disableColumnFilter
        rows={data}
        columns={columns}
        disableSelectionOnClick
        components={{
          Footer: CustomFooterComponent,
        }}
        componentsProps={{
          footer: { data },
        }}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
export default OrderDeliveryProductTable;
