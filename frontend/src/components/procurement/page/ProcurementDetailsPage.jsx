import {
  Alert,
  AlertTitle,
  Chip,
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
import {
  getProcurement,
  procurementQuotationAccept,
} from "../../../redux/actions/procurement.actions";
import { currencyFormatter, statusColors } from "../../../utils/utilities";
import QuotationOfferProductTable from "../../quotation/ui/QuotationOfferProductTable";
import QuotationAccepter from "../ui/QuotationAccepter";
import QuotationResTable from "../ui/QuotationResTable";

function ProcurementDetailsPage() {
  const dispatch = useDispatch();
  const { procurementId } = useParams();

  const { procurement, loading, error } = useSelector(
    (state) => state.procurementDetails
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

  const onQuotationAcceptSubmit = (value) => {
    dispatch(
      procurementQuotationAccept({
        ...value,
        procurementId: procurement.id,
        quotationId: selectedQuotation.id,
      })
    );
    setOpenQuotationAccepter(false);
  };

  return (
    <Stack spacing={2}>
      {loading && <LinearProgress />}

      {error && <Alert severity="error">{error}</Alert>}

      <Typography variant="h5">
        Procurement #{procurement?.id}{" "}
        <Chip
          variant="outlined"
          label={procurement?.status}
          color={statusColors[procurement?.status]}
        />
      </Typography>

      <Stack width={1} spacing={3} direction={{ xs: "column", lg: "row" }}>
        <Paper variant="outlined" sx={{ flex: 1 }}>
          <Stack p={3} spacing={3}>
            <Typography variant={"h6"}>Details</Typography>

            <Divider />

            <Typography variant={"body1"}>
              Procurement Title: <strong>{procurement?.title}</strong>
            </Typography>

            <Typography variant={"body1"}>
              Procurement Category: <strong>{procurement?.category}</strong>
            </Typography>

            <Typography variant={"body1"}>
              Issuing Date:{" "}
              <strong>
                {moment(procurement?.createdAt).format("MMM Do, YYYY")}
              </strong>
            </Typography>

            <Typography variant={"body1"}>
              Tender Deadling:{" "}
              <strong>
                {moment(procurement?.deadline).format("MMM Do, YYYY")}
              </strong>
            </Typography>

            <Typography variant={"body1"}>
              Estimated Subtotal Price:{" "}
              <strong>
                {currencyFormatter().format(procurement?.estimatedTotalPrice)}
              </strong>
            </Typography>
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ flex: 1 }}>
          <Stack p={3} spacing={3}>
            <Typography variant={"h6"}>Created By</Typography>
            <Divider />

            <Typography variant={"body1"}>
              Name: <strong>{procurement?.createdBy?.username}</strong>
            </Typography>

            <Typography variant={"body1"}>
              Email: <strong>{procurement?.createdBy?.email}</strong>
            </Typography>

            <Typography variant={"body1"}>
              Contact Number:{" "}
              <strong>{procurement?.createdBy?.contactNumber}</strong>
            </Typography>

            <Typography variant={"body1"}>
              Role: <strong>{procurement?.createdBy?.role}</strong>
            </Typography>

            <Typography variant={"body1"}>
              Designation:{" "}
              <strong>{procurement?.createdBy?.designation}</strong>
            </Typography>
          </Stack>
        </Paper>
      </Stack>
      <Typography variant="h6" sx={{ pt: 3 }}>
        Product List
      </Typography>

      <QuotationOfferProductTable data={procurement?.products} />

      <Typography variant="h6" sx={{ pt: 3 }}>
        Quotation Responses
      </Typography>

      {procurement?.quotations?.length ? (
        <QuotationResTable
          data={procurement?.quotations}
          onQuotationAccept={onQuotationAcceptClick}
        />
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
        onSubmit={onQuotationAcceptSubmit}
      />
    </Stack>
  );
}
export default ProcurementDetailsPage;
