import { Alert, LinearProgress, Paper, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProcurementList } from "../../../redux/actions/procurement.actions";
import QuotationListTable from "../ui/QuotationListTable";

function QuotationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { procurements, loading, error } = useSelector(
    (state) => state.procurementList
  );

  useEffect(() => {
    dispatch(getProcurementList());
  }, [dispatch]);

  const onRowOpenClick = (id) => {
    navigate("./" + id);
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Quotations</Typography>

      {loading && <LinearProgress />}

      {error && <Alert severity="error">{error}</Alert>}

      <Paper variant="outlined">
        <QuotationListTable
          data={procurements}
          onRowOpenClick={onRowOpenClick}
        />
      </Paper>
    </Stack>
  );
}
export default QuotationPage;
