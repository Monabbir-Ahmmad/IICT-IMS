import {
  Box,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useRef, useState } from "react";
import { RiPrinterLine as PrintIcon } from "react-icons/ri";
import { useReactToPrint } from "react-to-print";
import { currencyFormatter } from "../../../utils/utilities";
import DialogWrapper from "../../shared/dialogWrapper/DialogWrapper";
import styled from "@emotion/styled";

const pageStyle = `
@media all {
  .page-break {
    display: none;
  }
}

@media print {
  html, body {
    height: initial !important;
    overflow: initial !important;
    -webkit-print-color-adjust: exact;
  }
}

@media print {
  .page-break {
    margin-top: 1rem;
    display: block;
    page-break-before: auto;
  }
}

@page {
  size: auto;
  margin: 15mm;
}
`;

const Header = styled.header`
  display: block;
  text-align: center;
`;

function ProcurementPrinter({ procurement }) {
  const [open, setOpen] = useState(false);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle,
  });

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        startIcon={<PrintIcon />}
      >
        Print
      </Button>

      <DialogWrapper
        open={open}
        onClose={onClose}
        onConfirm={handlePrint}
        title="Print Product Information"
      >
        <Box ref={componentRef} p={2}>
          <Header>
            <Typography variant="body1">
              Institute of Information and Communication Technology
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Shahjalal University of Science & Technology
            </Typography>
          </Header>
          <Typography variant="h4" align="center" sx={{ mt: 5 }}>
            Procurement
          </Typography>

          <Typography variant={"h6"} sx={{ mt: 4 }}>
            <strong>Procurement Info</strong>
          </Typography>

          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>Procurement ID:</strong> {procurement?.id}
          </Typography>
          <Typography variant={"body1"} sx={{ mt: 2 }}>
            <strong>Procurement Title:</strong> {procurement?.title}
          </Typography>
          <Typography variant={"body1"} sx={{ mt: 2 }}>
            <strong>Procurement Category:</strong> {procurement?.category}
          </Typography>
          <Typography variant={"body1"} sx={{ mt: 2 }}>
            <strong>Issue Date:</strong>{" "}
            {moment(procurement?.createdAt).format("Do MMMM, YYYY")}
          </Typography>
          <Typography variant={"body1"} sx={{ mt: 2 }}>
            <strong>Tender Deadline:</strong>{" "}
            {moment(procurement?.deadline).format("Do MMMM, YYYY")}
          </Typography>

          <Typography variant={"body1"} sx={{ mt: 2 }}>
            <strong>Estimated Total Price:</strong>{" "}
            {currencyFormatter().format(procurement?.estimatedTotalPrice)}
          </Typography>

          <Typography variant={"body1"} sx={{ mt: 2 }}>
            <strong>Status:</strong> {procurement?.status}
          </Typography>

          <Divider sx={{ my: 5 }} />

          <Typography variant={"h6"}>
            <strong>Product Info</strong>
          </Typography>

          <TableContainer sx={{ mt: 3, border: "1px #f0f0f0 solid" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Details</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Estimated Unit Price</TableCell>
                  <TableCell>Estimated Subtotal Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {procurement?.products.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.details}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>
                      {row.estimatedPrice &&
                        currencyFormatter().format(row.estimatedPrice)}
                    </TableCell>

                    <TableCell>
                      {row.estimatedTotalPrice &&
                        currencyFormatter().format(row.estimatedTotalPrice)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Divider sx={{ my: 5 }} />

          <Typography variant={"h6"}>
            <strong>Quotations</strong>
          </Typography>

          <TableContainer sx={{ mt: 3, border: "1px #f0f0f0 solid" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Supplier Name</TableCell>
                  <TableCell>Quoted At</TableCell>
                  <TableCell>Quoted Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {procurement?.quotations?.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row?.supplier?.companyName}</TableCell>

                    <TableCell>
                      {row?.createdAt &&
                        moment(row.createdAt).format("MMM Do YYYY")}
                    </TableCell>

                    <TableCell>
                      {row.quotedTotalPrice &&
                        currencyFormatter().format(row.quotedTotalPrice)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </DialogWrapper>
    </div>
  );
}
export default ProcurementPrinter;
