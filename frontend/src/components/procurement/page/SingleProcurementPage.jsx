import {
  Alert,
  AlertTitle,
  Divider,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProcurement } from "../../../redux/actions/procurement.actions";
import { currencyFormatter } from "../../../utils/utilities";
import QuotationOfferProductTable from "../../quotation/ui/QuotationOfferProductTable";
import QuotationResTable from "../ui/QuotationResTable";

function SingleProcurementPage() {
  const dispatch = useDispatch();
  const { procurementId } = useParams();

  const { procurement, loading, error } = useSelector(
    (state) => state.singleProcurement
  );

  useEffect(() => {
    if (procurementId) dispatch(getProcurement(procurementId));
  }, [dispatch, procurementId]);

  return (
    <Stack spacing={3}>
      {loading && <LinearProgress />}

      {error && <Alert severity="error">{error}</Alert>}

      <Paper>
        <Stack p={2} spacing={2}>
          <Typography variant={"body1"}>
            Procurement ID: <strong>{procurement?.id}</strong>
          </Typography>
          <Divider />
          <Typography variant={"body1"}>
            Procurement Title: <strong>{procurement?.title}</strong>
          </Typography>
          <Divider />
          <Typography variant={"body1"}>
            Procurement Category: <strong>{procurement?.category}</strong>
          </Typography>
          <Divider />
          <Typography variant={"body1"}>
            Issuing Date:{" "}
            <strong>
              {moment(procurement?.issuingDate).format("MMM Do, YYYY")}
            </strong>
          </Typography>
          <Divider />
          <Typography variant={"body1"}>
            Tender Deadling:{" "}
            <strong>
              {moment(procurement?.tenderDeadline).format("MMM Do, YYYY")}
            </strong>
          </Typography>
          <Divider />
          <Typography variant={"body1"}>
            Estimated Total Price:{" "}
            <strong>
              {currencyFormatter().format(procurement?.estimatedTotalPrice)}
            </strong>
          </Typography>
        </Stack>
      </Paper>
      <Typography variant="h6" sx={{ pt: 3 }}>
        Product List
      </Typography>
      <QuotationOfferProductTable data={procurement?.products} />
      <Typography variant="h6" sx={{ pt: 3 }}>
        Quotation Responses
      </Typography>
      {procurement?.quotations?.length ? (
        <QuotationResTable data={procurement?.quotations} />
      ) : (
        <Alert severity="info">
          <AlertTitle>Info</AlertTitle>
          There Are No Responses
        </Alert>
      )}
    </Stack>
  );
}
export default SingleProcurementPage;
