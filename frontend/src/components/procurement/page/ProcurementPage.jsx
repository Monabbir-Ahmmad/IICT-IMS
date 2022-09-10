import { Button, Paper, Stack, Typography } from "@mui/material";
import { RiAddLine as AddIcon } from "react-icons/ri";
import { Link } from "react-router-dom";
import ProcurementListItem from "../ui/ProcurementListTable";

function ProcurementPage() {
  const onRowDelete = (id) => {
    console.log(id);
  };

  const onRowClick = (id) => {
    console.log(id);
  };

  return (
    <Stack spacing={3}>
      <Button
        component={Link}
        to="./create"
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ alignSelf: "start" }}
      >
        Create a new procurement
      </Button>

      <Typography variant="h5">Procurement list</Typography>

      <Paper variant="outlined">
        <ProcurementListItem
          data={[
            {
              id: 1,
              title:
                "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet ",
              procurementCategory: "Cat",
              issueDate: "2020/01/01",
              tendaringDeadline: "2020/01/01",
              status: "status",
              estimatedTotalPrice: 1000,
            },
          ]}
          onRowOpenClick={onRowClick}
          onRowDeleteClick={onRowDelete}
        />
      </Paper>
    </Stack>
  );
}

export default ProcurementPage;
