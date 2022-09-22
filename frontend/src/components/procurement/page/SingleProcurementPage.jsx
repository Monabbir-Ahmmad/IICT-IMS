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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProcurement } from "../../../redux/actions/procurement.actions";
import { currencyFormatter } from "../../../utils/utilities";
import QuotationOfferProductTable from "../../quotation/ui/QuotationOfferProductTable";
import QuotationAccepter from "../ui/QuotationAccepter";
import QuotationResTable from "../ui/QuotationResTable";

function SingleProcurementPage() {
  const dispatch = useDispatch();
  const { procurementId } = useParams();

  const { procurement, loading, error } = useSelector(
    (state) => state.singleProcurement
  );

  const [openQuotationAccepter, setOpenQuotationAccepter] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState(null);

  useEffect(() => {
    if (procurementId) dispatch(getProcurement(procurementId));
  }, [dispatch, procurementId]);

  const onQuotationAcceptClick = (quotation) => {
    setOpenQuotationAccepter(true);
    setSelectedQuotation(quotation);
  };

  return (
    <Stack spacing={3}>
      {loading && <LinearProgress />}

      {error && <Alert severity="error">{error}</Alert>}

      <Paper variant="outlined">
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
              {moment(procurement?.createdAt).format("MMM Do, YYYY")}
            </strong>
          </Typography>

          <Divider />

          <Typography variant={"body1"}>
            Tender Deadling:{" "}
            <strong>
              {moment(procurement?.deadline).format("MMM Do, YYYY")}
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
        <Paper variant="outlined">
          <QuotationResTable
            data={procurement?.quotations?.map((q) => ({
              ...q,
              supplierName: q.supplier.companyName,
              supplierId: q.supplier.id,
            }))}
            onQuotationAccept={onQuotationAcceptClick}
          />
        </Paper>
      ) : (
        <Alert severity="info">
          <AlertTitle>Info</AlertTitle>
          There Are No Responses
        </Alert>
      )}

      <QuotationAccepter
        open={openQuotationAccepter}
        quotation={selectedQuotation}
        onCancel={() => setOpenQuotationAccepter(false)}
        onSubmit={() => setOpenQuotationAccepter(false)}
      />
    </Stack>
  );
}
export default SingleProcurementPage;
