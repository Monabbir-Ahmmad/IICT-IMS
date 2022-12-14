import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { Box, Button, Chip, Paper, Typography } from "@mui/material";
import { MdAdd as AddIcon } from "react-icons/md";
import EmptyTableOverlay from "../../shared/dataTable/EmptyTableOverlay";
import RenderCellExpand from "../../shared/dataTable/RenderCellExpand";
import { currencyFormatter, statusColors } from "../../../utils/utilities";
import { useMemo, useState } from "react";
import moment from "moment";

function CustomeToolbar({ onAddProductsClick, selectedRows }) {
  return (
    <GridToolbarContainer>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        disabled={selectedRows.length < 1}
        sx={{ m: 1.5, mr: "auto" }}
        onClick={() => onAddProductsClick(selectedRows)}
      >
        Add Products To Distribution List
      </Button>

      {selectedRows.length > 0 && (
        <Box
          display={"flex"}
          flexDirection={{ xs: "row-reverse", sm: "row" }}
          alignItems={"center"}
          m={1.5}
        >
          <Typography>{selectedRows.length} Rows Selected</Typography>
        </Box>
      )}
    </GridToolbarContainer>
  );
}

function DistribuableProductsTable({
  data = [],
  loading,
  onAddProductsClick,
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
        field: "name",
        headerName: "Name",
        renderCell: RenderCellExpand,
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
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
        field: "price",
        headerName: " Price",
        type: "number",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
        valueFormatter: ({ value }) => currencyFormatter().format(value),
      },
      {
        field: "warrantyExpiryDate",
        headerName: "Warranty Till",
        type: "date",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
        valueFormatter: ({ value }) =>
          value ? moment(value).format("MMM Do, YYYY") : "N/A",
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
    ],
    []
  );

  const [selectedRows, setSelectedRows] = useState([]);

  const onRowSelectionChange = (newSelectedRows) => {
    setSelectedRows(newSelectedRows);
  };

  return (
    <Paper variant="outlined" sx={{ height: 500 }}>
      <DataGrid
        rows={data}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
        hideFooterSelectedRowCount
        components={{
          NoRowsOverlay: EmptyTableOverlay,
          Toolbar: CustomeToolbar,
        }}
        componentsProps={{
          toolbar: {
            onAddProductsClick,
            selectedRows,
          },
        }}
        onSelectionModelChange={onRowSelectionChange}
        disableColumnMenu
        loading={loading}
        sortingMode="server"
        rowsPerPageOptions={[5]}
        page={pageNumber}
        rowCount={rowCount}
        pageSize={pageSize}
        onSortModelChange={onSortChange}
        onRowClick={(params) => onRowOpenClick(params.id)}
        onPageChange={onPageChange}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}

export default DistribuableProductsTable;
