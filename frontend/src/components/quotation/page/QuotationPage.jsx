import { Paper, Stack, Typography } from "@mui/material";
import QuotationListTable from "../ui/QuotationListTable";

function QuotationPage() {
  const data = [
    {
      id: 1,
      title: "Supplier 1",
      issueDate: "2021-09-10",
      tenderingDeadline: "2021-10-10",
      estimatedTotalPrice: 1000,
      status: "Pending",
    },
    {
      id: 2,
      title: "Supplier 1",
      issueDate: "2021-09-10",
      tenderingDeadline: "2021-10-10",
      estimatedTotalPrice: 1000,
      status: "Completed",
    },
  ];

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Quotations</Typography>
      <Paper variant="outlined">
        <QuotationListTable data={data} />
      </Paper>
    </Stack>
  );
}
export default QuotationPage;
