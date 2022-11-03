import {
  Alert,
  Button,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { RiAddLine as AddIcon } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import ProcurementListItem from "../ui/ProcurementListTable";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  deleteProcurement,
  getProcurementList,
} from "../../../redux/actions/procurement.actions";

function ProcurementPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { procurements, loading, error } = useSelector(
    (state) => state.procurementList
  );

  useEffect(() => {
    dispatch(getProcurementList());
  }, [dispatch]);

  const onRowDelete = (id) => {
    dispatch(deleteProcurement(id));
  };

  const onRowClick = (id) => {
    navigate("./" + id);
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

      {loading && <LinearProgress />}

      {error && <Alert severity="error">{error}</Alert>}

      <ProcurementListItem
        data={procurements}
        onRowOpenClick={onRowClick}
        onRowDeleteClick={onRowDelete}
      />
    </Stack>
  );
}

export default ProcurementPage;
