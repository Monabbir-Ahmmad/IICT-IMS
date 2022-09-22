import { Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useMemo } from "react";
import { currencyFormatter } from "../../../utils/utilities";
import EmptyTableOverlay from "../../shared/dataTable/EmptyTableOverlay";
import RenderCellExpand from "../../shared/dataTable/RenderCellExpand";

function InventroyProductListTable({
  data = [],
  onRowDeleteClick,
  onRowOpenClick,
}) {
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
        field: "name",
        headerName: "Name",
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
        field: "manufacturer",
        headerName: "Manufacturer",
        renderCell: RenderCellExpand,
        width: 200,
      },

      {
        field: "price",
        headerName: " Price",
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
        onRowClick={(params) => onRowOpenClick(params.id)}
        sx={{ border: 0 }}
      />
    </div>
  );
}

export default InventroyProductListTable;
