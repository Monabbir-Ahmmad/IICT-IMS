import { Alert, LinearProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import quotationService from "../../../services/quotation.service";
import SearchFilter from "../../shared/searchFilter/SearchFilter";
import QuotationListTable from "../ui/QuotationListTable";

function QuotationPage() {
  const navigate = useNavigate();

  const [procurementRequests, setProcurementRequests] = useState({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await quotationService.getProcurmentRequestList();
        setProcurementRequests({
          data: res.data,
          loading: false,
          error: null,
        });
      } catch (error) {
        setProcurementRequests({
          data: [],
          loading: false,
          error: error.message,
        });
      }
    })();
  }, []);

  const onRowOpenClick = (id) => {
    navigate("./" + id);
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Quotations</Typography>

      {procurementRequests.loading && <LinearProgress />}

      {procurementRequests.error && (
        <Alert severity="error">{procurementRequests.error}</Alert>
      )}

      <div>
        <SearchFilter />
        <QuotationListTable
          data={procurementRequests.data}
          onRowOpenClick={onRowOpenClick}
        />
      </div>
    </Stack>
  );
}
export default QuotationPage;
