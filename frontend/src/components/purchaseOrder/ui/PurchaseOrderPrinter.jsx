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

function PurchaseOrderPrinter({ purchaseOrder }) {
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
            Purchase Order
          </Typography>

          <Typography variant={"h6"} sx={{ mt: 4 }}>
            <strong>Order Info</strong>
          </Typography>

          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>Order ID:</strong> {purchaseOrder?.id}
          </Typography>
          <Typography variant={"body1"} sx={{ mt: 2 }}>
            <strong>Order Title:</strong> {purchaseOrder?.title}
          </Typography>
          <Typography variant={"body1"} sx={{ mt: 2 }}>
            <strong>Order Category:</strong> {purchaseOrder?.category}
          </Typography>
          <Typography variant={"body1"} sx={{ mt: 2 }}>
            <strong>Order Date:</strong>{" "}
            {moment(purchaseOrder?.createdAt).format("Do MMMM, YYYY")}
          </Typography>
          <Typography variant={"body1"} sx={{ mt: 2 }}>
            <strong>Delivery Deadline:</strong>{" "}
            {moment(purchaseOrder?.deliveryDeadline).format("Do MMMM, YYYY")}
          </Typography>

          <Typography variant={"body1"} sx={{ mt: 2 }}>
            <strong>Delivery Date:</strong>{" "}
            {purchaseOrder?.deliveryDate
              ? moment(purchaseOrder?.deliveryDate).format("Do MMMM, YYYY")
              : "Not Delivered Yet"}
          </Typography>

          <Typography variant={"body1"} sx={{ mt: 2 }}>
            <strong>Total Price:</strong>{" "}
            {currencyFormatter().format(purchaseOrder?.totalPrice)}
          </Typography>

          <Typography variant={"body1"} sx={{ mt: 2 }}>
            <strong>Status:</strong> {purchaseOrder?.status}
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant={"h6"}>
            <strong>Supplier Info</strong>
          </Typography>

          <Typography variant={"body1"} sx={{ mt: 2 }}>
            Company Name:{" "}
            <strong>{purchaseOrder?.supplier?.companyName}</strong>
          </Typography>

          <Typography variant={"body1"} sx={{ mt: 2 }}>
            BIN: <strong>{purchaseOrder?.supplier?.bin}</strong>
          </Typography>

          <Typography variant={"body1"} sx={{ mt: 2 }}>
            Email: <strong>{purchaseOrder?.supplier?.email}</strong>
          </Typography>

          <Typography variant={"body1"} sx={{ mt: 2 }}>
            Contact Number:{" "}
            <strong>{purchaseOrder?.supplier?.contactNumber}</strong>
          </Typography>

          <Typography variant={"body1"} sx={{ mt: 2 }}>
            Address: <strong>{purchaseOrder?.supplier?.address}</strong>
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
                  <TableCell>Unit Price</TableCell>
                  <TableCell>Warranty Till</TableCell>
                  <TableCell>Subtotal Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {purchaseOrder?.products.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.details}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>
                      {row.unitPrice &&
                        currencyFormatter().format(row.unitPrice)}
                    </TableCell>
                    <TableCell>
                      {row.warrantyExpiryDate &&
                        moment(row.warrantyExpiryDate).format("MMM Do YY")}
                    </TableCell>
                    <TableCell>
                      {row.totalPrice &&
                        currencyFormatter().format(row.totalPrice)}
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
export default PurchaseOrderPrinter;
