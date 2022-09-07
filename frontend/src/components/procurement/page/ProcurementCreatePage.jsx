import { Button, Paper, Stack } from "@mui/material";
import { useState } from "react";
import {
  RiAddLine as AddIcon,
  RiDeleteBinLine as DeleteIcon,
  RiUpload2Line as UploadIcon,
} from "react-icons/ri";
import ProcurementItemAdder from "../ui/ProcurementItemAdder";
import ProcurementTable from "../ui/ProcurementTable";

function ProcurementCreatePage() {
  const [openAddNew, setOpenAddNew] = useState(false);

  const [items, setItems] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const onAddNewItemSubmit = (newItem) => {
    console.log(newItem);
    setItems([
      ...items,
      {
        ...newItem,

        totalEstimatedPrice: newItem.quantity * newItem.estimatedPrice,
      },
    ]);
    setOpenAddNew(false);
  };

  const onRowSelectionChange = (newSelectedRows) => {
    setSelectedRows(newSelectedRows);
  };

  const onDeleteSelected = () => {
    setItems(items.filter((item) => !selectedRows.includes(item.id)));
    setSelectedRows([]);
  };

  return (
    <Stack spacing={2}>
      <ProcurementItemAdder
        open={openAddNew}
        onSubmit={onAddNewItemSubmit}
        onCancel={() => setOpenAddNew(false)}
      />
      <Stack
        direction={{ sm: "column-reverse", lg: "row" }}
        spacing={2}
        justifyContent={"space-between"}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ justifySelf: "start" }}
          onClick={() => setOpenAddNew(true)}
        >
          Add Items
        </Button>

        <Button
          disabled={items.length === 0}
          variant="contained"
          startIcon={<UploadIcon />}
          sx={{ justifySelf: "end" }}
        >
          Publish Procurement
        </Button>
      </Stack>
      <Paper variant="outlined">
        <ProcurementTable
          data={items}
          onRowSelectionChange={onRowSelectionChange}
        />
      </Paper>
      {selectedRows.length > 0 && (
        <Button
          startIcon={<DeleteIcon />}
          variant="contained"
          color="error"
          sx={{ alignSelf: "start" }}
          onClick={onDeleteSelected}
        >
          Delete Selected Items
        </Button>
      )}
    </Stack>
  );
}

export default ProcurementCreatePage;
