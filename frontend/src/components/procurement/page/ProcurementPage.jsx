import { Button, Stack } from "@mui/material";
import { RiAddLine as AddIcon } from "react-icons/ri";
import { Link } from "react-router-dom";

function ProcurementPage() {
  return (
    <Stack>
      <Button
        component={Link}
        to="./create"
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ alignSelf: "start" }}
      >
        Create new Procurement
      </Button>
    </Stack>
  );
}

export default ProcurementPage;
